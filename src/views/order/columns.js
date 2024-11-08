import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CModalTitle, CRow, CTableHeaderCell } from "@coreui/react"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Badge, BadgeX, Eye, SquarePen } from "lucide-react"
import React, { useState } from "react"
// import { deleteOrder, updateOrder } from "src/RTK/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, updateOrder } from "src/RTK/Slice/orderSlice";
// import { updateProduct } from "src/RTK/slice/productSlice";

export const COLUMNS = [
    {
        Header: 'Order ID',
        accessor: 'id',
        Cell: row => {
            return <CTableHeaderCell scope="row">{parseInt(row.row.id) + 1}</CTableHeaderCell>
        }
    },
    {
        Header: 'Customer',
        accessor: 'name',
    },
    {
        Header: 'Email id',
        accessor: 'email',
    },
    {
        Header: 'Phone Number',
        accessor: 'phone',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Quantity',
        accessor: 'quantity'
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: row => {
            return (<CTableHeaderCell scope="row" className={` rounded-md p-1 ${row.row.original.status === "pending" ? " bg-red-500" : row.row.original.status === "processing" ? "bg-yellow-500" : " bg-green-500"}`}>{row.row.original.status}</CTableHeaderCell>)
        }
    },
    {
        Header: 'Action',
        accessor: 'action',
        Cell: row => {
            const [visible, setVisible] = useState(false)
            const [edit, setEdit] = useState(false)
            const dispatch = useDispatch()
            const { products } = useSelector((state) => state.product)
            const handleDelete = (id) => {
                // console.log("product id ", id)
                dispatch(deleteOrder(id))
            }
            // console.log('pro pro 12345 ', products)
            const orderSchema = Yup.object({
                address: Yup.string().required("Address is required"),
                city: Yup.string().required("City is required"),
                pincode: Yup.string().required("Pincode is required"),
                status: Yup.string().required("Status is required"),
            })
            // console.log("roe row ", JSON.parse(row.row.original.products))
            const { values, errors, touched, handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue
            } = useFormik({
                initialValues: row.row.original,
                validationSchema: orderSchema,
                enableReinitialize: true,
                onSubmit: async (values, { setSubmitting, resetForm }) => {
                    // console.log("vlaue ", values)
                    setSubmitting(false);
                    const newValues = {
                        ...values,
                        // products: JSON.parse(values.products)
                        products: typeof values.products === 'string' ? JSON.parse(values.products) : values.products
                    }
                    // console.log("json parse ", JSON.parse(values.products))
                    dispatch(updateOrder(newValues))
                    // dispatch(getAllProduct())
                    resetForm();
                    setVisible(!visible)
                },
            })
            // const data = JSON.parse(JSON.parse(row?.row?.original.products))
            let data;

            try {
                // First parse if it's a string
                data = typeof row?.row?.original.products === 'string'
                    ? JSON.parse(row.row.original.products)
                    : row.row.original.products;

                // Check if it is still a string after the first parse and needs another JSON parse
                data = typeof data === 'string' ? JSON.parse(data) : data;
            } catch (error) {
                console.error("Error parsing JSON:", error);
                data = null; // or handle this case as needed
            }
            console.log("rew ", data)
            var result = data?.map((p) => {
                console.log("first ", p)
                return products?.find((product) => p?.id == product.id)
            })
            console.log("result 45 ", result)
            // const d = JSON.parse(row.row.original.products);
            // let result;
            // if (Array.isArray(d)) {
            //     result = d?.map((product, index) => {
            //         // console.log('pro ', product);
            //         return products?.find((p) => p.id == product.product_id);
            //     });
            //     console.log("res res res ", result);
            // } else {
            //     console.log("type of d is ",typeof(d));
            //     console.log("Error: d is not an array");
            // }

            return (
                <>
                    <div className="flex">
                        <Eye color="#1f99e5" strokeWidth={1.5} size={36} onClick={() => {
                            setVisible(!visible)
                        }} />
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
                                    {row.row.original.name}
                                </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                {/* hii... */}
                                <CForm className="row g-3 flex justify-center"
                                    onSubmit={handleSubmit} encType='multipart/form-data'
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
                                                required
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
                                                required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Phone No."
                                                name='phone'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
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
                                                label="city"
                                                name='city'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.city}
                                                required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }}>
                                            <CFormTextarea type="text" rows={4} id="productvalidation" label="address" name='address' value={values.address}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                disabled
                                            />

                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="pincode"
                                                name='pincode'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.pincode}
                                                required
                                                disabled
                                            />
                                        </CCol>
                                        {/* </CRow> */}
                                    </CRow>
                                    <CRow>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Total Quantity"
                                                name='quantity'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.quantity}
                                                required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Total Amount"
                                                name='total'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.total}
                                                required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol style={{ 'marginBottom': '6px' }}>
                                            <CFormSelect id="validationDefault04" label="Status" name='status'
                                                // defaultChecked
                                                value={values.status}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                disabled={!edit}

                                            >
                                                <option disabled selected>Choose Category...</option>
                                                <option value="pending">pending</option>
                                                <option value="processing">processing</option>
                                                <option value="delivered">delivered</option>
                                                {/* {
                                                    categories?.map((item) => (
                                                        <option key={item.id} value={item.id} >{item.name}</option>
                                                    ))
                                                } */}
                                            </CFormSelect>
                                            {/* {errors.categ && touched.categ ? (
                                                <p className="form-error text-danger">{errors.categ}</p>
                                            ) : null} */}
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CRow>
                                            <CCol>
                                                <div className="flex mr-2 mt-[6px] mb-[6px]">
                                                    {result && result?.map((item) => (
                                                        <>
                                                            {item && item.image && (
                                                                <img
                                                                    src={process.env.REACT_APP_IMG_URL + item.image[0]}
                                                                    alt="img"
                                                                    className="img-thumbnail mr-3 max-sm:mr-0"
                                                                    height="100px"
                                                                    width="100px"
                                                                    loading="lazy"
                                                                />
                                                            )}
                                                        </>
                                                    ))}
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CRow>
                                    {/* <CRow>
                                    <CCol style={{ 'marginBottom': '6px' }}>
                                        <CFormSelect id="validationDefault04" label="Category" name='categ'
                                            // defaultChecked
                                            value={values.categ}
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                handleChange(event)
                                            }
                                            }
                                            required
                                            disabled={!edit}

                                        >
                                            <option disabled selected>Choose Category...</option>
                                            {
                                                categories?.map((item) => (
                                                    <option key={item.id} value={item.id} >{item.name}</option>
                                                ))
                                            }
                                        </CFormSelect>
                                        {errors.categ && touched.categ ? (
                                            <p className="form-error text-danger">{errors.categ}</p>
                                        ) : null}
                                    </CCol>
                                    <CCol style={{ 'marginBottom': '6px' }}>
                                        <CFormSelect id="validationDefault04" label="Sub-Category" name='subcateId'
                                            value={values.subcateId}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            disabled={!edit}
                                        >
                                            <option selected disabled>Choose Sub Category...</option>
                                            {
                                                subcategory?.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.subcategory_name}</option>
                                                ))
                                            }

                                        </CFormSelect>
                                        {errors.subcateId && touched.subcateId ? (
                                            <p className="form-error text-danger">{errors.subcateId}</p>
                                        ) : null}
                                    </CCol>
                                </CRow> */}
                                    {/* <CRow>
                                    <CCol md={12} style={{ 'marginBottom': '6px' }}>
                                        <CFormTextarea type="text" rows={4} id="productvalidation" label="Description" placeholder='Enter Product Description...' name='description' value={values.description}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            required
                                            disabled={!edit}
                                        />
                                        {errors.description && touched.description ? (
                                            <p className="form-error text-danger">{errors.description}</p>
                                        ) : null}
                                    </CCol>
                                </CRow> */}
                                    {/* <CRow>
                                    {edit
                                        ?
                                        <CCol md={6} style={{ 'marginBottom': '6px' }}>
                                            <CFormLabel htmlFor="validationDefaultUsername">Upload Photos</CFormLabel>
                                            <CFormInput
                                                type="file"
                                                id="validationTextarea"
                                                name='image'
                                                // value={values.image}
                                                onChange={(event) => {
                                                    setFieldValue("image", event.currentTarget.files)
                                                }
                                                }
                                                // ref={inputFile}
                                                // onBlur={handleBlur}
                                                aria-label="file example"
                                                multiple
                                            />
                                            {errors.image && touched.image ? (
                                                <p className="form-error text-danger">{errors.image}</p>
                                            ) : null}
                                        </CCol>
                                        :
                                        null
                                    }
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <div className=" flex mr-2 mt-[6px] mb-[6px]">
                                            {row.row.original.image.map((item) => (
                                                <>
                                                    <img src={process.env.REACT_APP_IMG_URL + item} alt="img" className='img-thumbnail mr-3 max-sm:mr-0'
                                                        height="100px" width="100px"
                                                    />
                                                </>
                                            ))}
                                        </div>
                                    </CCol>
                                </CRow> */}
                                    {edit ?
                                        <CRow>
                                            <CCol xs={12} className=" mt-[6px]" >
                                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" onSubmit={handleSubmit} className=" mt-[6px]">
                                                    Update Product
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