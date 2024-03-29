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

async function updateSolutions(historic_id, bd, token) {
  return fetch(`${API_URL}/appliances/historics/${historic_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bd),
  }).then((data) => data.json())
}

async function listSolutions(token) {
  return fetch(`${API_URL}/appliances/solutions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

async function getHistoric(id, token) {
  return fetch(`${API_URL}/appliances/historics/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const SolutionsEdit = () => {
  const { token } = useToken()

  const { service_id, historic_id } = useParams()

  const [solutions, setSolutions] = useState()
  const [loaded, setLoaded] = useState(false)
  const [mySolutions, setMySolutions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!loaded) {
      setLoaded(true)
      listSolutions(token).then((symp) => {
        setSolutions(symp)
      })
      getHistoric(historic_id, token).then((c) => {
        setMySolutions(c.solutions)
      })
    }
    console.log(mySolutions)
  })

  const handleChange = (symptom_id) => {
    let cp = mySolutions
    if (cp.includes(symptom_id)) {
      setMySolutions(mySolutions.filter((item) => item !== symptom_id))
      return
    } else {
      setMySolutions(mySolutions.concat(symptom_id))
      return
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = { solutions: mySolutions }
    updateSolutions(historic_id, body, token).then((solutions) => {
      if (solutions) {
        navigate(`/services/${service_id}`)
      } else {
        console.log(solutions)
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
                  {loaded && solutions
                    ? solutions.map((solution) => (
                        <CFormCheck
                          key={solution.id}
                          inline
                          id={solution.id}
                          value={solution.id}
                          label={solution.name}
                          checked={mySolutions && mySolutions.includes(solution.id) ? true : false}
                          onChange={() => handleChange(solution.id)}
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

export default SolutionsEdit
