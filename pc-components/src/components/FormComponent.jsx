import React, { useState } from 'react';
import { addComponent } from '../services/api';
import { TextField, Button, Box, Typography, Select, MenuItem } from '@mui/material';

const FormComponent = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Hardware'); // New state for category
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!name || !price || !category) {
            alert('Please fill out all fields.');
            return;
        }

        // Check if price is a valid number
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid number for the price.');
            return;
        }

        setIsLoading(true); // Show loading state

        const componentData = { name, price, category };
        console.log(componentData); // Log the data being sent

        try {
            await addComponent(componentData); // Send the data
            alert('Component successfully saved.');
            setName('');
            setPrice('');
            setCategory(''); // Clear category selection
        } catch (error) {
            alert('Error during saving.');
        } finally {
            setIsLoading(false); // Hide loading state
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for readability
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    };

    const buttonStyle = {
        backgroundColor: '#673AB7',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#512DA8',
        },
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={formStyle}
        >
            <Typography variant="h5" textAlign="center">
                Add New Component
            </Typography>

            {isLoading && <div>Loading...</div>}

            <TextField
                label="Name of the component"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Price of the component (€)"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <Select
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                    console.log(e.target.value); // Log the selected category
                }}
                label="Category"
            >
                <MenuItem value="Hardware">Hardware</MenuItem>
                <MenuItem value="Software">Software</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
            </Select>

            <Button type="submit" variant="contained" color="primary" sx={buttonStyle}>
                Add Component
            </Button>
        </Box>
    );
};

export default FormComponent;
