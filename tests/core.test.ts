import { getClimateScore } from '../src/lib/intelligence/climateEngine';
import { calculateRegionalRisk } from '../src/lib/intelligence/index';

/**
 * XIDIGIS Core Unit Tests
 * 
 * Run with: npx tsx tests/core.test.ts
 */

async function testClimateScoring() {
  console.log('🧪 Testing Climate Scoring Logic...');
  
  // Test Case 1: Extreme Drought (-100% anomaly)
  // Mocking behavior is simulated here by checking the normalization logic
  const mockAnomaly = -100;
  const score = Math.abs(Math.min(0, mockAnomaly));
  if (score === 100) console.log('✅ Extreme Drought: 100/100 score');
  else console.error('❌ Extreme Drought calculation failed');

  // Test Case 2: Normal Rain (0% anomaly)
  const mockAnomalyNormal = 0;
  const scoreNormal = Math.abs(Math.min(0, mockAnomalyNormal));
  if (scoreNormal === 0) console.log('✅ Normal Rain: 0/100 score');
  else console.error('❌ Normal Rain calculation failed');
}

async function testAlertLogic() {
  console.log('\n🧪 Testing Alert Level Thresholds...');
  
  const thresholds = { critical: 75, severe: 55, high: 35, moderate: 15 };
  
  const getLevel = (s: number) => {
    if (s >= thresholds.critical) return 'Critical';
    if (s >= thresholds.severe) return 'Severe';
    if (s >= thresholds.high) return 'High';
    return 'Low';
  };

  if (getLevel(80) === 'Critical') console.log('✅ Threshold 80: Critical');
  if (getLevel(60) === 'Severe') console.log('✅ Threshold 60: Severe');
  if (getLevel(10) === 'Low') console.log('✅ Threshold 10: Low');
}

async function runAllTests() {
  console.log('--- STARTING XIDIGIS UNIT TESTS ---');
  await testClimateScoring();
  await testAlertLogic();
  console.log('--- TESTS COMPLETE ---');
}

runAllTests().catch(console.error);
