import { useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons'

import AuthLayout from '../layouts/Auth.layout'

import useAuthStore from '../stores/Auth.store'

import AuthFormComponent from '../components/Form/Form.component'
import AuthFormInputComponent from '../components/Form/Input.component'
import AuthFormErrorComponent from '../components/Form/Error.component'

import { apiClient } from '../api/Axios.api'

import LoginImage from '../assets/images/Login.svg'

const emailRegexp                           = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i

const LoginPage                             = () => {

  // Get cookies
  const [ cookies, ]                        = useCookies( [ 'userId' ] )

  // Get auth store states
  const { clearUserId }                     = useAuthStore()
  const setUserId                           = useAuthStore( ( state ) => state.setUserId )

  // State for holding error
  const [ error, setError ]                 = useState( null )

  // State for holding form data
  const [ formData, setFormData ]           = useState({
    email                                   : '',
    password                                : '',
  })

  // Handle login
  const handleLogin                         = useCallback( async ( e ) => {
    e.preventDefault()

    // Clear user id, if it's already set
    if( cookies.userId || cookies.userId === null ) {
      clearUserId()
    }

    // Bind form data
    const data                              = new FormData()
    data.append( 'email', formData.email )
    data.append( 'password', formData.password )

    try {

      // Send login request
      const response                        = await apiClient.post( '/auth/login', data )

      // If login was successful, set error to empty string, and set user id store
      if( response.status === 200 ) {
        setError( '' )
        setUserId( response.data.user.id )
      }
    } catch ( error ) {
      setError( error?.response?.data )

      console.log( error )
    }
  }, [ cookies, formData, clearUserId, setUserId ] )

  return (
    <>
      <title>Login</title>
      <AuthLayout
        title='Welcome back!'
        subtitle='Fill in the form to log in'
        footerText="Don't have an account?"
        footerLinkTo='/signup'
        footerLinkText='Sign up.'
        image={ LoginImage }>
        <AuthFormComponent
          submitFn={ handleLogin }
          buttonType='submit'
          buttonText='Login'
          formData={ formData }
          setFormData={ setFormData }>
          <AuthFormInputComponent
            name='email'
            type='email'
            placeholder='Email'
            title='Email'
            icon={ faAt }
            required={ true }
            inputMode='email'
            regexp={ emailRegexp }
            isRemember={ true } />
          <AuthFormInputComponent
            name='password'
            type='password'
            placeholder='Password'
            title='Password'
            icon={ faLock }
            required={ true }
            regexp={ /^.{6,}$/ }
            explanation='Password must be at least 6 characters' />
          <AuthFormErrorComponent
            errorMessage={ error?.message } />
        </AuthFormComponent>
      </AuthLayout>
    </>
  )
}

export default LoginPage
