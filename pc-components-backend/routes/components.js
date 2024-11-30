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
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newComponent = new Component({ name, price });
        await newComponent.save();
        res.status(201).json(newComponent);
    } catch (error) {
        res.status(500).json({ message: 'Error adding component', error: error.message });
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
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const component = await Component.findByIdAndUpdate(
            req.params.id,
            { name, price },
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