import styled from 'styled-components';
// Styled components help us to modify CSS conditionally using props
export const StyledCell = styled.div`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  // If there is no tetris piece, do nothing.
  border: ${(props) => (props.type === 0 ? '0px solid' : '4px solid')};
  // Gives us the shadow effects on the blocks, by changing the opacity
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;
