import { createSlice } from "@reduxjs/toolkit";
import { createCustomer, fetchAllCustomers, fetchCustomerWithId, updateCustomer } from "../../api/customer";

const initialState = {
    allCustomers: [],
    customerDetails: { _id: 0 },
    status: "",
    error: null
}


const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        resetCustomerState: (state) => {
            state.status = "";
            state.allCustomers = [];
            state.customerDetails = { _id: 0 };
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCustomers.pending, (state,) => {
            state.status = "pending"
        }).addCase(fetchAllCustomers.fulfilled, (state, action) => {
            state.status = "success"
            state.allCustomers = action.payload.allCustomers
        }).addCase(fetchAllCustomers.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error
        }).addCase(fetchCustomerWithId.pending, (state) => {
            state.status = 'pending'
        }).addCase(fetchCustomerWithId.fulfilled, (state, action) => {
            state.status = 'success'
            state.customerDetails = action.payload
        }).addCase(fetchCustomerWithId.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error
        }).addCase(createCustomer.pending, (state) => {
            state.status = 'pending'
        }).addCase(createCustomer.fulfilled, (state, action) => {
            state.status = 'success'
            state.customerDetails = action.payload
        }).addCase(createCustomer.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error
        }).addCase(updateCustomer.pending, (state) => {
            state.status = 'pending'
        }).addCase(updateCustomer.fulfilled, (state, action) => {
            state.status = 'success'
            state.customerDetails = action.payload
        }).addCase(updateCustomer.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error
        })

    }
})

export const { resetCustomerState } = customerSlice.actions
export default customerSlice.reducer