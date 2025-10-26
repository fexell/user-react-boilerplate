import { useEffect } from 'react'
import { Routes, Route } from 'react-router'

import MainLayout from './shared/layouts/Main.layout'

import HomePage from './home/pages/Home.page'

import LoginPage from './auth/pages/Login.page'
import SignUpPage from './auth/pages/Signup.page'

import { useCsrfToken } from './auth/hooks/useCsrfToken.hook'

import useColorModeStore from './auth/stores/ColorMode.store'

import './App.css'

const App                                   = () => {
  useCsrfToken()

  const {
    colorMode,
    setColorMode
  }                       = useColorModeStore()

  useEffect(() => {
    if( window.matchMedia( '(prefers-color-scheme: dark)' ).matches && colorMode === 'light' ) setColorMode( 'dark' )
  }, [])

  return (
    <>
      <main
        className={ `${ colorMode }` }>
        <div>
          <Routes>
            <Route element={ <MainLayout /> }>
              <Route path='/' element={ <HomePage /> } />
            </Route>

            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignUpPage /> } />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
