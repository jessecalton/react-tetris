import { useState, useEffect, useCallback} from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  // Another instance where we need useCallback to avoid infinity loops
  const calcScore = useCallback(() => {
    // If we cleared rows, calculate the score
    if (rowsCleared > 0) {
      // Formula for score calc from OG Tetris game
      setScore(prevState => prevState + linePoints[rowsCleared - 1] * (level + 1))
      setRows(prev => prev + rowsCleared)
    }
  }, [level, linePoints, rowsCleared])

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score])

  return [score, setScore, rows, setRows, level, setLevel]
}