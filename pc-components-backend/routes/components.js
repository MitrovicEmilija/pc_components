const express = require('express');
const router = express.Router();
const Component = require('../models/Component');

// Get all components
router.get('/', async (req, res) => {
    try {
        const components = await Component.find();
        res.status(200).json(components);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching components', error });
    }
});

// Add a new component
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    try {
        const newComponent = new Component({ name, price });
        await newComponent.save();
        res.status(201).json(newComponent);
    } catch (error) {
        res.status(500).json({ message: 'Error adding component', error });
    }
});

// Delete a component
router.delete('/:id', async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (!component) {
            return res.status(404).json({ message: 'Component not found' });
        }
        res.status(200).json({ message: 'Component deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting component', error });
    }
});

// Edit a component
router.put('/:id', async (req, res) => {
    try {
        const { name, price } = req.body; 
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
        res.status(500).json({ message: 'Error updating component', error });
    }
});


module.exports = router;
