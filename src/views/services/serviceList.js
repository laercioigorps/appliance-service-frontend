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
import { Link } from 'react-router-dom'

async function listServices() {
  return fetch('http://127.0.0.1:8000/services', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

const ServiceList = () => {
  const [services, setServices] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    listServices().then((services) => {
      if (!mounted) {
        setMounted(true)
        setServices(services)
      }
    })
    console.log(services)
  })

  const listItems = services.map((service) => (
    <CTableRow key={service.id}>
      <CTableHeaderCell scope="row">{service.id}</CTableHeaderCell>
      <CTableDataCell>{service.customer.name}</CTableDataCell>
      <CTableDataCell>{service.address ? service.address.street : 'sem endereço'}</CTableDataCell>
      <CTableDataCell>
        {service.historic.appliance ? service.historic.appliance.model : 'sem informação'}
      </CTableDataCell>
      <CTableDataCell>
        <Link to={`/services/${service.id}`}>
          <CButton color="info" onClick={() => console.log('clicked', service.name)}>
            Detail
          </CButton>
        </Link>
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
                  <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Appliance</CTableHeaderCell>
                  <CTableHeaderCell scope="col">detail</CTableHeaderCell>
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

export default ServiceList
