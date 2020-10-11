import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => {
  // The type is the shape of the piece, i.e. I, J, Z, etc.
  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default Cell;
