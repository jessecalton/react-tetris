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
