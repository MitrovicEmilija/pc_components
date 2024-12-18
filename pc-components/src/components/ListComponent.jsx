import React, { useEffect, useState, useCallback } from 'react';
import { getComponent, deleteComponent, updateComponent } from '../services/api';
import EditForm from './EditForm';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TextField, Select, MenuItem, FormControl, Button, Box, InputLabel } from '@mui/material';

const ListComponent = () => {
    const [allComponents, setAllComponents] = useState([]); 
    const [filteredComponents, setFilteredComponents] = useState([]); 
    const [editingComponent, setEditingComponent] = useState(null);
    const [filters, setFilters] = useState({ search: '', category: '' });

    const fetchData = async () => {
        try {
            const { data } = await getComponent(); 
            setAllComponents(data); 
            setFilteredComponents(data); 
        } catch (error) {
            alert('Error fetching components.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const applyFilters = useCallback(() => {
        let filtered = allComponents;

        if (filters.search) {
            filtered = filtered.filter((comp) =>
                comp.name.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.category) {
            filtered = filtered.filter((comp) => comp.category === filters.category);
        }

        setFilteredComponents(filtered);
    }, [filters, allComponents]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const handleDelete = async (id) => {
        try {
            await deleteComponent(id);
            const updatedComponents = allComponents.filter((comp) => comp._id !== id);
            setAllComponents(updatedComponents); 
        } catch (error) {
            alert('Error deleting component.');
        }
    };

    const handleEdit = (component) => {
        setEditingComponent(component);
    };

    const handleUpdate = async (updatedComponent) => {
        try {
            const { data } = await updateComponent(updatedComponent._id, {
                name: updatedComponent.name,
                price: updatedComponent.price,
                category: updatedComponent.category,
            });

            const updatedComponents = allComponents.map((comp) =>
                comp._id === data._id ? data : comp
            );

            setAllComponents(updatedComponents);
            return true;
        } catch (error) {
            alert('Error updating component.');
            return false;
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value.trimStart() })); 
    };    

    const clearFilters = () => {
        setFilters({ search: '', category: '' });
    };

    const listItemStyle = {
        backgroundColor: '#F5F5F5',
        color: '#333333',
        borderRadius: '12px',
        marginBottom: '12px',
        padding: '12px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    };

    const listItemHoverStyle = {
        '&:hover': {
            backgroundColor: '#FFFFFF',
            transform: 'scale(1.02)',
            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
        },
    };

    const iconButtonStyle = {
        color: '#A67C00',
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '20px',
                    justifyContent: 'center',
                }}
            >
                {/* Search Bar */}
                <TextField
                    variant="outlined"
                    label="Search component"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    InputProps={{
                        style: {
                            backgroundColor: '#ffffff',
                            borderRadius: '5px',
                            color: '#333333',
                        },
                    }}
                    sx={{ width: '250px' }}
                />

                {/* Category Filter */}
                <FormControl sx={{ width: '200px' }}>
                    <InputLabel label="Filter by Category" />
                    <Select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '5px',
                            color: '#333333',
                        }}
                        label="Filter by Category"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Hardware">Hardware</MenuItem>
                        <MenuItem value="Software">Software</MenuItem>
                        <MenuItem value="Accessories">Accessories</MenuItem>
                    </Select>
                </FormControl>

                {/* Clear Filters Button */}
                <Button
                    variant="contained"
                    onClick={clearFilters}
                    sx={{
                        backgroundColor: '#1976D2',
                        color: '#ffffff',
                        '&:hover': { backgroundColor: '#1976D2' },
                        fontWeight: 'bold',
                    }}
                >
                    Clear Filters
                </Button>
            </Box>

            <List>
                {filteredComponents.map((comp) => (
                    <ListItem
                        key={comp._id}
                        divider
                        sx={{ ...listItemStyle, ...listItemHoverStyle }}
                    >
                        <ListItemText
                            primary={`${comp.name} - €${comp.price}`}
                            secondary={`Category: ${comp.category}`}
                        />
                        <IconButton
                            edge="end"
                            onClick={() => handleEdit(comp)}
                            sx={{ color: '#1976D2' }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            sx={iconButtonStyle}
                            onClick={() => handleDelete(comp._id)}
                        >
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
