import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function updateService(service_id, bd, token) {
  return fetch(`${API_URL}/services/${service_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function getService(service_id, token) {
  return fetch(`${API_URL}/services/${service_id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getAddresseses(id, token) {
  return fetch(`${API_URL}/profiles/customers/${id}/address/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const SelectServiceAddress = () => {
  const { token } = useToken()

  const { service_id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [addresses, setAddresses] = useState(false)
  const [service, setService] = useState(false)
  const [myAddress, setMyAddress] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      getService(service_id, token).then((h) => {
        if (h) {
          setService(h)

          getAddresseses(h.customer.id, token).then((ads) => {
            setAddresses(ads)
            setMyAddress(h.address ? h.address.id : ads[0].id)
            console.log(ads)
            console.log(h)
          })
        }
      })
      setLoaded(true)
    }
  })

  const handleChange = (e) => {
    let ad = e.target.value
    setMyAddress(ad)
    console.log(ad)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = {
      address: myAddress,
    }
    updateService(service_id, body, token).then((service) => {
      if (service) {
        console.log('done')
        console.log(service)
        navigate(`/services/${service_id}`)
      } else {
        console.log('wrong')
      }
    })
    console.log(body)
  }

  const formSelect =
    loaded && addresses ? (
      <CFormSelect aria-label="Default select example" onChange={handleChange} value={myAddress}>
        {addresses.map((address) => (
          <option key={address.id} value={address.id}>
            {`${address.street}, ${address.number} - ${address.neighborhood} (${address.city}/${address.state})`}
          </option>
        ))}
      </CFormSelect>
    ) : (
      ''
    )

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Select the Address</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0"></legend>
                <CCol sm={10}>{formSelect}</CCol>
              </fieldset>
              <div className="d-grid gap-2 col-3 mt-4 mx-auto">
                <CButton type="submit" color="primary">
                  Update
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SelectServiceAddress
