import React from "react"
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CFormSwitch, CModal, CModalBody, CModalHeader, CModalTitle, CRow, CTableHeaderCell, CToast, CToastBody, CToastClose, CToastHeader, CToaster } from "@coreui/react"
import { useFormik } from "formik"
import { BadgeX, SquarePen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getallUser, updateRole } from "src/RTK/Slice/userSlice"
// import { deleteUser, getallUser, updateRole } from "src/RTK/slice/userSlice"

import Swal from "sweetalert2"

// import Swal from 'sweetalert2'
const role = localStorage.getItem('role')
var COLUMNS = [
    {
        Header: "Index",
        accessor: "index",
        Cell: row => {
            return (
                <CTableHeaderCell>{parseInt(row.row.id) + 1}</CTableHeaderCell>
            )
        }
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Username",
        accessor: "email",
    },
    {
        Header: "Phone",
        accessor: "phone",
    },
    {
        Header: "Role",
        accessor: "role",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: row => {
            const [visible, setVisible] = useState(false)
            const [edit, setEdit] = useState(false);
            const dispatch = useDispatch()
            const role = localStorage.getItem('role')
            const handleDelete = (id) => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your User has been deleted.",
                            icon: "success"
                        });
                        dispatch(deleteUser(id))
                    }
                });
            }
            // console.log("row.row.ori ", JSON.parse(row.row.original.canAccess).canManageUsers
            // )
            const { values, errors, touched, handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue
            } = useFormik({
                // initialValues: row.row.original,
                initialValues: {
                    name: row.row.original.name,
                    email: row.row.original.email,
                    phone: row.row.original.phone,
                    loginVia: row.row.original.loginVia,
                    status: row.row.original.status,
                    role: row.row.original.role,
                    // canManageUsers: false,
                    // canManageOrders: false,
                    // canManageCategory: false,
                    // canManageProducts: true,
                    canManageUsers: row.row.original.canAccess ? JSON.parse(row.row.original.canAccess).canManageUsers : false,
                    canManageOrders: row.row.original.canAccess ? JSON.parse(row.row.original.canAccess).canManageOrders : false,
                    canManageCategory: row.row.original.canAccess ? JSON.parse(row.row.original.canAccess).canManageCategory : false,
                    canManageSubCategory: row.row.original.canAccess ? JSON.parse(row.row.original.canAccess).canManageSubCategory : false,
                    canManageProducts: row.row.original.canAccess ? JSON.parse(row.row.original.canAccess).canManageProducts : false,
                    id: row.row.original ? row.row.original.id : null
                },
                enableReinitialize: true,
                onSubmit: async (values, { setSubmitting, resetForm }) => {
                    const canAccess = {
                        canManageUsers: values.canManageUsers,
                        canManageOrders: values.canManageOrders,
                        canManageCategory: values.canManageCategory,
                        canManageProducts: values.canManageProducts,
                        canManageSubCategory: values.canManageSubCategory
                    }
                    console.log("vlaue ", values)
                    Swal.fire({
                        title: "Are you sure?",
                        // text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, update it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Your product has been updated.",
                                icon: "success"
                            });
                            // dispatch(addCate(values));


                            await dispatch(updateRole(values))
                            await dispatch(getallUser())

                            setVisible(!visible)
                        }
                    });
                    setSubmitting(false);
                    resetForm();
                },
            })
            return (
                <>
                    <div className=" flex">
                        <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} onClick={() => {
                            setVisible(!visible)
                            setEdit(!edit)
                        }} />
                        <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                        <CModal
                            size="xl"
                            visible={visible}
                            onClose={() => {
                                setVisible(false)
                                setEdit(false)
                            }}
                            aria-labelledby="FullscreenExample1"
                        >
                            <CModalHeader>
                                <CModalTitle id="FullscreenExample1">
                                    User Details
                                </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm className="row g-3 flex justify-center"
                                    onSubmit={handleSubmit}
                                // encType='multipart/form-data'
                                >
                                    <CRow
                                        style={{ 'marginTop': '10px' }}>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Customer Name"
                                                name='name'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                // required
                                                disabled
                                            />

                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Username"
                                                name='email'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                // required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Phone No."
                                                name='phone'
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                                value={values.phone}
                                                required
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Login Through"
                                                name='loginVia'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.loginVia ? "Google Login" : "Regular"}
                                                // required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                // type="text"
                                                id="validationDefault01"
                                                label="Login Status"
                                                name='status'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status ? "login" : "logged-out"}
                                                // required
                                                disabled
                                            />
                                        </CCol>
                                        {
                                            role == 'admin' ? <CCol style={{ 'marginBottom': '6px' }}>
                                                <CFormSelect id="validationDefault04" label="Role" name='role'
                                                    // defaultChecked
                                                    value={values.role}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={!edit}
                                                >
                                                    <option disabled selected>Choose Role...</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="vandor">Vandor</option>
                                                    <option value="customer">Customer</option>
                                                </CFormSelect>
                                            </CCol> : <></>
                                        }



                                    </CRow>
                                    {
                                        role == 'admin' ? <CRow>
                                            <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                                {/* <CFormSwitch
                                            /> */}
                                                <CFormSwitch label="canManageProducts" name="canManageProducts" id="formSwitchCheckDefault"
                                                    onChange={handleChange}
                                                    checked={values.canManageProducts}
                                                />
                                            </CCol>
                                            <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                                {/* <CFormSwitch label="canManageCategory"
                                                name="canManageCategory"
                                                id="formSwitchCheckDefault"
                                                value={values.canManageCategory}
                                                onChange={handleChange}

                                            /> */}
                                                <CFormSwitch label="canManageCategory"
                                                    name="canManageCategory"
                                                    id="formSwitchCheckDefault"
                                                    checked={values.canManageCategory}
                                                    onChange={handleChange}
                                                />
                                            </CCol>
                                            <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                                {/* <CFormSwitch label="canManageCategory"
                                                name="canManageCategory"
                                                id="formSwitchCheckDefault"
                                                value={values.canManageCategory}
                                                onChange={handleChange}

                                            /> */}
                                            <CFormSwitch label="canManagesubcate"
                                                    name="canManageSubCategory"
                                                    id="formSwitchCheckDefault"
                                                    checked={values.canManageSubCategory}
                                                    onChange={handleChange}
                                                />
                                            </CCol>
                                            {/* <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                            <CFormSwitch label="canManageSubCategory" id="formSwitchCheckDefault"
                                            />
                                        </CCol> */}
                                            <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                                {/* <CFormSwitch label="canManageOrders" name="canManageOrders" id="formSwitchCheckDefault"
                                                value={values.canManageOrders}
                                                onChange={handleChange}

                                            /> */}
                                                <CFormSwitch label="canManageOrders" name="canManageOrders" id="formSwitchCheckDefault"
                                                    checked={values.canManageOrders}
                                                    onChange={handleChange}
                                                />
                                            </CCol>
                                            <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                                {/* <CFormSwitch label="canManageUsers" name="canManageUsers" id="formSwitchCheckDefault"
                                                value={values.canManageUsers}
                                                onChange={handleChange}
                                            /> */}
                                                <CFormSwitch label="canManageUsers" name="canManageUsers" id="formSwitchCheckDefault"
                                                    checked={values.canManageUsers}
                                                    onChange={handleChange}
                                                />
                                            </CCol>
                                            {/* <CCol md={3} style={{ 'marginBottom': '6px' }} >
                                            <CFormSwitch label="canManageProducts" id="formSwitchCheckDefault"
                                            />
                                        </CCol> */}
                                            {/* <CFormSwitch label="canManageProducts" id="formSwitchCheckDefault"
                                            /> */}


                                        </CRow> : <></>
                                    }


                                    {role == 'admin' ?
                                        <CRow>
                                            <CCol xs={12} className=" mt-[6px]" >
                                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" onSubmit={handleSubmit} className=" mt-[6px]">
                                                    Update Role
                                                </CButton>
                                            </CCol>
                                        </CRow> : <></>
                                    }

                                </CForm>
                            </CModalBody>
                        </CModal>
                    </div>
                </>
            )
        }

    }
]
// if (role !== 'admin') {
//     COLUMNS = COLUMNS.filter(item => item.accessor !== 'action')
// }

export default COLUMNS