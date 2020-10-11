import React, { useState } from 'react';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Need a clean stage when you restart the game
import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');

  const movePlayer = (dir) => {
    console.log(checkCollision(player, stage, { x: dir, y: 0 }));
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    console.log('Moved', keyCode);
    if (!gameOver) {
      // 37 is left arrow
      if (keyCode === 37) {
        movePlayer(-1);
        // 39 is right arrow
      } else if (keyCode === 39) {
        movePlayer(1);
        // 40 is down arrow
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };
  return (
    // TetrisWrapper will handle our key inputs, since it covers the whole screen.
    // Without it, we'd have to click on the game board to get the key presses to register
    // role="button" allows it to respond to the keypress
    // onKeyDown takes our event and passes it to the `move` function
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text='Score' />
              <Display text='Rows' />
              <Display text='Level' />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
