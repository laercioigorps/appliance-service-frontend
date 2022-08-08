import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import MainWidgetsDropdown from '../widgets/MainWidgetsDropdown'
import useToken from 'src/components/App/useToken'
import { API_URL } from 'src/components/App/urls'

async function getServiceStatus(days, token) {
  return fetch(`${API_URL}/services/services-by-status/${days}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getTopCustomersIncome(quantity, token) {
  return fetch(`${API_URL}/services/top-customers-income/${quantity}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getTopCustomersServices(quantity, token) {
  return fetch(`${API_URL}/services/top-customers-services/${quantity}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const Dashboard = () => {
  const [loaded, setLoaded] = useState(false)

  const [serviceStatusData30, setServiceStatusData30] = useState()
  const [serviceStatusLabels30, setServiceStatusLabels30] = useState()

  const [serviceStatusData90, setServiceStatusData90] = useState()
  const [serviceStatusLabels90, setServiceStatusLabels90] = useState()

  const [topCustomersIncome, setTopCustomersIncome] = useState()
  const [topCustomersServices, setTopCustomersServices] = useState()

  const { token } = useToken()

  useEffect(() => {
    if (!loaded) {
      getServiceStatus(30, token).then((response) => {
        setServiceStatusData30(response.data)
        setServiceStatusLabels30(response.labels)
        console.log(response)
      })
      getServiceStatus(90, token).then((response) => {
        setServiceStatusData90(response.data)
        setServiceStatusLabels90(response.labels)
        console.log(response)
      })
      getTopCustomersIncome(5, token).then((customers) => {
        console.log(customers)
        setTopCustomersIncome(customers)
      })
      getTopCustomersServices(5, token).then((customers) => {
        setTopCustomersServices(customers)
        console.log(customers)
      })
      setLoaded(true)
    }
  })

  const topCustomersIncomeTable = topCustomersIncome ? (
    topCustomersIncome.map((customer) => (
      <CTableRow key={customer.customer__id}>
        <CTableHeaderCell scope="row">{customer.customer__id}</CTableHeaderCell>
        <CTableDataCell>{customer.customer__name}</CTableDataCell>
        <CTableDataCell>{customer.income}</CTableDataCell>
        <CTableDataCell>{customer.services}</CTableDataCell>
      </CTableRow>
    ))
  ) : (
    <CTableRow>
      <CTableHeaderCell scope="row">-</CTableHeaderCell>
      <CTableDataCell>-</CTableDataCell>
      <CTableDataCell>-</CTableDataCell>
      <CTableDataCell>-</CTableDataCell>
    </CTableRow>
  )

  const topCustomersServicesTable = topCustomersServices ? (
    topCustomersServices.map((customer) => (
      <CTableRow key={customer.customer__id}>
        <CTableHeaderCell scope="row">{customer.customer__id}</CTableHeaderCell>
        <CTableDataCell>{customer.customer__name}</CTableDataCell>
        <CTableDataCell>{customer.services}</CTableDataCell>
        <CTableDataCell>{customer.income}</CTableDataCell>
      </CTableRow>
    ))
  ) : (
    <CTableRow>
      <CTableHeaderCell scope="row">-</CTableHeaderCell>
      <CTableDataCell>-</CTableDataCell>
      <CTableDataCell>-</CTableDataCell>
      <CTableDataCell>-</CTableDataCell>
    </CTableRow>
  )

  return (
    <>
      <MainWidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CChart
                  type="bar"
                  data={{
                    labels: serviceStatusLabels30
                      ? serviceStatusLabels30
                      : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: '30 days Services Status',
                        backgroundColor: '#0000FF',
                        data: serviceStatusData30
                          ? serviceStatusData30
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCard>
            </CCol>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CChart
                  type="bar"
                  data={{
                    labels: serviceStatusLabels90
                      ? serviceStatusLabels90
                      : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: '90 days Services Status',
                        backgroundColor: '#f87979',
                        data: serviceStatusData90
                          ? serviceStatusData90
                          : [0, 0, 0, 0, 0, 0, 0, 0, 0],
                      },
                    ],
                  }}
                  labels="months"
                />
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CTable caption="top">
                  <CTableCaption>Top Income Customers</CTableCaption>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Income</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>{topCustomersIncomeTable}</CTableBody>
                </CTable>
              </CCard>
            </CCol>
            <CCol sm={6}>
              <CCard className="mb-4">
                <CTable caption="top">
                  <CTableCaption>Top Services Customers</CTableCaption>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Income</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>{topCustomersServicesTable}</CTableBody>
                </CTable>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
