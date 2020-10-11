import { useState } from 'react';
// Only need useState since this is a hook only.
// Name custom hooks starting with `use`, or else React won't know what's going on

import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 }, // Position
    tetromino: randomTetromino().shape,
    collided: false,
  });
  // Only need to return the `player` object in the Tetris component.
  return [player];
};
