// Creating the stage, width and height
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// creating the stage using a multidimensional array
export const createStage = () => {
  // Creating a new array from the height
  // The inline function creates a new array for each cell
  // The 'clear' string means it has not collided with another tetromino
  return Array.from(Array(STAGE_HEIGHT), () => {
    return new Array(STAGE_WIDTH).fill([0, 'clear']);
  });
};

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        // Short-circuit eval - looking into the "future"
        if (
          // 2. Check that our movement is inside the game area's Y axis
          // Don't go through the bottom.
          !stage[y + player.pos.y + moveY] ||
          // 3. Check that movement is in game area's X axis
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check that cell we're moving to is NOT set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
};
