import React, { useMemo, useState } from 'react'
import { COLUMNS } from './columns'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { DocsExample } from 'src/components'
import { jwtDecode } from 'jwt-decode';
import { getProByVenCate, getProByVenCateSubCate, getProductByVandor } from 'src/RTK/Slice/productSlice'
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user)
    const { categories } = useSelector(state => state.category);
    const { subcate } = useSelector(state => state.subcategory)
    const { products, totalpage } = useSelector((state) => state.product);
    // const products = useSelector((state) => state.product.products)
    const columns = useMemo(() => COLUMNS, [])

    const jwtToken = localStorage.getItem('tokenAuth');
    const user = jwtDecode(jwtToken).email;
    const role = localStorage.getItem('role');

    // const vandor = users.filter((person) => { return person.role === 'vandor' })
    const vandor = users.filter((person) => {
        return person.role === 'vandor' || person.role === 'admin';
      });
    console.log("Users", users, "vandor", vandor, "totalpage", totalpage)

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // State for filtering
    const [selectedVendor, setSelectedVendor] = useState("all");
    const [selectedCate, setSelectedCate] = useState("");
    const [selectedSubcate, setSelectedSubcate] = useState("");

    console.log("selectedVendor", selectedVendor, "setSelectedCate", selectedCate, "setSelectedSubcate", selectedSubcate)

    // Handlers for vendor, category, and sub-category changes
    const handleVandorChange = (e) => {
        const vandor = e.target.value;
        setSelectedVendor(vandor);
        setSelectedCate(""); // Reset category selection
        setSelectedSubcate("");

        const data = {
            vandor: vandor,
            currentPage: 1
        }

        if (vandor == 'all') {

            const data = {
                vandor: vandor,
                currentPage: 1
            }

            console.log("pro data ", data)
            dispatch(getProductByVandor(data))
        } else {
            console.log("pro data else", data)
            dispatch(getProductByVandor(data))
        }

    }

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        console.log("CATE IS ", e.target.value)
        setSelectedCate(category);
        const data = {
            vandor: selectedVendor,
            category: category,
            currentPage: 1
        }
        console.log("data in cate",data)
        dispatch(getProByVenCate(data));
        setCurrentPage(1)
        // setFlag(true);
        setSelectedSubcate("");
        // setFlag2(false);
    };

    const handleSubCateChange = (e) => {
        const subcate = e.target.value;
        setSelectedSubcate(subcate);
        const data = {
            vandor: selectedVendor,
            category: selectedCate,
            subcate: subcate,
            currentPage: 1
        }
        console.log("data in subcate",data)
        dispatch(getProByVenCateSubCate(data));
        setCurrentPage(1)
        // setFlag2(true);
    };

    // const data = useMemo(() => {
    //     // Filter products based on user
    //     return role == 'admin' ? products : products.filter((pro) => pro.uploadby === user);
    // }, [products, user]);
    const data = useMemo(() => products, [products])

    // React-table hooks
    const { getTableProps, getTableBodyProps, headerGroups, page, state, setGlobalFilter, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, setPageSize } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 }
    }, useGlobalFilter, usePagination)
    const { globalFilter, pageIndex, pageSize } = state

    // Filtering vendors, categories, and sub-categories
    console.log("seletedVendor",selectedVendor)
    const showCate = categories.filter((cate) => cate.uploadby == selectedVendor);
    const showSubCate = subcate.filter((sub) => sub.category.id == selectedCate);
    const vendor = users.filter((person) => person.role === 'vendor');
    const navigate = useNavigate()

    console.log("showCate",showCate,"showSubCate",showSubCate)

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage </strong> <small>Product</small>
                        </CCardHeader>
                        <CCardBody>
                            <DocsExample href="forms/validation#browser-defaults">
                                <CRow>
                                    <CCol md={3} >
                                        <CFormLabel htmlFor="validationDefault01">Search Product</CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            required
                                            name="name"
                                            value={globalFilter || ''}
                                            onChange={e => setGlobalFilter(e.target.value)}
                                        />
                                    </CCol>
                                    {role == 'admin' && (
                                        <>
                                            <CCol md={3} >
                                                <CFormLabel htmlFor="vandorSelect">Vandors</CFormLabel>
                                                <CFormSelect id="vandorSelect"
                                                    name="vandor"
                                                    onChange={handleVandorChange}
                                                    defaultValue={""}>
                                                    <option defaultValue={""} aria-disabled selected>Select Vandor...</option>
                                                    <option value={"all"}>All Vandor</option>
                                                    {vandor.map((person) => (
                                                        <option key={person.email} value={person.email}>{person.name}</option>
                                                    ))}
                                                </CFormSelect>
                                            </CCol>

                                            <CCol md={3}>
                                                <CFormLabel htmlFor="categorySelect">Category</CFormLabel>
                                                <CFormSelect id="categorySelect" 
                                                value={selectedCate} 
                                                onChange={handleCategoryChange}>
                                                    <option value="" defaultChecked disabled>Select Category...</option>
                                                    {showCate.map((cate) => (
                                                        <option key={cate.id} value={cate.id}>{cate.category_name}</option>
                                                    ))}
                                                </CFormSelect>
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormLabel htmlFor="subCategorySelect">Sub-Category</CFormLabel>
                                                <CFormSelect id="subCategorySelect" value={selectedSubcate} onChange={handleSubCateChange}>
                                                    <option value="" defaultChecked disabled>Select Sub-Category...</option>
                                                    {showSubCate.map((subcate) => (
                                                        <option key={subcate.id} value={subcate.id}>{subcate.subcategory_name}</option>
                                                    ))}
                                                </CFormSelect>
                                            </CCol>

                                        </>
                                    )}
                                </CRow>
                                <CTable className='table table-hover mt-3' responsive {...getTableProps()}>
                                    <CTableHead >
                                        {
                                            headerGroups.map((headerGroup) => (
                                                <CTableRow {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column) => (
                                                        <CTableHeaderCell scope='col' {...column.getHeaderProps()} > {column.render('Header')}</CTableHeaderCell>
                                                    ))}
                                                </CTableRow>
                                            ))
                                        }
                                    </CTableHead>
                                    <CTableBody {...getTableBodyProps()}>
                                        {
                                            page.map((row) => {
                                                prepareRow(row)
                                                return (
                                                    <CTableRow {...row.getRowProps()}>
                                                        {
                                                            row.cells.map((cell) => {
                                                                return (
                                                                    <CTableDataCell {...cell.getCellProps()}> {cell.render('Cell')}</CTableDataCell>
                                                                )
                                                            })
                                                        }
                                                    </CTableRow>
                                                )
                                            })
                                        }
                                    </CTableBody>
                                    {/* <div> */}

                                    {/* </div> */}

                                    {/* <CFormSelect value={pageSize} size="lg" className="mb-3" aria-label="Large select example" onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}>
                                        {[5,10,15].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>show{pageSize}</option>
                                        ))}
                                    </CFormSelect> */}
                                    {/* </CTableFooter> */}
                                </CTable>
                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} className=' mr-2' onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </CButton>
                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} className=' mr-2' onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next
                                </CButton>
                                <span> page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
                                <CFormSelect value={pageSize} size="lg" className="mb-3" aria-label="Large select example" onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}>
                                    {[5, 10, 15].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>show{pageSize}</option>
                                    ))}
                                </CFormSelect>
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )

}
export default ManageProducts
