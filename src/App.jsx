import { Routes, Route } from 'react-router'

import HomeLayout from './home/layouts/Home.layout'

import HomePage from './home/pages/Home.page'

import LoginPage from './auth/pages/Login.page'
import SignUpPage from './auth/pages/Signup.page'

import { useCsrfToken } from './auth/hooks/useCsrfToken.hook'

import useColorModeStore from './auth/stores/ColorMode.store'

import './App.css'

const App                                   = () => {
  useCsrfToken()

  const { colorMode }                       = useColorModeStore()

  return (
    <>
      <main
        className={ `${ colorMode }` }>
        <div>
          <Routes>
            <Route element={ <HomeLayout /> }>
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
