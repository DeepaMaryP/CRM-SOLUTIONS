import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { createCustomer, fetchCustomerWithId, updateCustomer } from '../../api/customer';

function AddCustomerPage() {
  const custId = useParams().custId
  const [customer, setCustomer] = useState({ _id: 0 });
  const navigate = useNavigate()
  const [error, SetError] = useState("");
  const user = useSelector((state) => state.auth)

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const data = await fetchCustomerWithId(custId, user.token)
        setCustomer(data)
      } catch (err) {
        SetError("Unable to get Customer details")
        console.error("Error fetching customer:", err)
      }
    }

    if (custId) loadCustomer() // for edit customer
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const updateExistingCustomer = async () => {
    try {
      const data = await updateCustomer(customer, user.token)
      if (data.success) {
        console.log("Updated Customer:", data)
        navigate("/admin/customer");
      } else {
        SetError(data?.message || "Failed to create customer");
      }
    } catch (err) {
      SetError("Failed to update customer")
      console.error("Failed to update customer:", err)
    }
  }


  const createNewCustomer = async () => {
    try {
      const { _id, ...newCustomer } = customer;
      const data = await createCustomer(newCustomer, user.token);

      if (data.success) {
        console.log("Created Customer:", data);
        navigate("/admin/customer");
      } else {
        console.log(data?.message);
        SetError(data?.message || "Failed to create customer");
      }
    } catch (err) {
      SetError("Something went wrong. Please try again.");
      console.error("Failed to create customer:", err);
    }
  };

  const saveCustomer = (event) => {
    event.preventDefault();

    if (customer._id != 0) {
      updateExistingCustomer();
    }
    else {
      createNewCustomer();
    }
  }

  return (
    <div className='m-15'>
      <div className='flex flex-col sm:flex-row justify-center sm:justify-around mb-5 items-center'>
        <h1 className='text-xl font-bold m-2 sm:m-0 '>Add Customer</h1>
        <Link to='/admin/customer' >
          <span className='text-blue-600 font-bold'>Back to Manage Customers</span></Link>
      </div>
      <form className='border rounded p-5 m-auto w-3/4' onSubmit={saveCustomer}>
        <div className=''>
          <div className='grid grid-cols-5'>
            <label htmlFor="firstName" className='pr-20 text-center'>FirstName :</label>
            <input type="text" id="firstName" value={customer?.firstName} required name="firstName" className='col-span-4 border w-1/2' onChange={handleChange} placeholder='Enter FirstName' />
          </div>

          <div className="grid grid-cols-5 my-8">
            <label htmlFor="lastName" className='pr-20 text-center'>LastName :</label>
            <input type="text" id="lastName" value={customer?.lastName} required name="lastName" className='col-span-4 border w-1/2' onChange={handleChange} placeholder='Enter LastName' />
          </div>

          <div className="grid grid-cols-5 my-8">
            <label htmlFor="email" className='pr-20 text-center'>Email :</label>
            <input type="email" id="email" value={customer?.email} required name="email" className='col-span-4 border w-1/2' onChange={handleChange} placeholder='Enter email' />
          </div>

          <div className="grid grid-cols-5 my-8">
            <label htmlFor="phone" className='pr-20 text-center'>Phone :</label>
            <input type="number" id="phone" value={customer?.phone} required name="phone" className='col-span-4 border w-1/2' onChange={handleChange} placeholder='Enter phone' />
          </div>

          {error.length > 0 &&
          <div>
            <span className='text-red-400 p-5'>{error}</span>
          </div> }

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button type="button" className="text-md font-semibold text-gray-900" >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-md font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCustomerPage
