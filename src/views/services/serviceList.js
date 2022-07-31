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
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function listServices(token) {
  return fetch(`${API_URL}/services/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const ServiceList = () => {
  const { token } = useToken()

  const [services, setServices] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    listServices(token).then((services) => {
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
