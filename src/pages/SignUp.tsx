import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

interface FormInputs {
  email: string
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const navigate = useNavigate()
  const { logIn } = useAuth()

  const onSubmit = async (data: FormInputs) => {
    localStorage.setItem('userEmail', data.email)

    logIn()
    navigate('/')
  }

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

  return (
    <div className="SignUp">
      <div className="form-wrapper">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            required
            type="email"
            placeholder="Enter email"
            {...register('email', {
              validate: validateEmail,
              required: 'Email is required',
            })}
            className={`form__field ${errors.email ? 'form__field_invalid' : ''}`}
          />

          {errors.email && <p className="error">
            {errors.email.type === 'validate' ? 'Invalid email.' : errors.email.message}
          </p>}

          <button type="submit" className="form__button">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
