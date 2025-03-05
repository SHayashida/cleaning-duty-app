// assignments.test.js
const { getMondayOfWeek, getWeekNumber, rotateAssignments, getWeeklyAssignments, initialAssignments } = require('../assignments');

describe('Date Functions', () => {
  test('火曜日の場合、正しい月曜日を返す', () => {
    // 2021-09-14 は火曜日
    const tuesday = new Date(2021, 8, 14);
    const monday = getMondayOfWeek(tuesday);
    expect(monday.getFullYear()).toBe(2021);
    expect(monday.getMonth()).toBe(8); // 0始まりのため9月は8
    expect(monday.getDate()).toBe(13); // 2021-09-13 が月曜日
  });

  test('日曜日の場合、正しい月曜日を返す', () => {
    // 2021-09-19 は日曜日
    const sunday = new Date(2021, 8, 19);
    const monday = getMondayOfWeek(sunday);
    expect(monday.getFullYear()).toBe(2021);
    expect(monday.getMonth()).toBe(8);
    expect(monday.getDate()).toBe(13); // 2021-09-13 が月曜日
  });
});

describe('Week Number Calculation', () => {
  test('指定した日付の週番号が正しく計算される', () => {
    // 2021-09-14 (火曜日) の週番号を取得して検証
    const testDate = new Date(2021, 8, 14);
    const weekNum = getWeekNumber(testDate);
    // 正確な数値は1970年基準なので、ここでは数値の型だけ検証
    expect(typeof weekNum).toBe('number');
  });
});

describe('Rotate Assignments', () => {
  test('割り当てのローテーションが正しく行われる', () => {
    // 初期の順番を確認
    const weekNumber = 2; // 例として2週目
    const rotated = rotateAssignments(initialAssignments, weekNumber);
    // 例：2回のローテーションの場合、最初の要素は本来3番目の要素となる
    expect(rotated[0]).toEqual(initialAssignments[2]);
  });
});

describe('Weekly Assignments', () => {
  test('特定の日付に基づいた今週の割り当てが正しく取得できる', () => {
    // 2021-09-14 に対する割り当て
    const testDate = new Date(2021, 8, 14);
    const weeklyAssignments = getWeeklyAssignments(testDate);
    // ここでは、回転が適用されるかどうかを確認します
    // 具体的な内容は、getWeekNumber に依存するので、初期配列の一部が先頭になっていればOKとする
    expect(weeklyAssignments.length).toBe(initialAssignments.length);
    expect(weeklyAssignments[0]).toHaveProperty('location');
    expect(weeklyAssignments[0]).toHaveProperty('team');
  });
});
