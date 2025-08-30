import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCustomer, fetchAllCustomers } from '../../api/customer'
import { useSelector } from 'react-redux'

function ManageCustomerPage() {
    const [customers, setCustomers] = useState([])
    const user = useSelector((state) => state.auth)   

    const loadCustomers = async () => {
        try {
            const data = await fetchAllCustomers(user.token)
            setCustomers(data)
        } catch (err) {
            console.error("Error fetching customers:", err)
        }
    }

    useEffect(() => {
        loadCustomers()
    }, [])

    const doDeleteCustomer = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this customer?")) {
                const data = await deleteCustomer(id, user.token)
                if (data.success) {
                    console.log("Succesully deleted Customer details")
                    await loadCustomers()
                } else {
                    console.log(data.message);
                }
            } else {
                // User cancelled
                console.log("Deletion cancelled.");
            }
        } catch (err) {
            console.error("Failed to delete customer:", err)
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-2 sm:flex-row justify-around items-center px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                <h1 className='text-xl font-bold'>Manage Customers</h1>
                <div>
                    <Link to={`/admin/addcustomer`}>
                        <button className="text-white block bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Add New</button>
                    </Link>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full my-10 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white text-justify uppercase bg-blue-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="text-center">
                                First Name
                            </th>
                            <th scope="col" className="text-center">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Phone
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers?.map(customer =>
                                <tr key={customer._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="flex flex-col sm:flex-row items-center justify-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{customer.firstName}</div>
                                        </div>
                                    </th>
                                    <td className="text-center">
                                        {customer.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.phone}
                                    </td>
                                    <td className="relative flex flex-col items-center sm:flex-row p-2 sm:p-4 sm:space-x-2">
                                        <Link to={`/admin/addcustomer/${customer._id}`}>
                                            <button className="bg-blue-500 text-white px-3 py-1 mb-2 sm:mb-0 rounded-md text-xs md:text-sm">Edit</button>
                                        </Link>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm" onClick={() => doDeleteCustomer(customer._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageCustomerPage
