import { render, screen, fireEvent } from '@testing-library/react';
import FormComponent from '../components/FormComponent.jsx';
import EditForm from '../components/EditForm.jsx';

// Mock the API service
jest.mock('../services/api', () => ({
    addComponent: jest.fn(),
}));

describe('FormComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        global.alert = jest.fn();
    });

    test('should show an alert when price is invalid', () => {
        render(<FormComponent />);
        
        const nameInput = screen.getByLabelText(/Name of the component/i);
        const priceInput = screen.getByLabelText(/Price of the component/i);
        const button = screen.getByText(/Add Component/i);
    
        fireEvent.change(nameInput, { target: { value: 'New Component' } });
        fireEvent.change(priceInput, { target: { value: '-10' } }); // Invalid price
        fireEvent.click(button);
    
        expect(window.alert).toHaveBeenCalledWith('Please enter a valid number for the price.');
    });

    test('should show an alert if fields are empty', () => {
        render(<FormComponent />);
        
        const button = screen.getByText(/Add Component/i);
        fireEvent.click(button);
    
        expect(window.alert).toHaveBeenCalledWith('Please fill out all fields.');
    });

    test('should show loading state when submitting the form', async () => {
        render(<FormComponent />);
    
        const nameInput = screen.getByLabelText(/Name of the component/i);
        const priceInput = screen.getByLabelText(/Price of the component/i);
        const button = screen.getByText(/Add Component/i);
    
        fireEvent.change(nameInput, { target: { value: 'New Component' } });
        fireEvent.change(priceInput, { target: { value: '100' } });
        fireEvent.click(button);
    
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('should render EditForm modal when component is passed', () => {
        const component = { name: 'Component 1', price: '100', category: 'Hardware' };
        
        render(<EditForm component={component} onClose={() => {}} onUpdate={() => {}} />);
        
        expect(screen.getByText(/Edit Component/i)).toBeInTheDocument();
    });

    test('should call onClose when Cancel is clicked in EditForm', () => {
        const component = { name: 'Component 1', price: '100', category: 'Hardware' };
        const onClose = jest.fn();
        const onUpdate = jest.fn();
    
        render(<EditForm component={component} onClose={onClose} onUpdate={onUpdate} />);
    
        fireEvent.click(screen.getByText(/Cancel/i));
    
        expect(onClose).toHaveBeenCalled();
    });
});
