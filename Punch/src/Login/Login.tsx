import React from 'react'
import TextBox from '../TextBox/TextBox'
import HorizontalSelect from './HorizontalSelect/HorizontalSelect'
import './Login.css'
import { RegisterRequest } from '../DTOs/login/register';
import { LoginRequest } from '../DTOs/login/login';

const BASE_URL = 'https://barbara-waugh-anaphylactically.ngrok-free.dev';

const postJSON = (endpoint: string, body: object) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    redirect: 'follow' as const,
  });
};

const Login = () => {
  const [mode, setMode] = React.useState<string>('Login');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (mode === 'Register') {
      const register = new RegisterRequest(
        data.get('email') as string,
        data.get('firstName') as string,
        data.get('lastName') as string,
        data.get('password') as string
      );

      postJSON('/auth/register', {
        email:     register.email,
        firstName: register.firstName,
        lastName:  register.lastName,
        password:  register.password,
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      alert('New user registered');

    } else {
      const login = new LoginRequest(
        data.get('email') as string,
        data.get('password') as string
      );

      postJSON('/auth/login', {
        username: login.username,
        password: login.password,
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className='login'>
      <HorizontalSelect
        options={['Login', 'Register']}
        onSelectOption={(option: React.SetStateAction<string>) => setMode(option)}
      />
      <form onSubmit={handleSubmit}>
        <TextBox label='Email' name='email' />
        <TextBox label='Password' name='password' type='password' />

        <div className={`register-only-container${mode === 'Register' ? '' : ' disabled'}`}>
          <TextBox label='First Name' name='firstName' />
          <TextBox label='Last Name' name='lastName' />
        </div>

        <button className='login-submit-button' type='submit'>{mode}</button>
      </form>
    </div>
  );
};

export default Login