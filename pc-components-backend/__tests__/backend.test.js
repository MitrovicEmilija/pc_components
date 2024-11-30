const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); 
const Component = require('../models/Component');

// MongoDB Test Connection String (use a dedicated test database)
const mongoTestURI = 'mongodb+srv://Emce:Emce142107@cluster0.cdu3vgq.mongodb.net/pc_components_test?retryWrites=true&w=majority';

beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(mongoTestURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

describe('Component Routes', () => {
    // Test GET /api/components
    it('should get all components', async () => {
        await Component.create({ name: 'Component A', price: 100 });
        const res = await request(app).get('/api/components');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test GET /api/components/:id (valid ID)
    it('should get a component by ID', async () => {
        const component = await Component.create({ name: 'Component B', price: 150 });
        const res = await request(app).get(`/api/components/${component._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Component B');
    });

    // Test GET /api/components/:id (invalid ID)
    it('should return 400 for invalid component ID format', async () => {
        const res = await request(app).get('/api/components/invalidid');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid component ID format');
    });

    // Test POST /api/components
    it('should add a new component', async () => {
        const newComponent = { name: 'Component C', price: 200 };
        const res = await request(app).post('/api/components').send(newComponent);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Component C');
        expect(res.body.price).toBe(200);
    });

    // Test POST /api/components (missing fields)
    it('should return 400 for missing required fields', async () => {
        const res = await request(app).post('/api/components').send({ name: 'Component D' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing required fields');
    });

    // Test DELETE /api/components/:id (valid ID)
    it('should delete a component by ID', async () => {
        const component = await Component.create({ name: 'Component E', price: 250 });
        const res = await request(app).delete(`/api/components/${component._id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Component deleted successfully');
    });

    // Test DELETE /api/components/:id (invalid ID)
    it('should return 400 for invalid component ID format', async () => {
        const res = await request(app).delete('/api/components/invalidid');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid component ID format');
    });

    // Test PUT /api/components/:id (valid ID)
    it('should update a component by ID', async () => {
        const component = await Component.create({ name: 'Component F', price: 300 });
        const updatedComponent = { name: 'Updated Component F', price: 350 };
        const res = await request(app).put(`/api/components/${component._id}`).send(updatedComponent);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Updated Component F');
        expect(res.body.price).toBe(350);
    });

    // Test PUT /api/components/:id (invalid ID)
    it('should return 400 for invalid component ID format during update', async () => {
        const res = await request(app).put('/api/components/invalidid').send({ name: 'Component G', price: 400 });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid component ID format');
    });

    // Test PUT /api/components/:id (missing fields)
    it('should return 400 for missing required fields during update', async () => {
        const component = await Component.create({ name: 'Component H', price: 450 });
        const res = await request(app).put(`/api/components/${component._id}`).send({ name: '' });
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing required fields');
    });
});
