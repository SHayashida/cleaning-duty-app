// __tests__/test.js
import { getMondayOfWeek, getWeekNumber, rotateAssignments, getWeeklyAssignments, initialAssignments } from '../public/script.js';

describe('Specific Date Rotation', () => {
  test('2025/03/12の割り当ての順序が正しい', () => {
    // 2025/03/12 は new Date(2025, 2, 12)（月は0始まり）
    const testDate = new Date(2025, 2, 12);
    const assignments = getWeeklyAssignments(testDate);

    // 期待値（例）
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
