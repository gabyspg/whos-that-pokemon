import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../slices/pokemonSlice.js';
import UserInfoInput from './LogIn-SignUp Components/UserInfoInput.jsx';
import NavBar from './NavBar.jsx';
import Button from '@mui/material/Button';

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (event, username, password) => {
    event.preventDefault();

    const sendBody = {
      username: username,
      password: password,
    };

    const signInRequest = {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(sendBody),
    };

    fetch('/user/logIn', signInRequest)
      .then((res) => res.json())
      .then((data) => {
        console.log('data from sign-in fetch', data);
        if (data === 'User validation failed.') {
          alert('Please sign up!');
          navigate('/signUp');
          return;
        }
        const { _id, username, userHighScore } = data;
        const updatedUser = { _id, username, userHighScore };
        dispatch(updateUser(updatedUser));
        navigate('/home');
        return;
      })
      .catch((err) => {
        alert('Unable to sign in');
        console.log(err);
        return;
      });
  };

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  return (
    <div className='mainContain'>
      <NavBar />
      <div className='logInForm'>
        <UserInfoInput
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
        <Button
          variant='contained'
          onClick={(event) => signIn(event, username, password)}
          sx={{ backgroundColor: '#2c387e' }}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};
export default LogIn;
