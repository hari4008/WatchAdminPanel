import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { DocsExample } from 'src/components'
import { SquarePen } from 'lucide-react';
import { BadgeX, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProduct } from 'src/RTK/Slice/productSlice';

const ManageProduct = () => {
    const st = useSelector(state => state.product)
    // console.log("path ", process.env.REACT_APP_IMG_URL)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch])
    const products = st.products;
    const handleDelete = (id) => {
        console.log("product id ",id)
        dispatch(deleteProduct(id));
    }
    // console.log("PATH ",process.env.REACT_APP_PRO_IMG + )
    return (
        <CTable className='table table-hover' responsive>
            <CTableHead >
                <CTableRow>
                    <CTableHeaderCell scope="col">Index</CTableHeaderCell>
                    <CTableHeaderCell scope="col" >Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" >Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col" >Image</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col" >Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {/* <CTableRow> */}
                {
                    products?.map((product, index) => { 
                        {/* console.log("path",process.env.REACT_APP_PRO_IMG + product?.image[0]) */}
                        return (
                            <CTableRow key={index}>
                                <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
                                <CTableDataCell >{product?.name}</CTableDataCell>
                                <CTableDataCell >{product?.price}</CTableDataCell>
                                <CTableDataCell >{product?.description}</CTableDataCell>
                                {/* <CTableDataCell><img src={process.env.REACT_APP_PRO_IMG + product?.image[0]} alt={product?.name} className='img-thumbnail' height="100px" width="100px" /></CTableDataCell> */}
                                {/* <CTableDataCell>{product.description}</CTableDataCell> */}
                                <CTableDataCell>
                                    <div style={{ "display": "flex", "flexDirection": "column" }}>
                                        <Eye color="#1f99e5" strokeWidth={1.5} size={36} />
                                        <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} />
                                        <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => {
                                            handleDelete(product?.id)
                                        }} />
                                        {/* <Button>OK</Button> */}
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        )
                    })
                }
            </CTableBody>
        </CTable>
    )
}

const Validation = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Manage </strong> <small>Product</small>
                    </CCardHeader>
                    <CCardBody style={{ padding: 0 }}>
                        <DocsExample href="forms/validation#browser-defaults">{ManageProduct()}</DocsExample>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Validation

