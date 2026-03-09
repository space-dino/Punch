import React from 'react'
import TextBox from '../TextBox/TextBox'
import HorizontalSelect from './HorizontalSelect/HorizontalSelect'
import './Login.css'

const Login = () => {
  const [mode, setMode] = React.useState<string>('Login')

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    console.log('mode:', mode)  // 'Login' or 'Sign Up'
  }

  return (
    <div className='login'>
      <HorizontalSelect
        options={['Login', 'Sign Up']}
        onSelectOption={(option) => setMode(option)}
      />
      <form onSubmit={handleSubmit}>
        <TextBox label='Username'/>
        <TextBox label='Password' type='password'/>

        <div className={`signup-only-container${mode === 'Sign Up' ? '' : ' disabled'}`}>
          <TextBox label='First Name'/>
          <TextBox label='Last Name'/>
        </div>

        <button className='login-submit-button' type='submit'>{mode}</button>
      </form>
    </div>
  )
}

export default Login