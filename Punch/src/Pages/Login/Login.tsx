import React, { useEffect, useState } from 'react'
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
  const [mode, setMode] = useState<string>('Login');
  const { setLogin } = useLogin();
  const navigate = useNavigate();
  const [wrong, setWrong] = useState<boolean>(false);
  
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  })

  const handlePasswordsChange = (field: string) => (value: string) => {
    setWrong(false);
    setPasswords(prev => ({ ...prev, [field]: value }))
  }

  const passwordsMatch = passwords.password === passwords.confirmPassword;

  const login = (data : FormData) => {
      const loginRequest = new LoginRequest(
        data.get('email') as string,
        data.get('password') as string
      );
      
      postJSON(configuration.baseUrls.auth, configuration.urls.loginUrl, loginRequest)
      .then(({ status }) => {
        if (status === 201) {
          setLogin(loginRequest);
          navigate('/');
        } else if (status === 401) {
          setWrong(true);
        }
      })
      .catch(console.error)
  }

  useEffect(() => {
    setLogin(undefined);
  }, []);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data : FormData = new FormData(e.currentTarget);

    if (mode === 'Register') {
      const register = new RegisterRequest(
        data.get('email') as string,
        data.get('firstName') as string,
        data.get('lastName') as string,
        data.get('password') as string
      );

    postJSON(configuration.baseUrls.auth, configuration.urls.registerUrl, register)
      .then(({ status }) => {
        if (status === 201) {
          login(data);
        }
      })
      .catch(console.error)
    } else {
      login(data);
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
        <TextBox
          label='Password'
          name='password'
          type='password'
          required={true}
          value={passwords.password}
          onChange={handlePasswordsChange('password')}
        />

        <div className={`register-only-container${mode === 'Register' ? '' : ' disabled'}`}>
          <TextBox
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            required={mode === 'Register'}
            value={passwords.confirmPassword}
            onChange={handlePasswordsChange('confirmPassword')}
          />
          <TextBox label='First Name' name='firstName' required={mode === 'Register'} />
          <TextBox label='Last Name' name='lastName' required={mode === 'Register'} />
        </div>

        <p className={`error ${
            (mode === 'Register' && !passwordsMatch && passwords.confirmPassword !== '')
            || wrong
              ? '' 
              : 'disabled'
          }`}>
            {mode === 'Register' ? 'Passwords do not match' : (wrong ? 'Wrong Password' : '')}
          </p>
        <button className='login-submit-button' type='submit' disabled={(!passwordsMatch && mode === 'Register')}>{mode}</button>
      </form>
    </div>
  );
};

export default Login