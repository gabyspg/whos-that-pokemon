import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../slices/pokemonSlice';

const UserInput = (props) => {
  const { score, setScore, getNewPokemon, pokemon } = props;

  const dispatch = useDispatch();
  const username = useSelector((state) => state.pokemon.userInfo.username);
  const userHighScore = useSelector(
    (state) => state.pokemon.userInfo.userHighScore
  );

  const handleHighScoreUpdate = (score) => {
    const bodyRequest = {
      username: username,
      userHighScore: score,
    };
    const userHighScoreRequest = {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(bodyRequest),
    };

    fetch('/pokemon/userHighScore', userHighScoreRequest)
      .then((res) => res.json())
      .then((data) => {
        console.log('data from update highScore fetch', data);
        if ('err' in data || 'error' in data) {
          alert('Unable to update highscore, error from server');
          return;
        }
        dispatch(updateUser(data));
        return;
      })
      .catch((err) => {
        alert('Unable to update userHighScore');
        console.log(err);
        return;
      });
  };
  // upon user submission, checks to see if submitted answer is correct
  // if correct it will alert and increment score
  // if incorrect it will alert with correct answer
  // will render new pokemon either way by calling getNewPokemon
  const checkAnswer = async (e) => {
    e.preventDefault();
    const answer = e.target[0].value;
    if (answer.toLowerCase() === pokemon.name) {
      alert('Correct! Well done!');
      setScore(score + 1);
      getNewPokemon();
      e.target.reset();
    } else {
      alert(`Incorrect! The correct answer was ${pokemon.name}.`);
      if (score > userHighScore) {
        handleHighScoreUpdate(score);
      }
      setScore(0);
      getNewPokemon();
      e.target.reset();
    }
  };

  // only have user submission form display if pokemon image is on screen
  if (!pokemon.imageURL) {
    return <div id='startPageNoInput'></div>;
  }

  // add form for user submission when pokemon image renders
  return (
    <div>
      <form id='UserInput' onSubmit={checkAnswer}>
        <label htmlFor='userAnswer'> </label>
        <input
          id='userInputBox'
          type='text'
          placeholder='Type your answer here'
          autoComplete='off'
        />
        <input id='submitButton' type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default UserInput;
