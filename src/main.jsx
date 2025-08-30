import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

import ManageCustomerPage from './pages/admin/ManageCustomerPage.jsx'
import LayOutPage from './LayOutPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AddCustomerPage from './pages/admin/AddCustomerPage.jsx'
import LogIn from './LogIn.jsx'
import './index.css'
import Login from './LogIn.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LayOutPage />,
//     errorElement: <ErrorPage />,

//     children: [{
//       index: true,
//       element: <Login />
//     },    
//     {
//       path: "/login",
//       element: <LogIn />
//     },
//     {     
//        element: <ProtectedRoute />,
//           children: [
//             { path: "/admin/customer", element: <ManageCustomerPage /> }
//           ]
//     },
//     {
//       path: "/admin/addcustomer",
//       element:  <ProtectedRoute><AddCustomerPage /></ProtectedRoute>
//     },
//     {
//       path: "/admin/addcustomer/:custId",
//       element: <ProtectedRoute><AddCustomerPage /></ProtectedRoute>
//     }
//     ]
//   }
// ])




const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "/login",
        element: <LogIn />
      },
      {
        element: <ProtectedRoute />,   // wrapper
        children: [
          { path: "/admin/customer", element: <ManageCustomerPage /> },
          { path: "/admin/addcustomer", element: <AddCustomerPage /> },
          { path: "/admin/addcustomer/:custId", element: <AddCustomerPage /> },
        ]
      }
    ]
  }
])

 createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
       <RouterProvider router={router} />
     </Provider>
   </StrictMode>,
 )