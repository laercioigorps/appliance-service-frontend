import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormSwitch,
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
import { DocsCallout, DocsExample } from 'src/components'
import { Button } from '@coreui/coreui'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function listCustomer(token, page) {
  return fetch(`${API_URL}/profiles/customers/?limit=15&offset=${(page - 1) * 15}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function createService(customer_id, token) {
  return fetch(`${API_URL}/services/customer/${customer_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const CustomerList = () => {
  const { token } = useToken()

  const navigate = useNavigate()

  const [customers, setCustomers] = useState([])
  const [mounted, setMounted] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [previousPage, setPreviousPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)

  useEffect(() => {
    listCustomer(token, currentPage).then((customers) => {
      if (!mounted) {
        setMounted(true)
        setCustomers(customers.results)
        setNextPage(customers.next)
        setPreviousPage(customers.previous)
      }
    })
    console.log(customers)
  })

  const handleServiceSubmit = (customer_id) => {
    createService(customer_id, token).then((service) => {
      navigate(`/services/${service.id}`)
    })
  }

  const goToNextPage = () => {
    let next = currentPage + 1
    goToPage(next)
  }

  const goToPreviousPage = () => {
    let next = currentPage - 1
    goToPage(next)
  }

  const goToPage = (page) => {
    listCustomer(token, page).then((result) => {
      setCustomers(result.results)
      setCurrentPage(page)
      setNextPage(result.next)
      setPreviousPage(result.previous)
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
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                onClick={() => goToPreviousPage()}
                disabled={previousPage ? false : true}
              >
                Previous
              </CPaginationItem>
              <CPaginationItem>{currentPage}</CPaginationItem>
              <CPaginationItem onClick={() => goToNextPage()} disabled={nextPage ? false : true}>
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerList
