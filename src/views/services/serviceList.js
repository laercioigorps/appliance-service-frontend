import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function listServices(token, page) {
  return fetch(`${API_URL}/services/?limit=15&offset=${(page - 1) * 15}`, {
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

  const [currentPage, setCurrentPage] = useState(1)
  const [previousPage, setPreviousPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)

  useEffect(() => {
    listServices(token, currentPage).then((services) => {
      if (!mounted) {
        setMounted(true)
        setServices(services.results)
        setNextPage(services.next)
        setPreviousPage(services.previous)
        setMounted(true)
      }
    })
  })

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const goToPage = (page) => {
    listServices(token, page).then((services) => {
      setCurrentPage(page)
      setServices(services.results)
      setNextPage(services.next)
      setPreviousPage(services.previous)
    })
  }

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
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                onClick={() => goToPreviousPage()}
                disabled={previousPage ? false : true}
              >
                Previous
              </CPaginationItem>
              <CPaginationItem>{currentPage}</CPaginationItem>
              <CPaginationItem disabled={nextPage ? false : true} onClick={() => goToNextPage()}>
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ServiceList
