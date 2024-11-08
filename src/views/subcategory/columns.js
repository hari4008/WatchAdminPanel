import { CButton, CCol, CForm, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTableDataCell, CTableHeaderCell } from "@coreui/react"
import { useFormik } from "formik";
import { BadgeX, SquarePen } from "lucide-react"
import React,{ useState } from "react"
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { deleteSubCate, updateSubCate } from "src/RTK/Slice/subcateSlice";

export const COLUMNS = [
    {
        Header: "Index",
        accessor: "index",
        Cell: row => {
            return (
                <CTableHeaderCell scope="row">{parseInt(row.row.id) + 1}</CTableHeaderCell>
            )
        }
    },
    {
        Header: "Category",
        accessor: "category_name",
        Cell: row => {
            // console.log("row.cate ",row.row.original)
            return (
                <CTableDataCell>{row.row.original?.category?.category_name}</CTableDataCell>
            )
        }
    },
    {
        Header: "Sub-Category",
        accessor: "subcategory_name"
    },
    {
        Header: "Uploaded By",
        accessor: "uploadby"
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: row => {
            // console.log("row row update ",row.row.original)
            const [visible, setVisible] = useState(false);
            const subcateSchema = Yup.object({
                subcategory_name: Yup.string().required("sub-category name is required"),
            })
            const dispatch = useDispatch()
            const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
                initialValues: {
                    subcategory_name: row.row.original.subcategory_name,
                    cate_name: row.row.original?.category?.category_name,
                    uploadby: row.row.original.uploadby
                },
                ValidityState: subcateSchema,
                onSubmit: (values) => {
                    console.log("values ",values)
                    const newValues = {
                        ...values,
                        id:row.row.original.id
                    }
                    dispatch(updateSubCate(newValues))
                    setVisible(false)
                }
            })
            const handleDelete = (id) => {
                console.log("id", id)
                dispatch(deleteSubCate(id))
                // dispatch(getAllSubCat())
                // dispatch(getCate(id))
                // dispatch(getAllCate())
            }
            console.log()
            return (
                <>
                    <div className="flex">
                        <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} onClick={() => {
                            setVisible(!visible)
                            // handleUpdate(row.row.original.id);
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
                                    Update Sub-Category
                                </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow>
                                    <CCol>
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Category"
                                            name='cate_name'
                                            // placeholder='Enter Sub-Category'
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.cate_name}
                                            // required
                                            disabled
                                        // disabled={!edit}
                                        />
                                        {/* {errors.name && touched.name ? (
                                            <p className="form-error text-danger">{errors.name}</p>
                                        ) : null} */}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Sub-Category"
                                            name='subcategory_name'
                                            placeholder='Enter Sub-Category'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.subcategory_name}
                                            required
                                        // disabled={!edit}
                                        />
                                        {errors.subcategory_name && touched.subcategory_name ? (
                                            <p className="form-error text-danger">{errors.subcategory_name}</p>
                                        ) : null}
                                    </CCol>
                                </CRow>
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
                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit">Save changes</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>
                </>
            )
        }
    }
]