// assignments.test.js
const { getMondayOfWeek, getWeekNumber, rotateAssignments, getWeeklyAssignments, initialAssignments } = require('../public/script.js');

describe('Specific Date Rotation', () => {
  test('2025/03/12の割り当ての順序が正しい', () => {
    // 2025/03/12はJavaScriptでは new Date(2025, 2, 12) と表記（※月は0始まり）
    const testDate = new Date(2025, 2, 12);
    const assignments = getWeeklyAssignments(testDate);

    // 当該テストの計算（getMondayOfWeek, getWeekNumber）により、
    // 2025/03/12（水曜日）の週の月曜日は2025/03/10となります。
    // baselineMondayは1970/01/05として計算しているため、
    // 週番号は 2879 となり、6件の配列の場合、2879 mod 6 = 5 のローテーションとなります。
    // つまり、初期配列の6番目（index 5）が先頭になり、残りはその前に続く形になります。
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
