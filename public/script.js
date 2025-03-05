// assignments.js
export const initialAssignments = [
    { location: "床（オフィス）", team: "コーポレート" },
    { location: "床（会議室）", team: "セールス" },
    { location: "共用スペース", team: "セールス" },
    { location: "机", team: "プロダクト" },
    { location: "ホワイトボード、戸棚、モニタ、換気", team: "プロダクト" },
    { location: "給湯室、ドア", team: "CS・TS" }
  ];
  
  // 任意の日付に対して月曜日を返す関数
  export function getMondayOfWeek(date = new Date()) {
    const today = new Date(date);
    const day = today.getDay(); // 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
    const diff = (day === 0 ? -6 : 1) - day;
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
  }
  
  // 基準日からの週番号を返す（基準日は1970年1月5日）
  const baselineMonday = new Date(1970, 0, 5);
  export function getWeekNumber(date = new Date()) {
    const monday = getMondayOfWeek(date);
    const diffInMs = monday - baselineMonday;
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diffInMs / msPerWeek);
  }
  
  // チームの割り当てをローテーション（効率的な配列操作）
  export function rotateAssignments(assignments, weekNumber) {
    const rotation = weekNumber % assignments.length;
    return assignments.slice(rotation).concat(assignments.slice(0, rotation));
  }
  
  // 今週の割り当てを取得
  export function getWeeklyAssignments(date = new Date()) {
    const weekNumber = getWeekNumber(date);
    return rotateAssignments(initialAssignments, weekNumber);
  }
  