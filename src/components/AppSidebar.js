import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import logo  from '../assets/images/logo.png';

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { getAllCate } from 'src/RTK/Slice/cateSlice'
import { getAllProduct } from 'src/RTK/Slice/productSlice'
import { getAllStaff } from 'src/RTK/Slice/staffSlice'
import { getallUser } from 'src/RTK/Slice/userSlice'
import { getAllFaq } from 'src/RTK/Slice/faqSlice'
import { getAllSubCat } from 'src/RTK/Slice/subcateSlice'
import { getAllOrders } from 'src/RTK/Slice/orderSlice'
import { getAllAddress } from 'src/RTK/Slice/addressSlice'
import { getAllContact } from 'src/RTK/Slice/contactSlice'

const AppSidebar = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllCate());
    dispatch(getAllProduct());
    dispatch(getAllStaff());
    dispatch(getallUser());
    dispatch(getAllFaq());
    dispatch(getAllSubCat());
    dispatch(getAllOrders());
    dispatch(getAllAddress());
    dispatch(getAllContact());
  },[dispatch])

  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const {active} = useSelector((state) => state.sidebar);
  return (
    <CSidebar
      position="fixed"
      visible={active}
      className={active ? '' : 'hide'}
      // unfoldable={unfoldable}
      // onVisibleChange={(visible) => {
      //   dispatch({ type: 'set', sidebarShow: visible })
      // }}
    >
      <CSidebarBrand className="d-md-flex" to="/"  style={{ 'background': 'white', 'border': 'none' }}>
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <img src={logo} />
        {/* <CIcon className="sidebar-brand-full" icon={logo} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }}>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({type: 'set', toggleSidebar })}
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
