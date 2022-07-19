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
  CFormSwitch,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { Button } from '@coreui/coreui'
import { Link, useLocation, useParams } from 'react-router-dom'

async function getService(id) {
  return fetch(`http://127.0.0.1:8000/services/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + localStorage.getItem('token'),
    },
  }).then((data) => data.json())
}

const ServiceDetail = () => {
  const { id } = useParams()

  const [service, setService] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) {
      getService(id).then((c) => {
        setService(c)
        setLoaded(true)
      })
      console.log(service)
    }

    console.log(service)
  })

  let symptoms =
    loaded && service && service.historic.symptoms
      ? service.historic.symptoms.map((symptom) => ` ${symptom.name} `)
      : 'not'

  let problems =
    loaded && service && service.historic.problems
      ? service.historic.problems.map((problem) => ` ${problem.name} `)
      : 'not'

  let solutions =
    loaded && service && service.historic.solutions
      ? service.historic.solutions.map((solution) => ` ${solution.name} `)
      : 'not'

  /*   const listItems = services.map((service) => (
    <CTableRow key={service.id}>
      <CTableHeaderCell scope="row">{service.id}</CTableHeaderCell>
      <CTableDataCell>{service.name}</CTableDataCell>
      <CTableDataCell>
        <Link to={'/services/' + service.id}>
          <CButton color="info" onClick={() => console.log('clicked', service.name)}>
            Detail
          </CButton>
        </Link>
      </CTableDataCell>
      <CTableDataCell>
        <CButton color="success" onClick={() => console.log('clicked', service.name)}>
          New Service
        </CButton>
      </CTableDataCell>
    </CTableRow>
  )) */
  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={9}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Service Detail</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                  Customer:
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    readOnly
                    type="text"
                    id="name"
                    value={loaded && service ? service.customer.name : ''}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                  Address:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="name"
                      value={
                        loaded && service && service.address
                          ? service.address.street
                          : 'No address, please select one'
                      }
                    />
                    <Link to="address/select">
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Appliance:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      aria-describedby="button-addon2"
                      type="text"
                      id="inputEmail3"
                      value={
                        loaded && service && service.historic && service.historic.appliance
                          ? service.historic.appliance.model
                          : 'none'
                      }
                    />
                    <Link
                      to={loaded && service ? `historic/${service.historic.id}/appliance/edit` : ''}
                    >
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">
                  Symptoms:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="phone"
                      placeHolder="(99) 99999-9999"
                      value={symptoms}
                    />
                    <Link
                      to={loaded && service ? `historic/${service.historic.id}/symptoms/edit` : ''}
                    >
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="phone" className="col-sm-2 col-form-label">
                  Problems:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="phone"
                      placeHolder="(99) 99999-9999"
                      value={problems}
                    />
                    <Link
                      to={loaded && service ? `historic/${service.historic.id}/problems/edit` : ''}
                    >
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
                  Solutions:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="phone"
                      placeHolder="(99) 99999-9999"
                      value={solutions}
                    />
                    <Link
                      to={loaded && service ? `historic/${service.historic.id}/solutions/edit` : ''}
                    >
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                  Status:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      aria-describedby="button-addon2"
                      type="text"
                      id="inputEmail3"
                      value={loaded && service && service.status ? service.status : 'none'}
                    />
                    <Link
                      to={loaded && service ? `historic/${service.historic.id}/appliance/edit` : ''}
                    >
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
                  Start Date:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="profession"
                      value={loaded ? service.start_date : ''}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
                  End Date:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="profession"
                      value={loaded && service && service.end_date ? service.end_date : ''}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="profession" className="col-sm-2 col-form-label">
                  Price:
                </CFormLabel>
                <CCol sm={10}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      readOnly
                      type="text"
                      id="phone"
                      placeHolder="(99) 99999-9999"
                      value={loaded ? service.price : 0}
                    />
                    <Link to={loaded && service ? `price/edit` : ''}>
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                        Change
                      </CButton>
                    </Link>
                  </CInputGroup>
                </CCol>
              </CRow>
              {/* <CButton type="submit">Confirm</CButton> */}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ServiceDetail
