import React from 'react'
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
import useToken from 'src/components/App/useToken'
import { API_URL } from 'src/components/App/urls'

async function generateData(token) {
  return fetch(`${API_URL}/services/sample-create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((data) => data.json())
}

const handleClick = (token) => {
  generateData(token).then((resp) => console.log(resp))
}

const GenerateSampleData = () => {
  const { token } = useToken()
  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Check and Radios" href="forms/checks-radios" />
      </CCol> */}
      <CCol xs={7}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Select the Customer</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CButton onClick={() => handleClick(token)}>Generate Data</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GenerateSampleData
