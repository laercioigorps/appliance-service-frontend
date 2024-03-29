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
import { useParams } from 'react-router-dom'
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function updateSymptoms(historic_id, bd, token) {
  return fetch(`${API_URL}/appliances/historics/${historic_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function listSymptoms(token) {
  return fetch(`${API_URL}/appliances/symptoms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getHistoric(id, token) {
  return fetch(`${API_URL}/appliances/historics/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const SymptomsEdit = () => {
  const { token } = useToken()

  const { service_id, historic_id } = useParams()

  const [service, setService] = useState()
  const [symptoms, setSymptoms] = useState()
  const [loaded, setLoaded] = useState(false)
  const [mySymptoms, setMySymptoms] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      listSymptoms(token).then((symp) => {
        setSymptoms(symp)
      })
      getHistoric(historic_id, token).then((c) => {
        setMySymptoms(c.symptoms)
      })
    }
    console.log(mySymptoms)
  })

  const handleChange = (symptom_id) => {
    let cp = mySymptoms
    if (cp.includes(symptom_id)) {
      setMySymptoms(mySymptoms.filter((item) => item !== symptom_id))
      return
    } else {
      setMySymptoms(mySymptoms.concat(symptom_id))
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = { symptoms: mySymptoms }
    updateSymptoms(historic_id, body, token).then((symptoms) => {
      if (symptoms) {
        navigate(`/services/${service_id}`)
      } else {
        console.log(symptoms)
        console.log('wrong')
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
            <strong>Select the Symptoms</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-2 pt-0"></legend>
                <CCol sm={10}>
                  {loaded && symptoms
                    ? symptoms.map((symptom) => (
                        <CFormCheck
                          key={symptom.id}
                          inline
                          id={symptom.id}
                          value={symptom.id}
                          label={symptom.name}
                          checked={mySymptoms && mySymptoms.includes(symptom.id) ? true : false}
                          onChange={() => handleChange(symptom.id)}
                        />
                      ))
                    : ''}
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

export default SymptomsEdit
