// public/script.js
export const initialAssignments = [
    { location: "床（オフィス）", team: "コーポレート" },
    { location: "床（会議室）", team: "セールス" },
    { location: "共用スペース", team: "セールス" },
    { location: "机", team: "プロダクト" },
    { location: "ホワイトボード、戸棚、モニタ、換気", team: "プロダクト" },
    { location: "給湯室、ドア", team: "CS・TS" }
  ];
  
  const baselineMonday = new Date(1970, 0, 5);
  
  export function getMondayOfWeek(date = new Date()) {
    const today = new Date(date);
    const day = today.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
  }
  
  export function getWeekNumber(date = new Date()) {
    const monday = getMondayOfWeek(date);
    const diffInMs = monday - baselineMonday;
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diffInMs / msPerWeek);
  }
  
  export function rotateAssignments(assignments, weekNumber) {
    const rotation = weekNumber % assignments.length;
    return assignments.slice(rotation).concat(assignments.slice(0, rotation));
  }
  
  export function getWeeklyAssignments(date = new Date()) {
    const weekNumber = getWeekNumber(date);
    return rotateAssignments(initialAssignments, weekNumber);
  }
  
  // displayAssignments の定義（自動で呼び出さない）
  export function displayAssignments() {
    const assignmentsElement = document.getElementById("assignments");
    if (!assignmentsElement) {
      console.warn("assignments 要素が見つかりません。");
      return;
    }
    const assignments = getWeeklyAssignments();
    assignmentsElement.textContent = assignments
      .map(a => `${a.location}: ${a.team}`)
      .join("\n");
  }
  
  // ※ 自動呼び出しを削除する
  // displayAssignments();
  