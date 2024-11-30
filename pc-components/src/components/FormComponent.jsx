import React, { useState } from 'react';
import { addComponent } from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

const FormComponent = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addComponent({ name, price });
            alert('Component successfully saved.');
            setName('');
            setPrice('');
        } catch (error) {
            alert('Error during saving.');
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
            <Button type="submit" variant="contained" color="primary" sx={buttonStyle}>
                Add Component
            </Button>
        </Box>
    );
};

export default FormComponent;
