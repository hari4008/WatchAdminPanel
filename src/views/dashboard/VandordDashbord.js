import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
    CCol,
    CRow,
    CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilListLowPriority, cibCodesandbox, cilGroup, cilCommentBubble, cilUser } from '@coreui/icons'
import Chart from '../chart/Chart';
import { jwtDecode } from 'jwt-decode';


const VandordDashboard = () => {
    const [TokenData, setTokendata] = useState(jwtDecode(localStorage.getItem('tokenAuth')))
    console.log("TokenData", TokenData)

    const { products } = useSelector(state => state.product)
    console.log('products', products)
    const { users } = useSelector(state => state.user);
    const st = useSelector(state => state.category)
    const st2 = useSelector(state => state.staff)
    const st4 = useSelector(state => state.faq);
    const st5 = useSelector(state => state.subcategory);
    const { orders } = useSelector(state => state.order)

    const tempPro = products.filter((item) => { return item.uploadby == TokenData.email })
    console.log("tempPro", tempPro)
    const temp = orders.filter((item) => item.products)
    const temp2 = temp.products

    console.log("temp", temp, "temp2", temp2)

    const totalProduct = tempPro?.length ? tempPro?.length : 0;
    // const totalUser = users?.length ? users?.length : 0;
    // const totalStaff = st2.staff[0]?.length ? st2.staff[0]?.length :0;
    // const totalCate = st.categories?.length ? st.categories?.length : 0;
    // const totalFaq = st4.faqs?.length ? st4.faqs?.length : 0;
    // const totalSubCat = st5.subcate?.length ? st5.subcate?.length : 0;
    const totalOrder = orders?.length ? orders?.length : 0;

    // --------------------------------------------------
    const jwtEmail = TokenData.email;  // Decode once and use the email throughout

    var Revenue = 0
    var productResult
    var result
    var c = []
    var b = []

    const vendordata = []

    const totalResults = orders.reduce((count, item) => {
        try {
            const productData = JSON.parse(JSON.parse(item.products));  // Assuming 'item.products' needs one JSON.parse
            productData.forEach((priceqnty) => c.push({ priceqnty: priceqnty, item: item }))
            //get the product detail from product_id which is in the order's table(products)
            const productResult = productData.map((productInfo) => {
                return products.find(product => productInfo.product_id === product.id);
            });

            // Filter products which is uploaded by the vendor using jwtEmail(using token)
            const userSpecificResults = productResult.filter(product => product && product.uploadby === jwtEmail);
            userSpecificResults.forEach((i) => {
                c.forEach((j) => { // Corrected syntax for inner loop
                    if (i.id == j.priceqnty.product_id) {
                        vendordata.push(j)
                        // console.log("qnty is ", j)
                        Revenue += j.priceqnty.Qnty * i.price;
                    }
                });
            });
            c = []
            return count + userSpecificResults.length;  // Update count with the number of user-specific results
        } catch (error) {
            console.error("Error parsing product data", error);
            return count;  // Return current count if there's an error
        }
    }, 0);  // Start with a count of 0
    console.log("vendor data is ", vendordata)
    console.log("totalResults", totalResults)
    console.log("Revenue", Revenue)

    // --------------------------------------------------

    const vendormonthtotal = []
    const vendormonthOrder = []
    // const newData = [];

    // Iterate over orders
    vendordata.forEach((item) => {
        const d = new Date(item.item.createdAt);
        const existingMonthIndex = vendormonthtotal.findIndex((month) => month.month === d.getMonth() + 1);
        console.log("chart index is ", existingMonthIndex)
        const val = products.filter((pro) => pro.id === item.priceqnty.product_id)
        if (existingMonthIndex !== -1) {
            console.log("price is all ", val[0].price, "qnty ", item.priceqnty.Qnty)
            vendormonthtotal[existingMonthIndex].total += (val[0].price * item.priceqnty.Qnty)
            vendormonthOrder[existingMonthIndex].item += item.priceqnty.Qnty

        } else {
            vendormonthtotal.push({
                month: d.getMonth() + 1,
                total: val[0].price * item.priceqnty.Qnty
            })
            vendormonthOrder.push({
                month: d.getMonth() + 1,
                item: item.priceqnty.Qnty
            })
        }
    })
    vendormonthtotal.sort((a, b) => a.month - b.month);
    vendormonthOrder.sort((a, b) => a.month - b.month);
    console.log("chart vendor ", vendormonthtotal)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const convertMonthNames = (data) => {
        return data.map(item => ({
            month: months[item.month - 1],  // Convert 1-indexed month to 0-indexed array position
            total: item.total
        }));
    };
    const convertMonthNamesItem = (data) => {
        return data.map(item => ({
            month: months[item.month - 1],  // Convert 1-indexed month to 0-indexed array position
            item: item.item
        }));
    }
    // Convert and display the updated data
    const newDataTotal = convertMonthNames(vendormonthtotal);
    const newDataItem = convertMonthNamesItem(vendormonthOrder);
    // console.log(newData);

    return (
        <>
            <CRow>
                <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
                    <CWidgetStatsA style={{ height: '160px' }}
                        className="mb-4"
                        color="primary"
                        value={
                            <div style={{ fontSize: '40px' }}>
                                {totalProduct}
                            </div>
                        }
                        title="Total-Product"
                        action={
                            <CIcon
                                icon={cilCart}
                                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
                    <CWidgetStatsA style={{ height: '160px' }}
                        className="mb-4"
                        color="info"
                        value={
                            <div style={{ fontSize: '40px' }}>
                                {totalResults}
                            </div>
                        }
                        title="Total-Order"
                        action={
                            <CIcon
                                icon={cilUser}
                                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA style={{ height: '160px' }}
                        className="mb-4"
                        color="primary"
                        value={
                            <div style={{ fontSize: '40px' }}>
                                {Revenue}
                            </div>
                        }
                        title="Total Revenu"
                        action={
                            <CIcon
                                // icon={cilCommentBubble}
                                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                            />
                        }
                    />
                </CCol>
                {/* <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
                    <CWidgetStatsA style={{ height: '160px' }}
                        className="mb-4"
                        color="info"
                        value={
                            <div style={{ fontSize: '40px' }}>
                                {totalCate}
                            </div>
                        }
                        title="Product-Category"
                        action={
                            <CIcon
                                icon={cibCodesandbox}
                                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%', opacity: '0.6' }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} lg={3} style={{ marginRight: '20px' }}>
                    <CWidgetStatsA style={{ height: '160px' }}
                        className="mb-4"
                        color="warning"
                        value={
                            <div style={{ fontSize: '40px' }}>
                                {totalSubCat}
                            </div>
                        }
                        title="Sub-Category"
                        action={
                            <CIcon
                                icon={cilListLowPriority}
                                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%' }}
                            />
                        }
                    />
                </CCol> */}
            </CRow>
            <CRow>
                {/* <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
                    <CWidgetStatsA style={{ height: '160px' }}
                        className="mb-4"
                        color="danger"
                        value={
                            <div style={{ fontSize: '40px' }}>
                                {totalUser}
                            </div>
                        }
                        title="Total-Users"
                        action={
                            <CIcon
                                icon={cilGroup}
                                // icon={<i className="fas fa-shopping-cart"></i>}
                                style={{ fontSize: '50px', width: '90px', height: '70px', marginTop: '13%' }}
                            />
                        }
                    />
                </CCol> */}
                {/* <CCol sm={6} lg={3} style={{ marginRight: '40px' }}>
        <CWidgetStatsA style={{ height: '160px' }} 
          className="mb-4"
          color="info"
          value={
            <div style={{ fontSize: '40px' }}>
              {totalOrder}
            </div>
          }
          title="Total-Order"
          action={
              


        />
        </CCol> */}

            </CRow>
            <Chart newData={newDataTotal} newDataItem={newDataItem} />
        </>
    )
}

export default VandordDashboard
