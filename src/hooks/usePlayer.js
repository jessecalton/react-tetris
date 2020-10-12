import { useState, useCallback } from 'react';
// Only need useState since this is a hook only.
// Name custom hooks starting with `use`, or else React won't know what's going on
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 }, // Position
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (tetromino, dir) => {
    // Make all the rows columns
    const rotatedTetro = tetromino.map((_, index) =>
      tetromino.map((col) => col[index])
    );
    // Reverse each row to get a rotated tetromino
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    // This stuff here keeps us from having overlapping tetris pieces
    // Checks collisions going right and left
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      // Black magic code for going back and forth, seeing if the piece collides
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        // Rotate it back
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
    console.log(player);
  };
  // Need our useCallback hook or else we'll get stuck in an infinite loop
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
