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

async function updateProblems(historic_id, bd) {
  return fetch(`http://127.0.0.1:8000/appliances/historics/${historic_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function listProblems() {
  return fetch('http://127.0.0.1:8000/appliances/problems', {
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

const ProblemsEdit = () => {
  const { service_id, historic_id } = useParams()

  const [service, setService] = useState()
  const [problems, setProblems] = useState()
  const [loaded, setLoaded] = useState(false)
  const [myProblems, setMyProblems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      listProblems().then((symp) => {
        setProblems(symp)
      })
      getHistoric(historic_id).then((c) => {
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
    updateProblems(historic_id, body).then((problems) => {
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
