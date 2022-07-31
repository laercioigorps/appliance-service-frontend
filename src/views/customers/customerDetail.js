import React, { useEffect, useState } from 'react'
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
  CRow,
} from '@coreui/react'

import { Link, useLocation, useParams } from 'react-router-dom'
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function getCustomer(id, token) {
  return fetch(`${API_URL}/profiles/customers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getAddresses(id, token) {
  return fetch(`${API_URL}/profiles/customers/${id}/address/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const CustomerDetail = () => {
  const { token } = useToken()

  const { id } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [profession, setProfession] = useState('')

  const [customer, setCustomer] = useState()
  const [loaded, setLoaded] = useState(false)
  const [addresses, setAddresses] = useState(false)

  const handleSubmit = async (e) => {
    console.log('Token ' + localStorage.getItem('token'))
    /* e.preventDefault()
    const token = await createCustomer({
      name,
    })
    console.log(token) */
  }

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      getCustomer(id, token).then((c) => {
        setCustomer(c)
        console.log(c)
      })
      getAddresses(id, token).then((ad) => setAddresses(ad))
    }

    console.log(id)
  })

  /*   const listItems = customers.map((customer) => (
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
        <CButton color="success" onClick={() => console.log('clicked', customer.name)}>
          New Service
        </CButton>
      </CTableDataCell>
    </CTableRow>
  )) */

  const addressForm =
    loaded && addresses && addresses.length > 0 ? (
      addresses.map((address, count) => (
        <CRow className="mb-3" key={address.id}>
          <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
            Address {count + 1}
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="profession"
              onChange={(e) => setProfession(e.target.value)}
              value={address.street}
            />
          </CCol>
        </CRow>
      ))
    ) : (
      <CRow className="mb-3">
        <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
          Address
        </CFormLabel>
        <CCol sm={10}>
          <CFormInput
            readOnly
            type="text"
            id="profession"
            onChange={(e) => setProfession(e.target.value)}
            value="no address"
          />
        </CCol>
      </CRow>
    )
  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={9}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer Detail</strong>
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
                    value={customer ? customer.name : ''}
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
              {addressForm}
              {/* <CButton type="submit">Confirm</CButton> */}
            </CForm>
            <div className="d-grid gap-2 col-3 mx-auto">
              <Link to={`new-address`}>
                <CButton color="primary">Add Address</CButton>
              </Link>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerDetail
