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
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { API_URL } from 'src/components/App/urls'
import useToken from 'src/components/App/useToken'

async function updateProblems(historic_id, bd, token) {
  return fetch(`${API_URL}/appliances/historics/${historic_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function listProblems(token) {
  return fetch(`${API_URL}/appliances/problems`, {
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

const ProblemsEdit = () => {
  const { token } = useToken()

  const { service_id, historic_id } = useParams()

  const [service, setService] = useState()
  const [problems, setProblems] = useState()
  const [loaded, setLoaded] = useState(false)
  const [myProblems, setMyProblems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      listProblems(token).then((symp) => {
        setProblems(symp)
      })
      getHistoric(historic_id, token).then((c) => {
        setMyProblems(c.problems)
      })
    }
    console.log(myProblems)
  })

  const handleChange = (symptom_id) => {
    let cp = myProblems
    if (cp.includes(symptom_id)) {
      setMyProblems(myProblems.filter((item) => item !== symptom_id))
      return
    } else {
      setMyProblems(myProblems.concat(symptom_id))
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = { problems: myProblems }
    updateProblems(historic_id, body, token).then((problems) => {
      if (problems) {
        navigate(`/services/${service_id}`)
      } else {
        console.log(problems)
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
                  {loaded && problems
                    ? problems.map((problem) => (
                        <CFormCheck
                          key={problem.id}
                          inline
                          id={problem.id}
                          value={problem.id}
                          label={problem.name}
                          checked={myProblems && myProblems.includes(problem.id) ? true : false}
                          onChange={() => handleChange(problem.id)}
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

export default ProblemsEdit
