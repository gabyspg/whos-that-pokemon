import * as React from 'react';
import TextField from '@mui/material/TextField';

const UserInfoInput = (props) => {
  const { username, password, handleUsernameChange, handlePasswordChange } =
    props;

  return (
    <>
      <TextField
        id='username'
        label='Username'
        variant='outlined'
        autoComplete='off'
        name='username'
        type='string'
        value={username}
        onChange={(event) => handleUsernameChange(event)}
        sx={{
          mb: 1,
        }}
      />
      <TextField
        id='password'
        label='Password'
        type='password'
        variant='outlined'
        autoComplete='off'
        name='password'
        value={password}
        onChange={(event) => handlePasswordChange(event)}
        sx={{
          mb: 1,
        }}
      />

      {/* <label className='userInput'>
        Username:
        <input
          name='username'
          type='string'
          placeholder='Username'
          value={username}
          onChange={(event) => handleUsernameChange(event)}
        />
      </label>
      <label className='userInput'>
        Password:
        <input
          name='password'
          placeholder='Password'
          value={password}
          onChange={(event) => handlePasswordChange(event)}
        />
      </label> */}
    </>
  );
};
export default UserInfoInput;
