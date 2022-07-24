import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import PropTypes from 'prop-types'

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:8000/dj-rest-auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((response) => {
    return response.json()
  })
}

const Login = ({ setToken }) => {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const [usernameError, setUserNameError] = useState()
  const [passwordError, setPasswordError] = useState()

  const [errorMessage, setErrorMessage] = useState()

  const handleValidationMessages = (json) => {
    if ('password' in json) {
      setPasswordError(json.password[0])
    } else {
      setPasswordError(null)
    }
    if ('username' in json) {
      setUserNameError(json.username[0])
    } else {
      setUserNameError(null)
    }
    if ('non_field_errors' in json) {
      setErrorMessage(json.non_field_errors)
    } else {
      setErrorMessage(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    loginUser({
      username,
      password,
    })
      .then((json) => {
        if ('key' in json === false) {
          handleValidationMessages(json)
          return
        }
        setToken({ token: json.key })
        console.log(json)
      })
      .catch((err) => {
        setErrorMessage('something went wrong')
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit} validated={false}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        label="user"
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        onChange={(e) => setUserName(e.target.value)}
                        invalid={usernameError ? true : false}
                      />
                      <CFormFeedback invalid>{usernameError}</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        invalid={passwordError ? true : false}
                      />
                      <CFormFeedback invalid>{passwordError}</CFormFeedback>
                    </CInputGroup>
                    <p className="text-danger">{errorMessage}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Login
