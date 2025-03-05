// __tests__/test.js (もしくは logExpectedOutput.test.js)
import { getMondayOfWeek, getWeekNumber, rotateAssignments, getWeeklyAssignments, initialAssignments } from '../public/script.js';

beforeEach(() => {
  // テスト用の DOM をセットアップ
  document.body.innerHTML = '<pre id="assignments"></pre>';
});

describe('Specific Date Rotation', () => {
  test('2025/03/12の割り当ての順序が正しい', () => {
    const testDate = new Date(2025, 2, 12); // 月は 0 始まり
    const assignments = getWeeklyAssignments(testDate);
    
    // 期待される順序（例）
    const expected = [
      { location: "給湯室、ドア", team: "CS・TS" },
      { location: "床（オフィス）", team: "コーポレート" },
      { location: "床（会議室）", team: "セールス" },
      { location: "共用スペース", team: "セールス" },
      { location: "机", team: "プロダクト" },
      { location: "ホワイトボード、戸棚、モニタ、換気", team: "プロダクト" }
    ];
    expect(assignments).toEqual(expected);
  });
});

describe('Log Expected Output for 2025/03/19', () => {
    test('2025/03/19 の割り当てをログ表示', () => {
      const testDate = new Date(2025, 2, 19);
      const assignments = getWeeklyAssignments(testDate);
      console.log('Assignments for 2025/03/19:');
      console.log(assignments);
      expect(assignments).toBeDefined(); // ダミーアサーション
    });
  });
  