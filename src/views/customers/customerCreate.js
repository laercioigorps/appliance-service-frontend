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
import { useNavigate } from 'react-router-dom'

async function createCustomer(body) {
  return fetch('http://127.0.0.1:8000/profiles/customers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(body),
  }).then((data) => data.json())
}

const CustomerCreate = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [profession, setProfession] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    createCustomer({
      name,
    }).then((customer) => navigate(`/customers/${customer.id}`))
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
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="email"
                    id="inputEmail3"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">
                  Phone Number
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    id="phone"
                    placeHolder="(99) 99999-9999"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
                  Profession
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="text"
                    id="profession"
                    onChange={(e) => setProfession(e.target.value)}
                    value={profession}
                  />
                </CCol>
              </CRow>
              <CButton type="submit">Confirm</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerCreate
