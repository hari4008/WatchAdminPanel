import React, { Component } from 'react';
import { CButton, CCol, CForm, CFormInput, CFormLabel, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTableHeaderCell } from "@coreui/react"
import { BadgeX, SquarePen } from "lucide-react"
import { useState } from "react"
import { useFormik } from 'formik'
// import { deleteCate } from '../../RTK/Slice/cateSlice/'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { deleteCate, editCate } from 'src/RTK/Slice/cateSlice';
// import { deleteCate, editCate } from "../../RTK/slice/cateSlice"\

export const COLUMNS = [
    {
        Header: "Index",
        accessor: "index", // accessor is the "key" in the data
        Cell: row => {
            return (
                <CTableHeaderCell>{parseInt(row.row.id) + 1}</CTableHeaderCell>
            )
        },
    },
    {
        Header: "Category ",
        accessor: "category_name",
    },
    {
        Header: "uploaded by",
        accessor: "uploadby",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: row => {
            // console.log("roe", row.row.original);
            const [visible, setVisible] = useState(false)
            // const [edit, setEdit] = useState(false)
            const cateSchema = Yup.object({
                category_name: Yup.string().required("Category name is required"),
            })
            const dispatch = useDispatch()
            const handleDelete = (id) => {
                console.log("cate id ", id)
                dispatch(deleteCate(id))
            }
            // const handleEdit = (id) => {
            //     console.log('id is ', id)
            // }
            const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
                initialValues: {
                    category_name: row.row.original.category_name,
                    uploadby: row.row.original.uploadby
                },
                validationSchema: cateSchema,
                onSubmit: (values) => {
                    console.log(values)
                    const data = {
                        id: row.row.original.id,
                        category_name: values.category_name,
                        uploadby: values.uploadby,
                    }
                    dispatch(editCate(data))
                    setVisible(false)
                    // setEdit(false)
                }
            })
            // console.log("row ",row.row.original)
            return (
                <>
                    <div className=" flex">

                        <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} onClick={() => {
                            setVisible(!visible)
                            // setEdit(!edit)
                        }} />
                        <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                    </div>
                    <CModal
                        visible={visible}
                        size="md"
                        onClose={() => setVisible(false)}
                        aria-labelledby="FullscreenExample1"
                    >
                        <CForm onSubmit={handleSubmit}>
                            <CModalHeader>
                                <CModalTitle id="FullscreenExample1">
                                    Update Category
                                </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow>
                                    <CCol>
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Category"
                                            name='category_name'
                                            placeholder='Enter Category Name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.category_name}
                                            required
                                        // disabled={!edit}
                                        />
                                        {errors.category_name && touched.category_name ? (
                                            <p className="form-error text-danger">{errors.category_name}</p>
                                        ) : null}
                                    </CCol>
                                </CRow>
                                {console.log('checking',values )}
                                <CRow>
                                    <CCol style={{ 'marginBottom': '6px' }}>
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Uploaded By"
                                            name='uploaddy'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.uploadby}
                                            required
                                            disabled
                                        />
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit">Save changes</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>
                </>

            )
        }
    }
]