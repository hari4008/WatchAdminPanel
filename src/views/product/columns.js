import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CModalTitle, CRow, CTableHeaderCell } from "@coreui/react";
import { BadgeX, Eye, SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { deleteProduct, getAllProduct, updateProduct } 
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { deleteProduct, getAllProduct, updateProduct } from "src/RTK/Slice/productSlice";

// console.log("img is ",products)
export const COLUMNS = [
    {
        Header: "Index",
        accessor: "index",
        Cell: row => {
            // console.log("row is ", row.row.id);
            var digit = parseInt(row.row.id) + 1;
            return (
                <CTableHeaderCell scope="row" >{digit}</CTableHeaderCell>
            );
        }
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Price",
        accessor: "price"
    },
    {
        Header: "Title",
        accessor: "place"
    },
    {
        Header: "Description",
        accessor: "description"
    },
    {
        Header: "Uploadby",
        accessor: "uploadby"
    },
    {
        Header: "Image",
        accessor: "image",
        Cell: row => {
            console.log("img is",row.row.original);
            return (
                <img src={process.env.REACT_APP_IMG_URL + row.row.original.image[0]} alt="img" className='img-thumbnail' height="100px" width="100px" />
            );
        }
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: row => {
            console.log("row row ", row.row.original)
            const dispatch = useDispatch()
            const handleDelete = (id) => {
                // console.log("product id ", id)
                dispatch(deleteProduct(id))
            }
            const initValue = {
                id: row.row.original.id,
                image: row.row.original.image,
                place: row.row.original.place,
                name: row.row.original.name,
                price: parseInt(row.row.original.price),
                description: row.row.original.description,
                subcateId: parseInt(row.row.original.subcateId),
                categ: parseInt(row.row.original.categ),
                place: row.row.original.place,
                uploadby: row.row.original.uploadby,
            }
            const [visible, setVisible] = useState(false)
            const [edit, setEdit] = useState(false)
            // console.log("cate ", row.row.original.image[0])
            // console.log("pro ", row.row.original)
            const { categories } = useSelector(state => state.category);

            const productSchema = Yup.object({
                name: Yup.string().min(3, 'enter proper product name').required('Enter product name'),
                price: Yup.number().min(1, 'value must greater than 0').required('Enter product price'),
                description: Yup.string().min(3, 'enter proper product description').required('Enter product description'),
                subcateId: Yup.string().required('select sub-category'),
                categ: Yup.string().required('select category'),
                // image: Yup.mixed().required('select product image'),
            })
            const { values, errors, touched, handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue
            } = useFormik({
                initialValues: initValue,
                validationSchema: productSchema,
                enableReinitialize: true,
                onSubmit: async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(false);
                    console.log('val ', values)
                    const newValues = {
                        ...values,
                        image: values.image
                    }
                    console.log("newValue ", newValues)
                    dispatch(updateProduct(newValues))
                    await dispatch(getAllProduct())
                    resetForm();
                    setVisible(!visible)
                },
            })
            const { subcate } = useSelector(state => state.subcategory);
            const [subcategory, setSubcategory] = useState([]);

            return (
                <>
                    <Eye color="#1f99e5" strokeWidth={1.5} size={36} onClick={() => {
                        setVisible(!visible)
                        const sub = subcate.filter((item) => item.category_id == row.row.original.categ);
                        setSubcategory(sub)
                    }} />
                    <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} onClick={() => {
                        setVisible(!visible)
                        setEdit(!edit)
                        const sub = subcate.filter((item) => item.category_id == row.row.original.categ);
                        setSubcategory(sub)
                        // console.log("sub cate ", subcategory)
                    }} />
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
                            <CForm className="row g-3 flex justify-center"
                                onSubmit={handleSubmit} encType='multipart/form-data'
                            >
                                <CRow
                                    style={{ 'marginTop': '10px' }}>
                                    <CCol md={6} style={{ 'marginBottom': '6px' }} >
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Product name"
                                            name='name'
                                            placeholder='Enter Product Name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.name}
                                            required
                                            disabled={!edit}
                                        />
                                        {errors.name && touched.name ? (
                                            <p className="form-error text-danger">{errors.name}</p>
                                        ) : null}
                                    </CCol>
                                    <CCol style={{ 'marginBottom': '6px' }}>
                                        <CFormLabel htmlFor="validationDefaultUsername">Price</CFormLabel>
                                        <CInputGroup hasValidation>
                                            <CInputGroupText id="inputGroupPrepend02">₹</CInputGroupText>
                                            <CFormInput
                                                type="number"
                                                id="validationDefaultUsername"
                                                name='price'
                                                onChange={handleChange}
                                                value={values.price}
                                                // value={edit ? values.price : row.row.original.price}
                                                onBlur={handleBlur}
                                                placeholder='Enter Price'
                                                aria-describedby="inputGroupPrepend02"
                                                required
                                                // min="1" // Set minimum value to 0
                                                disabled={!edit}
                                            />
                                        </CInputGroup>
                                        {errors.price && touched.price ? (
                                            <p className="form-error text-danger">{errors.price}</p>
                                        ) : null}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol style={{ 'marginBottom': '6px' }}>
                                        <CFormSelect id="validationDefault04" label="Category" name='categ'
                                            // defaultChecked
                                            value={values.categ}
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                const sub = subcate.filter((item) => item.category_id == event.target.value);
                                                setSubcategory(sub)
                                                console.log("subsub ", sub)
                                                handleChange(event)
                                            }
                                            }
                                            required
                                            disabled={!edit}

                                        >
                                            <option disabled selected>Choose Category...</option>
                                            {
                                                categories?.map((item) => (
                                                    <option key={item.id} value={item.id} >{item.category_name}</option>
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
                                    <CCol style={{ 'marginBottom': '6px' }}>
                                        <CFormSelect id="validationDefault04" label="Place" name='place' value={values.place} defaultValue={"Regular"} onBlur={handleBlur} onChange={handleChange} required disabled={!edit}>
                                            <option selected disabled value="">Select Place...</option>
                                            <option value={"Regular"}>Regular</option>
                                            <option value={"Hot deal"}>Hot deal</option>
                                            <option value={"Main carousel"}>Main Carousel</option>
                                            <option value={"Week deal"}>Week deal</option>
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow>

                                    <CCol md={12} style={{ 'marginBottom': '6px' }}>
                                        {/* <CFormInput type="text" id="validationDefault03" label="Description" required /> */}
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
                                </CRow>
                                <CRow>
                                    {edit
                                        ?
                                        <CCol md={6} style={{ 'marginBottom': '6px' }}>
                                            <CFormLabel htmlFor="validationDefaultUsername">Upload Photos</CFormLabel>
                                            <CFormInput
                                                type="file"
                                                id="validationTextarea"
                                                name='image'
                                                accept=".jpg, .jpeg, .png"
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
                                    <CCol md={6} style={{ 'marginBottom': '6px' }} >
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Uploadby"
                                            name='uploadby'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.uploadby}
                                            required
                                            disabled
                                        />
                                        {errors.name && touched.name ? (
                                            <p className="form-error text-danger">{errors.name}</p>
                                        ) : null}
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <div className=" flex mr-2 mt-[6px] mb-[6px]">
                                            {console.log("type of row.row ", typeof (row.row.original.image), row.row.original.image)}
                                            {Object.keys(row.row.original.image).map((key) => (
                                                <img
                                                    src={process.env.REACT_APP_IMG_URL + row.row.original.image[key]}
                                                    alt="img"
                                                    className='img-thumbnail mr-3 max-sm:mr-0'
                                                    height="100px"
                                                    width="100px"
                                                    key={key}
                                                />
                                            ))}
                                        </div>
                                    </CCol>
                                </CRow>
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

                    <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                </>
            )
        }
    }
]