import React, { useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilTags,
  cilList,
  cilSpeedometer,
  cilPuzzle,
  cibBuffer,
  cibCodesandbox,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const jwtToken = localStorage.getItem('tokenAuth')
const userEmail = jwtDecode(jwtToken).email;

// const dispatch = useDispatch()
// useEffect(()=>{
//   dispatch(getUserById(userEmail))
// })

const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getuserbyid/${userEmail}`, userEmail)
// const Access = JSON.parse(res.data.canAccess)
const Access = typeof res.data.canAccess === 'string' 
    ? JSON.parse(res.data.canAccess)
    : res.data.canAccess;
console.log("access", Access)

let _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'VDashboard',
  //   to: '/vandorddashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavGroup,
    name: 'Manage Products',
    to: '/products',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/products/addproducts',
      },
      {
        component: CNavItem,
        name: 'Products List',
        to: '/products/manageproducts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Category',
    to: '/Category',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Category',
        to: '/Category',
      },
      // {
      //   component: CNavItem,
      //   name: 'SubCategory List',
      //   to: '/subcategory/manageSubCategory',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'SubCategory',
    to: '/SubCategory',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add SubCategory',
        to: '/subcategory/addSubCategory',
      },
      // {
      //   component: CNavItem,
      //   name: 'SubCategory List',
      //   to: '/subcategory/manageSubCategory',
      // },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Manage Orders',
  //   to: '/orders',
  //   icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
  // },
  {
    component: CNavGroup,
    name: 'Order',
    to: '/orders',
    icon: <CIcon icon={cibCodesandbox} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Manage Orders",
        to: '/orders',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'CMS',
    to: '/others',
    icon: <CIcon icon={cibBuffer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Manage FAQ's",
        to: '/manageFaq',
      },
      {
        component: CNavItem,
        name: "Manage ContactUs",
        to: '/managecontact',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage User',
        to: '/user/manageuser',
      },
      // {
      //   component: CNavItem,
      //   name: 'SubCategory List',
      //   to: '/subcategory/manageSubCategory',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Address',
    to: '/address',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Address',
        to: '/address/manageaddress',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Login',
  //   to: '/login',
  // },
]

// if (localStorage.getItem("role") !== 'admin') {
//   _nav = _nav.filter(item =>
//     item.name !== 'User' &&
//     item.name !== 'CMS' &&
//     item.name !== 'Order');
// }

if (!Access.canManageProducts) {
  _nav = _nav.filter(item =>
    item.name !== 'Manage Products');
}


if (!Access.canManageCategory) {
  _nav = _nav.filter(item =>
    item.name !== 'Category');
}

if (!Access.canManageSubCategory) {
  _nav = _nav.filter(item =>
    item.name !== 'Manage SubCategory');
}
if (!Access.canManageOrders) {
  _nav = _nav.filter(item =>
    item.name !== 'Order' &&
    item.name !== 'CMS');
}

if (!Access.canManageUsers) {
  _nav = _nav.filter(item =>
    item.name !== 'User');
}

export default _nav
