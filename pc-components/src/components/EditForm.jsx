import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const EditForm = ({ component, onClose, onUpdate }) => {
    const [name, setName] = useState(component.name);
    const [price, setPrice] = useState(component.price);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedComponent = await onUpdate({ ...component, name, price });
            if (updatedComponent) {
                onClose();
            }
        } catch (error) {
            alert('Error updating component.');
        }
    };

    return (
        <Modal
            open={!!component}
            onClose={onClose}
            aria-labelledby="edit-component-title"
            aria-describedby="edit-component-description"
        >
            <Box sx={modalStyle}>
                <Typography id="edit-component-title" variant="h6" component="h2" gutterBottom>
                    Edit Component
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Component Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Component Price (€)"
                        type="number"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditForm;
