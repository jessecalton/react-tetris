import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => {
  // The type is the shape of the piece, i.e. I, J, Z, etc.
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

// Memoizing the Cell component and only renders when stuff changes
export default React.memo(Cell);
// Won't re-render all the cells, only the ones that change when you move your piece.
