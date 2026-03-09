import React from 'react'
import TextBox from '../TextBox/TextBox'
import HorizontalSelect from './HorizontalSelect/HorizontalSelect'

const Login = () => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    // Handle login logic here
  }

  return (
    <div>
      <HorizontalSelect options={['Login', 'Sign Up']}/>
      <form onSubmit={handleSubmit}>
        <TextBox label='Username'/>
        <TextBox label='Password' type='password'/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login