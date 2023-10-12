import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/*

/////// LEFT SIDE CONTAINER \\\\\\\
Displays high score and current score (which User Input resets to 0 upon failing to name a pokemon).
- for stretch feature: ths would also hold user information (i.e. username)
- Inherits score and pokemon from App

*/

const LeftSideContainer = (props) => {
  let userHighScore = useSelector(
    (state) => state.pokemon.userInfo.userHighScore
  );
  if (userHighScore === '') {
    userHighScore = 0;
  }
  const { score, pokemon } = props;
  const [highScore, setHighScore] = useState(userHighScore);

  //This condition hides the score if no pokemon has been fetched.
  if (!pokemon.imageURL) {
    return <div id='LeftSideContainer'></div>;
  }
  if (score > highScore) {
    setHighScore(score);
  }

  return (
    <div id='LeftSideContainer'>
      <h2 className='score'>Score: {score}</h2>
      <h2 className='score'>Highscore: {highScore}</h2>
    </div>
  );
};

export default LeftSideContainer;
