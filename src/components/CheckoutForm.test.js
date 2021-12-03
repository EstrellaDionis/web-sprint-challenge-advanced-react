import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>)

    const firstNameField = screen.getByLabelText(/First Name:/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const addressField = screen.getByLabelText(/Address:/i);
    const cityField = screen.getByLabelText(/City:/i);
    const stateField = screen.getByLabelText(/State:/i);
    const zipField = screen.getByLabelText(/Zip:/i); 
    const button = screen.getByRole('button');


    userEvent.type(firstNameField, 'Dionis')
    userEvent.type(lastNameField, 'Estrella')
    userEvent.type(addressField, '123 SmackDown Lane')
    userEvent.type(cityField, 'Jabroni')
    userEvent.type(stateField, 'KYR')
    userEvent.type(zipField, '12345')
    userEvent.click(button)

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(addressField).toBeInTheDocument();
    expect(cityField).toBeInTheDocument();
    expect(stateField).toBeInTheDocument();
    expect(zipField).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText(/Dionis/i);
        const lastNameDisplay = screen.queryByText(/Estrella/i);
        const addressDisplay = screen.queryByText(/123 SmackDown Lane/i);
        const cityDisplay = screen.queryByText(/KYR/i);
        const zipDisplay = screen.queryByText(/12345/i);
        
        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(addressDisplay).toBeInTheDocument();
        expect(cityDisplay).toBeInTheDocument();
        expect(zipDisplay).toBeInTheDocument();

        const successMessage = screen.getByTestId('successMessage');
        expect(successMessage).toBeInTheDocument();
    })
});
