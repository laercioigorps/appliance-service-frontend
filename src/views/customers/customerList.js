import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormSwitch,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { Button } from '@coreui/coreui'
import { Link, useNavigate } from 'react-router-dom'

async function listCustomer() {
  return fetch('http://127.0.0.1:8000/profiles/customers/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

async function createService(customer_id) {
  return fetch(`http://127.0.0.1:8000/services/customer/${customer_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

const CustomerList = () => {
  const navigate = useNavigate()

  const [customers, setCustomers] = useState([])
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    listCustomer().then((customers) => {
      if (!mounted) {
        setMounted(true)
        setCustomers(customers)
      }
    })
    console.log(customers)
  })

  const handleServiceSubmit = (customer_id) => {
    createService(customer_id).then((service) => {
      navigate(`/services/${service.id}`)
    })
  }

  const listItems = customers.map((customer) => (
    <CTableRow key={customer.id}>
      <CTableHeaderCell scope="row">{customer.id}</CTableHeaderCell>
      <CTableDataCell>{customer.name}</CTableDataCell>
      <CTableDataCell>
        <Link to={'/customers/' + customer.id}>
          <CButton color="info" onClick={() => console.log('clicked', customer.name)}>
            Detail
          </CButton>
        </Link>
      </CTableDataCell>
      <CTableDataCell>
        <CButton color="success" onClick={() => handleServiceSubmit(customer.id)}>
          New Service
        </CButton>
      </CTableDataCell>
    </CTableRow>
  ))
  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>List of customers</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  <CTableHeaderCell scope="col">service</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{listItems}</CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerList
