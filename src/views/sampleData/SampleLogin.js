import { CCard, CCol, CRow } from '@coreui/react'
import { useEffect, React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from 'src/components/App/useToken'

const key = '58b7811541a48119fb29f27c2be24554b90ba2da'

const SampleLogin = () => {
  const { token, setToken } = useToken()

  useEffect(() => {
    setToken({ token: key })
    window.location.replace('/Dashboard')
  })

  return (
    <CRow>
      {/* <CCol xs={12}>
          <DocsCallout name="Check and Radios" href="forms/checks-radios" />
        </CCol> */}
      <CCol xs={7}>
        <CCard className="mb-4">loading...</CCard>
      </CCol>
    </CRow>
  )
}

export default SampleLogin
