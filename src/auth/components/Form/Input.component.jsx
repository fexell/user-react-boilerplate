import { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faExclamation } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FormContext } from '../../contexts/Auth.context'

const AuthFormInputComponent                = ({
  type = 'text',
  name,
  placeholder,
  title,
  icon,
  required = false,
  inputMode = 'text',
  isRemember,
  regexp,
  explanation
}) => {

  // Get the form data from the context
  const {
    formData,
    setFormData,
    validity,
    setValidity,
  }                                         = useContext( FormContext )

  // State for holding if the input has been touched
  const [ isTouched, setTouched ]           = useState( false )
  const [ isHovered, setHovered ]           = useState( false )

  // Handle input changes
  const handleChange                        = ( e ) => {
    const { name, value }                   = e.target

    // Set the input's value
    setFormData(( prev ) => ({
      ...prev,
      [ name ]: value
    }))
  }

  // Handle input blur
  const handleBlur                          = ( e ) => {
    setTouched( true )

    if( isRemember ) localStorage.setItem( name, e.target.value )
  }

  const handleHover                         = () => {
    setHovered( isHovered ? false : true )
  }

  const isValid                             = regexp
    ? regexp.test( formData[ name ] )
    : formData[ name ].length > 0

  useEffect(() => {
    setValidity(( prev ) => ({
      ...prev,
      [ name ]: isValid
    }))
  }, [ isValid, name, setValidity ])

  useEffect(() => {

    // If the input's value should be remembered and there is a value in local storage,
    // set the input's value to be what's in local storage
    if( isRemember && localStorage.getItem( name ) ) {
      setFormData(( prev ) => ({
        ...prev,
        [ name ]: localStorage.getItem( name )
      }))
    }
  }, [ isRemember, name, setFormData ])

  return (
    <>
      <div className='relative'>
        <div>
          { icon && (
            <div className='absolute top-1/2 -translate-y-1/2 left-6'>
              <div>
                <FontAwesomeIcon
                  className={
                    clsx(
                      'text-neutral-500',
                      {
                        'text-red-600': isTouched && regexp && !regexp.test( formData[ name ] ),
                      }
                    )
                  }
                  icon={ icon } />
              </div>
            </div>
          ) }
          <input
            className={
              clsx(
                'block w-full p-4 mb-4 border-2 border-transparent outline-0 rounded-full bg-neutral-100 focus:shadow-lg shadow-neutral-300 focus:border-blue-600',
                'dark:bg-neutral-800 dark:text-neutral-50 dark:focus:shadow-lg dark:shadow-neutral-950',
                {
                'text-red-600 !border-red-600': isTouched && !isValid,
                'pl-14': !!icon,
                }
              )
            }
            type={ type }
            name={ name }
            placeholder={ placeholder }
            title={ title }
            required={ required }
            inputMode={ inputMode }
            value={ formData[ name ] ?? '' }
            onBlur={ handleBlur }
            onChange={ handleChange }
            autoComplete='on'
            aria-invalid={ regexp && !regexp.test( formData[ name ] ) } />
            { !!explanation && (
              <div
                className='absolute flex w-16 h-full right-0 justify-center items-center top-1/2 rounded-full -translate-y-1/2'
                onMouseEnter={ handleHover }
                onMouseLeave={ handleHover }>
                <div>
                  <FontAwesomeIcon
                    className='text-2xl text-blue-600 hover:text-blue-700'
                    icon={ faCircleInfo } />
                </div>
              </div>
            ) }
            { !!explanation && isHovered && (
              <div className={
                clsx(
                  'absolute block w-full p-4 rounded-full left-1/2 transform -translate-x-1/2 bg-blue-600 z-10',
                  'border-2 border-blue-600 shadow-2xl shadow-neutral-900/50 dark:shadow-2xl dark:shadow-neutral-900/50',
                  'before:content-["▲"] before:absolute before:text-blue-600 before:-top-5 before:left-12',
                  'fadeIn'
                )
              }>
                <div className='relative'>
                  <FontAwesomeIcon
                    className='absolute text-xl text-neutral-50 top-1/2 -translate-y-1/2'
                    icon={ faExclamation } />
                  <p className='block text-center text-neutral-50'>{ explanation }</p>
                </div>
              </div>
            ) }
        </div>
      </div>
    </>
  )
}

export default AuthFormInputComponent
