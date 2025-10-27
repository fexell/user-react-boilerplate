import { useEffect } from 'react'
import { Routes, Route } from 'react-router'

import MainLayout from './shared/layouts/Main.layout'

import HomePage from './home/pages/Home.page'

import LoginPage from './auth/pages/Login.page'
import SignUpPage from './auth/pages/Signup.page'
import VerifyEmailPage from './auth/pages/VerifyEmail.page'

import { useCsrfToken } from './auth/hooks/useCsrfToken.hook'

import useThemeStore from './auth/stores/Theme.store'

import './App.css'

const App                                   = () => {
  useCsrfToken()

  const {
    theme,
    setTheme
  }                                         = useThemeStore()

  useEffect(() => {
    if( window.matchMedia( '(prefers-color-scheme: dark)' ).matches && theme === 'light' ) setTheme( 'dark' )
  }, [])

  return (
    <>
      <main
        className={ `${ theme }` }>
        <div>
          <Routes>
            <Route element={ <MainLayout /> }>
              <Route path='/' element={ <HomePage /> } />
            </Route>

            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignUpPage /> } />
            <Route path='/email/verify/:token' element={ <VerifyEmailPage /> } />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
