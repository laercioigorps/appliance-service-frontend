import React, { Component, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useToken from './components/App/useToken'
import './scss/style.scss'
import SampleLogin from './views/sampleData/SampleLogin'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const { token, setToken } = useToken()
  console.log(token)

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register setToken={setToken} />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/sample-login" name="Sample Account Login" element={<SampleLogin />} />
          {!token ? (
            <Route exact path="*" name="Login Page" element={<Login setToken={setToken} />} />
          ) : (
            <Route path="*" name="Home" element={<DefaultLayout />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
