import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = (prevStage) => {
      // First flush the stage, clear it from prev render.
      const newStage = prevStage.map((row) => {
        // which cells have collided tetris pieces?
        return row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell));
      });

      // Next, draw the tetris piece
      player.tetromino.forEach((row, y) => {
        // Get the shape of the tetromino
        row.forEach((value, x) => {
          if (value !== 0) {
            // get the coordinates of the stage
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      // Check if you collided. If so, get a new piece up top.
      if (player.collided) {
        resetPlayer();
      }
      return newStage;
    };
    console.log(player);
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage];
};
