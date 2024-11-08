import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoutes from './PrivateRoute'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))



class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              path="/*" 
              element={
                <PrivateRoutes>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}
export default App
