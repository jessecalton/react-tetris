import React, { useState } from 'react';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Need a clean stage when you restart the game
import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

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
    setDropTime(1000)
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1)
      // Increase speed as well
      setDropTime(1000 / (level + 1) + 200)
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Check if they hit the ceiling and died
      if (player.pos.y < 1) {
        console.log("IT'S GAME OVER MAN");
        setGameOver(true);
        setDropTime(null);
      }
      // If there is a collision, we merge it to the stage
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({keyCode}) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log('Interval on')
        setDropTime(1000 / (level + 1) + 200)
      }
    }
  }

  const dropPlayer = () => {
    console.log('Interval off')
    setDropTime(null);
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
        // 38 is up arrow
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };
  // Better to create a new useInterval hook for React stuff,
  // rather than use the built-in useInterval from the Web API
  useInterval(() => {
    drop();
  }, dropTime)
  return (
    // TetrisWrapper will handle our key inputs, since it covers the whole screen.
    // Without it, we'd have to click on the game board to get the key presses to register
    // role="button" allows it to respond to the keypress
    // onKeyDown takes our event and passes it to the `move` function
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
