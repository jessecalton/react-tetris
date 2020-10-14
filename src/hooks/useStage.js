import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0)

  useEffect(() => {
    setRowsCleared(0)

    const sweepRows = newStage => {
      return newStage.reduce((acc, row) => {
        // If no match for findIndex is found, it returns -1
        // Check for any rows where all the values in a row are not zero
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1)
          // Adding another row at the top to "clear" the complete line
          acc.unshift(new Array(newStage[0].length).fill([0, 'clear']))
          return acc;
        }
        // If the row isn't full, return the full row as is.
        acc.push(row);
        return acc;
      }, [])
    }
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
        return sweepRows(newStage)
      }
      return newStage;
    };
    console.log(player);
    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
