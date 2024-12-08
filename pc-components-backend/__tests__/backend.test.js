const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Component = require('../models/Component');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Component Routes', () => {
    // Test GET /api/components
    it('should fetch all components', async () => {
        const res = await request(app).get('/api/components');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
    });

    // Test GET /api/components/:id (valid ID)
    it('should fetch a component by ID', async () => {
        const component = await Component.create({ name: 'Component A', price: 100, category: 'Hardware' });
        const res = await request(app).get(`/api/components/${component._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Component A');
    });

    // Test GET /api/components/:id (invalid ID)
    it('should return 400 for invalid component ID format', async () => {
        const res = await request(app).get('/api/components/invalidid');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid component ID format');
    });

    // Test POST /api/components
    it('should add a new component', async () => {
        const newComponent = { name: 'Component B', price: 200, category: 'Software' };
        const res = await request(app).post('/api/components').send(newComponent);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Component B');
        expect(res.body.price).toBe(200);
    });

    // Test POST /api/components (missing fields)
    it('should return 400 for missing required fields', async () => {
        const res = await request(app).post('/api/components').send({ name: 'Component C' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('All fields are required.');
    });

    // Test DELETE /api/components/:id (valid ID)
    it('should delete a component by ID', async () => {
        const component = await Component.create({ name: 'Component E', price: 400, category: 'Accessories' });
        const res = await request(app).delete(`/api/components/${component._id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Component deleted successfully');
    });

    // Test DELETE /api/components/:id (invalid ID)
    it('should return 400 for invalid component ID format when deleting', async () => {
        const res = await request(app).delete('/api/components/invalidid');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid component ID format');
    });

    // Test PUT /api/components/:id (valid ID)
    it('should update a component by ID', async () => {
        const component = await Component.create({ name: 'Component F', price: 500, category: 'Hardware' });
        const updatedComponent = { name: 'Updated Component F', price: 550, category: 'Hardware' };
        const res = await request(app).put(`/api/components/${component._id}`).send(updatedComponent);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Component F');
        expect(res.body.price).toBe(550);
    });

    // Test PUT /api/components/:id (invalid ID)
    it('should return 400 for invalid component ID format during update', async () => {
        const res = await request(app).put('/api/components/invalidid').send({ name: 'Component G', price: 600, category: 'Software' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid component ID format');
    });

    // Test PUT /api/components/:id (missing fields)
    it('should return 400 for missing required fields during update', async () => {
        const component = await Component.create({ name: 'Component H', price: 700, category: 'Accessories' });
        const res = await request(app).put(`/api/components/${component._id}`).send({ name: '' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing required fields');
    });

    it('should return 400 for empty request body', async () => {
        const res = await request(app).post('/api/components').send({});
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('All fields are required.');
    });

    it('should return an empty array if no components are found', async () => {
        await Component.deleteMany({});  // Clean up any existing components
        const res = await request(app).get('/api/components');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should return 404 if the component does not exist when deleting', async () => {
        const res = await request(app).delete('/api/components/60c72b2f9e7b2c0015d19b90');  // Assuming this ID does not exist
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Component not found');
    });

    it('should return 400 for invalid category during update', async () => {
        const component = await Component.create({ name: 'Component I', price: 800, category: 'Software' });
        const res = await request(app).put(`/api/components/${component._id}`).send({ name: 'Updated Component I', price: 850, category: 'InvalidCategory' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid category');
    });
});
