import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'

async function createAddressToCustomer(customer_id, body) {
  return fetch(`http://127.0.0.1:8000/profiles/customers/${customer_id}/address/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(body),
  }).then((data) => data.json())
}

const CreateAddressToCustomer = () => {
  const { id } = useParams()

  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [complement, setComplement] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [type, setType] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let bd = {
      street,
      number,
      neighborhood,
      city,
      state,
      country,
      complement,
      coordinates,
      type,
    }
    createAddressToCustomer(id, bd).then((response) => navigate(`/customers/${id}`))
  }

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={9}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Customer</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail4">Street</CFormLabel>
                <CFormInput
                  required
                  type="text"
                  id="inputEmail4"
                  placeholder="Karen Way"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="exampleFormControlInput1">Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="Password"
                  placeholder="1000"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="exampleFormControlInput1">Neighborhood</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="Password"
                  placeholder="Mountain View"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputEmail4">City</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputEmail4"
                  placeholder="Mountain View"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="exampleFormControlInput1">State</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="Password"
                  placeholder="California(CA)"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="exampleFormControlInput1">Country</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="Password"
                  placeholder="United States"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputEmail4">Complement</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputEmail4"
                  placeholder=""
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="exampleFormControlInput1">Coordinates</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="Password"
                  placeholder=""
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="exampleFormControlInput1">Type</CFormLabel>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="Password"
                  placeholder="House"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </CCol>
              <CCol xs={12}>
                <CFormCheck type="checkbox" id="gridCheck" label="Is active" />
              </CCol>
              <CCol xs={1} className="mx-auto">
                <CButton type="submit">Add</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateAddressToCustomer
