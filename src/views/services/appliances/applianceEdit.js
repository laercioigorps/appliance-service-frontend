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

async function updateAppliance(historic_id, bd) {
  return fetch(`http://127.0.0.1:8000/appliances/historics/${historic_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function listAppliances() {
  return fetch('http://127.0.0.1:8000/appliances/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

async function getHistoric(id) {
  return fetch(`http://127.0.0.1:8000/appliances/historics/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

const ApplianceEdit = () => {
  const { service_id, historic_id } = useParams()
  const [appliances, setAppliances] = useState()
  const [loaded, setLoaded] = useState(false)
  const [historic, setHistoric] = useState(false)
  const [myAppliance, setMyAppliance] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      listAppliances().then((ap) => {
        setAppliances(ap)
        getHistoric(historic_id).then((h) => {
          if (h.appliance) {
            setMyAppliance(h.appliance.id)
          } else {
            setMyAppliance(ap[0].id)
          }
        })
      })

      setLoaded(true)
    }
    console.log(myAppliance)
  })

  const handleChange = (e) => {
    let id = e.target.value
    setMyAppliance(id)
    console.log(id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = {
      appliance: myAppliance,
    }
    updateAppliance(historic_id, body).then((historic) => {
      if (historic) {
        navigate(`/services/${service_id}`)
      } else {
        console.log('wrong')
      }
    })
    console.log(body)
  }

  const formSelect =
    loaded && appliances ? (
      <CFormSelect aria-label="Default select example" onChange={handleChange} value={myAppliance}>
        {appliances.map((appliance) => (
          <option key={appliance.id} value={appliance.id}>
            {appliance.model}
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
            <strong>Select the Symptoms</strong>
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

export default ApplianceEdit
