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

async function updateStatus(service_id, bd) {
  return fetch(`http://127.0.0.1:8000/services/${service_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function listStatus() {
  return fetch('http://127.0.0.1:8000/services/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
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

const StatusEdit = () => {
  const { service_id } = useParams()
  const [statuses, setStatuses] = useState()
  const [loaded, setLoaded] = useState(false)
  const [service, setService] = useState(false)
  const [myStatus, setMyStatus] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      listStatus().then((st) => {
        setStatuses(st)
        getService(service_id).then((s) => {
          if (s.status) {
            setMyStatus(s.status.id)
          } else {
            setMyStatus(st[0].id)
          }
        })
      })

      setLoaded(true)
    }
    console.log(myStatus)
  })

  const handleChange = (e) => {
    let id = e.target.value
    setMyStatus(id)
    console.log(id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = {
      status: myStatus,
    }
    updateStatus(service_id, body).then((service) => {
      if (service) {
        navigate(`/services/${service_id}`)
      } else {
        console.log('wrong')
      }
    })
    console.log(body)
  }

  const formSelect =
    loaded && statuses ? (
      <CFormSelect aria-label="Default select example" onChange={handleChange} value={myStatus}>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
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

export default StatusEdit
