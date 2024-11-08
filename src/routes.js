import axios from 'axios'
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import ManageContacts from './views/ContactUs/ManageContacts'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const VandordDashboard = React.lazy(() => import('./views/dashboard/VandordDashbord'))
const AddStaffMember = React.lazy(() => import('./views/staffmember/AddStaffMember'))
const ManageStaffMember = React.lazy(() => import('./views/staffmember/ManageStaffMember'))
const AddProducts = React.lazy(() => import('./views/product/Addproduct'))
const ManageProducts = React.lazy(() => import('./views/product/ManagedProducts'))
const AddCategory = React.lazy(() => import('./views/category/AddCategory'))
const AddSubCategory = React.lazy(() => import('./views/subcategory/AddSubCategoris'))
const ManageSubCategory = React.lazy(() => import('./views/subcategory/ManageSubCategory'))
const ManageUser = React.lazy(() => import('./views/user/ManageUsers'))
const ManageAddress = React.lazy(() => import('./views/address/ManageAddress'))
const ManageFaq = React.lazy(() => import('./views/Faq/ManageFaqs'))
const Orders = React.lazy(() => import('./views/order/Orders'))
const Error404 = React.lazy(() => import('./views/pages/error404'))

let routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/products', name: 'Products', element: AddProducts },
  // { path: '/products/addproducts', name: 'Add Product', element: AddProducts },
  // { path: '/products/manageproducts', name: 'Manage Product', element: ManageProducts },
  // { path: '/category', name: 'Category', element: AddCategory },
  // { path: '/subcategory', name: 'SubCategory', element: AddSubCategory },
  // { path: '/subcategory/addsubcategory', name: 'SubCategory', element: AddSubCategory },
  { path: '/error404', exact: true, name: 'Error 404', element: Error404 },
  // { path: '/vandorddashboard', name: 'Vandord Dashboard', element: VandordDashboard },
]

const userRole = localStorage.getItem("role");
const jwtToken = localStorage.getItem('tokenAuth')
const userEmail = jwtDecode(jwtToken).email;
// const res= await axios.get(`http://localhost:5001/getuserbyid/${userEmail}`,userEmail)
const res= await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getuserbyid/${userEmail}`,userEmail)
// const Access = JSON.parse(res.data.canAccess)
const Access = typeof res.data.canAccess === 'string' 
    ? JSON.parse(res.data.canAccess) 
    : res.data.canAccess;
console.log("access",Access)

if (userRole === 'admin') {
  routes = [
    ...routes,
    // { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/user/manageuser', name: 'user', element: ManageUser },
    { path: '/address/manageaddress', name: 'ManageAddress', element: ManageAddress },
    // { path: '/staffmember', name: 'StaffMember', element: AddStaffMember },
    // { path: '/staffmember/addstaffmember', name: 'StaffMember', element: AddStaffMember },
    // { path: '/staffmember/managestaffmember', name: 'StaffMember', element: ManageStaffMember },
    { path: '/managefaq', name: 'Faq', element: ManageFaq },
    { path: '/managecontact', name: 'Contact', element: ManageContacts },
    // { path: '/orders', name: 'Orders', element: Orders }
  ];
} else {
  routes.push({ path: '*', name: 'Error 404', element: Error404 });
}

//ManageProduct
if(Access.canManageProducts){
  routes = [
    ...routes,
    { path: '/products', name: 'Products', element: AddProducts },
    { path: '/products/addproducts', name: 'Add Product', element: AddProducts },
    { path: '/products/manageproducts', name: 'Manage Product', element: ManageProducts },
  ]
}else {
  routes.push({ path: '*', name: 'Error 404', element: Error404 });
}

//canManageCategory
if(Access.canManageCategory){
  routes = [
    ...routes,
    { path: '/category', name: 'Category', element: AddCategory },
  ]
}else {
  routes.push({ path: '*', name: 'Error 404', element: Error404 });
}

//canManagesubCategory
if(Access.canManageSubCategory){
  routes = [
    ...routes,
    { path: '/subcategory', name: 'SubCategory', element: AddSubCategory },
    { path: '/subcategory/addsubcategory', name: 'SubCategory', element: AddSubCategory },
  ]
}else {
  routes.push({ path: '*', name: 'Error 404', element: Error404 });
}

//canManageOrder
if(Access.canManageOrders){
  routes = [
    ...routes,
    { path: '/orders', name: 'Orders', element: Orders }
  ]
}else {
  routes.push({ path: '*', name: 'Error 404', element: Error404 });
}

//canManageUsers
if(Access.canManageUsers){
  routes = [
    ...routes,
    { path: '/orders', name: 'Orders', element: Orders }
  ]
}else {
  routes.push({ path: '*', name: 'Error 404', element: Error404 });
}

export default routes;
