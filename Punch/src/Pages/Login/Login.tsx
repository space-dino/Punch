import React, { useEffect } from 'react'
import TextBox from '../../Components/TextBox/TextBox'
import HorizontalSelect from './HorizontalSelect/HorizontalSelect'
import './Login.css'
import { RegisterRequest } from '../../DTOs/login/register';
import { LoginRequest } from '../../DTOs/login/login';
import configuration from "../../configuration.json"
import { postJSON } from '../../api';
import { useLogin } from '../../context/LoginContext';
import { useNavigate } from 'react-router';

const Login = () => {
  const [mode, setMode] = React.useState<string>('Login');
  const { setLogin } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(undefined);
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (mode === 'Register') {
      const register = new RegisterRequest(
        data.get('email') as string,
        data.get('firstName') as string,
        data.get('lastName') as string,
        data.get('password') as string
      );

    postJSON(configuration.baseUrls.auth, configuration.urls.registerUrl, register)
      .then(({ status, body }) => {
        alert('status:' + status);
        console.log('body:', body);
      })
      .catch(console.error)
    } else {
      const login = new LoginRequest(
        data.get('email') as string,
        data.get('password') as string
      );
      
      postJSON(configuration.baseUrls.auth, configuration.urls.loginUrl, login)
      .then(({ status }) => {
        if (status === 201) {
          setLogin(login);
          navigate('/');
        }
      })
      .catch(console.error)
    }
  };

  return (
    <div className='login'>
      <HorizontalSelect
        options={['Login', 'Register']}
        onSelectOption={(option: React.SetStateAction<string>) => setMode(option)}
      />
      <form onSubmit={handleSubmit}>
        <TextBox label='Email' name='email' required={true} />
        <TextBox label='Password' name='password' type='password' required={true} />

        <div className={`register-only-container${mode === 'Register' ? '' : ' disabled'}`}>
          <TextBox label='First Name' name='firstName' required={mode === 'Register'} />
          <TextBox label='Last Name' name='lastName' required={mode === 'Register'} />
        </div>

        <button className='login-submit-button' type='submit'>{mode}</button>
      </form>
    </div>
  );
};

export default Login