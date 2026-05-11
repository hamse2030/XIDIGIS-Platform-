/**
 * FALAG Temporal Intelligence: Trend & Acceleration Engine
 */

export function calculateTrend(history: number[]): number {
  if (history.length < 2) return 0;
  
  // Calculate slope over last 7 points (or whatever is available)
  const window = history.slice(-7);
  const start = window[0];
  const end = window[window.length - 1];
  
  return (end - start) / window.length;
}

export function calculateAcceleration(history: number[]): number {
  if (history.length < 3) return 0;
  
  const rT = history[history.length - 1];
  const rT1 = history[history.length - 2];
  const rT2 = history[history.length - 3];
  
  const delta1 = rT - rT1;
  const delta2 = rT1 - rT2;
  
  return delta1 - delta2;
}

export function calculatePersistence(history: number[], threshold: number = 60): number {
  let daysAbove = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i] >= threshold) daysAbove++;
    else break;
  }
  
  // Persistence factor: 0.1 increase for every 10 days of sustained risk
  return daysAbove / 100;
}
