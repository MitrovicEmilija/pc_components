const express = require('express');
const router = express.Router();
const Component = require('../models/Component');

// Get all components
router.get('/', async (req, res) => {
    try {
        const components = await Component.find(); 
        res.status(200).json(components); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching components', error: error.message });
    }
});

// Get a single component by ID
router.get('/:id', async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json(component);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid component ID format' });
        }
        res.status(500).json({ message: 'Error fetching component', error: error.message });
    }
});

// Add a new component
router.post('/', async (req, res) => {
    console.log('Request body:', req.body); 
    try {
        const { name, price, category } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newComponent = new Component({ name: name, price: price, category: category });
        await newComponent.save();
        console.log('Component saved: ', newComponent);

        res.status(201).json(newComponent);
    } catch (error) {
        console.error('Error saving component:', error);
        res.status(500).json({ message: 'Error during saving component.', error: error.message });
    }
});

// Delete a component by ID
router.delete('/:id', async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json({ message: 'Component deleted successfully' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid component ID format' });
        }
        res.status(500).json({ message: 'Error deleting component', error: error.message });
    }
});

// Update an existing component
router.put('/:id', async (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['Hardware', 'Software', 'Accessories'].includes(category)) {
        return res.status(400).json({ message: 'Invalid category' });
    }

    try {
        const component = await Component.findByIdAndUpdate(
            req.params.id,
            { name, price, category }, 
            { new: true, runValidators: true }
        );

        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }

        res.status(200).json(component);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid component ID format' });
        }
        res.status(500).json({ message: 'Error updating component', error: error.message });
    }
});

module.exports = router;