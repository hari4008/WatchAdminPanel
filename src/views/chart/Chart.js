
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import { CChart, CChartBar, CChartDoughnut, CChartLine, CChartPolarArea } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import React, { useEffect, useState } from 'react'
import { DocsCallout } from 'src/components'
import { jwtDecode } from 'jwt-decode'

const Chart = ({ newData, newDataItem, orderStatus }) => {
    const [chartHeight, setChartHeight] = useState(window.innerWidth < 768 ? 150 : 80)
    console.log("item is is ",)

    const [TokenData, setTokendata] = useState(jwtDecode(localStorage.getItem('tokenAuth')))
    const role = localStorage.getItem('role');


    return (
        <>
            {/* <CChart
                type="line"
                height={80}
                data={{
                    labels: newData.map((data) => data.month),
                    datasets: [
                        {
                            label: "Month wise",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "#ffba00",
                            pointBackgroundColor: "rgba(220, 220, 220, 1)",
                            pointBorderColor: "#ffba00",
                            data: newData.map((data) => data.total)
                        },
                    ],
                }}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                color: getStyle('--cui-body-color'),
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: getStyle('--cui-border-color-translucent'),
                            },
                            ticks: {
                                color: getStyle('--cui-body-color'),
                            },

                        },
                        y: {
                            grid: {
                                color: getStyle('--cui-border-color-translucent'),
                            },
                            ticks: {
                                color: getStyle('--cui-body-color'),
                            },
                        },
                    },
                }}
            /> */}
            <CCol md={12} xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm={5}>
                                <h4 id="traffic" className="card-title mb-0">
                                    Order Info
                                </h4>
                                <div className="small text-body-secondary">January - Apr 2023</div>
                            </CCol>
                            {/* <CCol sm={7} className="d-none d-md-block">
                            </CCol> */}
                        </CRow>
                        <CChart
                            type="line"
                            height={chartHeight}
                            data={{
                                labels: newData.map((data) => data.month),
                                datasets: [
                                    {
                                        label: "Month wise Revenue",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "#ffba00",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#ffba00",
                                        data: newData.map((data) => data.total)
                                    },
                                    {
                                        label: "Month wise item's order",
                                        backgroundColor: "rgba(220, 220, 220, 0.2)",
                                        borderColor: "#009C2F",
                                        pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                        pointBorderColor: "#009C2F",
                                        data: newDataItem.map((data) => data.item)
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: getStyle('--cui-body-color'),
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            color: getStyle('--cui-border-color-translucent'),
                                        },
                                        ticks: {
                                            color: getStyle('--cui-body-color'),
                                        },
                                    },
                                    y: {
                                        grid: {
                                            color: getStyle('--cui-border-color-translucent'),
                                        },
                                        ticks: {
                                            color: getStyle('--cui-body-color'),
                                        },
                                    },
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            {role == 'admin'?
            (<>
                <CCol md={6} xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>Order Status</CCardHeader>
                        <CCardBody>
                            <CChartDoughnut
                                data={{
                                    labels: orderStatus.map((order) => order.status),
                                    datasets: [
                                        {
                                            backgroundColor: ['#B9B600', '#ffba00', '#70AB00'],
                                            data: orderStatus.map((order) => order.item),
                                        },
                                    ],
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </>):(<></>)}

        </>
    )
}

export default Chart
