import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import useAuthStore from '../stores/Auth.store'
import useThemeStore from '../stores/Theme.store'

const AuthLayout                            = ({ children, isRedirect, title, subtitle, footerText, footerLinkTo, footerLinkText, image }) => {
  const navigate                            = useNavigate()
  const userId                              = useAuthStore(( state ) => state.userId)
  const { theme, setTheme }                 = useThemeStore()

  const handleThemeToggle                   = () => {
    setTheme( theme === 'light' ? 'dark' : 'light' )
  }

  useEffect(() => {
    if( userId && isRedirect ) navigate( '/' )
  }, [ isRedirect, navigate, userId ])

  return (
    <>
      <div>
        <div className='flex flex-row w-full min-h-screen max-h-screen'>

          {/* LEFT */}
          <div className={
            clsx(
              'relative flex flex-1 flex-col w-full min-h-screen max-h-fit [@media(min-height:800px)]:justify-center items-center py-4 overflow-y-auto',
              '',
              {
                'bg-neutral-900': theme === 'dark',
              }
            )
          }>
            <div className='flex flex-col w-full justify-center items-center'>
              <div className='absolute top-4 left-4'>
                <div>
                  <button
                    className={
                      clsx(
                        'flex flex-row justify-center items-center transition ease-in-out duration-200',
                        {
                          'text-white transform rotate-180': theme === 'dark',
                        }
                      )
                    }>
                    <FontAwesomeIcon
                      className='text-4xl hover:text-neutral-600 cursor-pointer'
                      icon={ faCircleHalfStroke }
                      onClick={ handleThemeToggle } />
                  </button>
                </div>
              </div>
              <header className={
                clsx(
                  'mb-4',
                  {
                    'text-white': theme === 'dark',
                  }
                )
              }>
                <div>
                  <h1 className='block text-center text-4xl'>{ title }</h1>
                  <h3 className='block text-center text-xl'>{ subtitle }</h3>
                </div>
              </header>
              <section className='w-[500px] px-4 max-sm:w-full'>
                <div>
                  { children }
                </div>
              </section>
              <footer>
                <div>
                  <p className={
                    clsx(
                      'block text-center',
                      {
                        'text-white': theme === 'dark',
                      }
                    )
                  }>
                    { footerText }&nbsp;
                    <NavLink
                      className='text-blue-600 hover:underline'
                      to={ footerLinkTo }>{ footerLinkText }</NavLink>
                  </p>
                </div>
              </footer>
            </div>
          </div>

          {/* RIGHT */}
          <div className='flex flex-1 justify-center items-center bg-neutral-100 dark:bg-neutral-800 max-lg:hidden'>
            <div>
              <img
                className='w-[500px] h-full object-cover'
                src={ image } />
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default AuthLayout
