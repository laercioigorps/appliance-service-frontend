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
  CFormInput,
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom'

async function updatePrice(service_id, bd) {
  return fetch(`http://127.0.0.1:8000/services/${service_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function getService(id) {
  return fetch(`http://127.0.0.1:8000/services/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

const ServicePriceEdit = () => {
  const { service_id } = useParams()

  const [service, setService] = useState()
  const [price, setPrice] = useState()
  const [problems, setProblems] = useState()
  const [loaded, setLoaded] = useState(false)
  const [myProblems, setMyProblems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      getService(service_id).then((s) => {
        console.log(s)
        setPrice(s.price)
        setService(s)
      })
    }
    console.log('myProblems')
  })

  const handleChange = (e) => {
    setPrice(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let bd = { price: price }
    updatePrice(service.id, bd).then((service) => {
      if (service) {
        navigate(`/services/${service.id}`)
      }
    })
  }

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit price</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0">Service Price:</legend>
                <CCol sm={10}>
                  <CFormInput
                    type="number"
                    id="price"
                    name="price"
                    value={loaded && price ? price : ''}
                    onChange={handleChange}
                  />
                </CCol>
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

export default ServicePriceEdit
