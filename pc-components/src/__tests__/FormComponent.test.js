import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormComponent from '../components/FormComponent.jsx';
import { addComponent } from '../services/api';

// Mocking the addComponent function from the API
jest.mock('../services/api', () => ({
    addComponent: jest.fn(),
}));

describe('FormComponent', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        addComponent.mockReset();
    });

    test('renders the form with name and price fields', () => {
        render(<FormComponent />);

        // Check if the form elements are in the document
        expect(screen.getByLabelText(/name of the component/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/price of the component/i)).toBeInTheDocument();
        expect(screen.getByText(/Add New Component/i)).toBeInTheDocument();
    });

    test('allows the user to input component name and price', () => {
        render(<FormComponent />);

        // Input values into the fields
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25' },
        });

        // Check that the values have been updated
        expect(screen.getByLabelText(/name of the component/i).value).toBe('Test Component');
        expect(screen.getByLabelText(/price of the component/i).value).toBe('25');
    });

    test('calls addComponent and shows success message on valid form submission', async () => {
        // Mock alert
        global.alert = jest.fn();
    
        addComponent.mockResolvedValueOnce({});
    
        render(<FormComponent />);
    
        // Input values into the fields
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the success message to appear
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Component successfully saved.');
        });
    
        // Check that addComponent was called with the correct arguments
        expect(addComponent).toHaveBeenCalledWith({
            name: 'Test Component',
            price: '25',
        });
    });    

    test('shows error message on failed form submission', async () => {
        // Mock alert
        global.alert = jest.fn();
    
        addComponent.mockRejectedValueOnce(new Error('Error'));
    
        render(<FormComponent />);
    
        // Input values into the fields
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the error message to be triggered
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Error during saving.');
        });
    
        // Check that addComponent was called with the correct arguments
        expect(addComponent).toHaveBeenCalledWith({
            name: 'Test Component',
            price: '25',
        });
    });    

    test('resets form fields after successful submission', async () => {
        // Mock alert
        global.alert = jest.fn();
    
        addComponent.mockResolvedValueOnce({});
    
        render(<FormComponent />);
    
        // Input values into the fields
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the success message to be triggered
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Component successfully saved.');
        });
    
        // Check that addComponent was called with the correct arguments
        expect(addComponent).toHaveBeenCalledWith({
            name: 'Test Component',
            price: '25',
        });
    
        // Check that the form fields are reset
        expect(screen.getByLabelText(/name of the component/i).value).toBe('');
        expect(screen.getByLabelText(/price of the component/i).value).toBe('');
    });  
    
    test('shows error when fields are empty on form submission', async () => {
        // Mock alert
        global.alert = jest.fn();
    
        render(<FormComponent />);
    
        // Submit the form without entering values
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the alert to be called with the empty fields error message
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Please fill out both fields.');
        });
    });    

    test('submits the form with a valid price', async () => {
        // Mock alert to check if the success message is shown
        global.alert = jest.fn();
    
        render(<FormComponent />);
    
        // Fill in the valid form data
        fireEvent.change(screen.getByLabelText(/Name of the component/i), { target: { value: 'Test Component' } });
        fireEvent.change(screen.getByLabelText(/Price of the component/i), { target: { value: '100.50' } });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the success alert to be called
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Component successfully saved.');
        });
    });        

    test('does not reset form fields after failed submission', async () => {
        // Mock alert
        global.alert = jest.fn();
    
        addComponent.mockRejectedValueOnce(new Error('Error'));
    
        render(<FormComponent />);
    
        // Input values into the fields
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the error message to be triggered
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Error during saving.');
        });
    
        // Check that the form fields retain their values after the error
        expect(screen.getByLabelText(/name of the component/i).value).toBe('Test Component');
        expect(screen.getByLabelText(/price of the component/i).value).toBe('25');
    });

    test('shows loading state during form submission', async () => {
        addComponent.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
        render(<FormComponent />);
    
        // Input values into the fields
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Check if the loading indicator is visible
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    
        // Wait for the API call to complete
        await waitFor(() => {
            expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
        });
    });    

    test('handles valid form submission with price as a float', async () => {
        // Mock alert
        global.alert = jest.fn();
    
        addComponent.mockResolvedValueOnce({});
    
        render(<FormComponent />);
    
        // Input valid data with price as a float
        fireEvent.change(screen.getByLabelText(/name of the component/i), {
            target: { value: 'Test Component' },
        });
        fireEvent.change(screen.getByLabelText(/price of the component/i), {
            target: { value: '25.99' },
        });
    
        // Submit the form
        fireEvent.click(screen.getByText(/Add Component/i));
    
        // Wait for the success message
        await waitFor(() => {
            expect(global.alert).toHaveBeenCalledWith('Component successfully saved.');
        });
    
        // Check that the API was called with the correct arguments
        expect(addComponent).toHaveBeenCalledWith({
            name: 'Test Component',
            price: '25.99',
        });
    });
});
