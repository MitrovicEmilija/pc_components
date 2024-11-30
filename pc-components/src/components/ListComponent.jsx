import React, { useEffect, useState } from 'react';
import { getComponent, deleteComponent, updateComponent } from '../services/api';
import EditForm from './EditForm';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ListComponent = () => {
    const [components, setComponents] = useState([]);
    const [editingComponent, setEditingComponent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getComponent();
            setComponents(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteComponent(id);
            setComponents(components.filter((comp) => comp._id !== id));
        } catch (error) {
            alert('Error deleting component.');
        }
    };

    const handleEdit = (component) => {
        setEditingComponent(component); // Open the edit modal
    };

    const handleUpdate = async (updatedComponent) => {
        try {
            const { data } = await updateComponent(updatedComponent._id, {
                name: updatedComponent.name,
                price: updatedComponent.price,
            });
            setComponents(
                components.map((comp) =>
                    comp._id === data._id ? data : comp
                )
            );
            return true;
        } catch (error) {
            alert('Error updating component.');
            return false;
        }
    };

    const listItemStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        color: '#FFFFFF',
        borderRadius: '8px',
        marginBottom: '8px',
        padding: '8px',
    };    

    const iconButtonStyle = {
        color: '#FFD700', 
    };


    return (
        <div>
            <List>
                {components.map((comp) => (
                    <ListItem key={comp._id} divider sx={listItemStyle}>
                        <ListItemText primary={`${comp.name} - €${comp.price}`} />
                        <IconButton edge="end" color="primary" onClick={() => handleEdit(comp)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" color="secondary" sx={iconButtonStyle} onClick={() => handleDelete(comp._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            {editingComponent && (
                <EditForm
                    component={editingComponent}
                    onClose={() => setEditingComponent(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ListComponent;
