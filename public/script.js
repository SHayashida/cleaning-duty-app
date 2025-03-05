// CommonJS (module.exports) を削除し、必要に応じて export する
export const initialAssignments = [
    { location: "床（オフィス）", team: "コーポレート" },
    { location: "床（会議室）", team: "セールス" },
    { location: "共用スペース", team: "セールス" },
    { location: "机", team: "プロダクト" },
    { location: "ホワイトボード、戸棚、モニタ、換気", team: "プロダクト" },
    { location: "給湯室、ドア", team: "CS・TS" }
];
  
  function getMondayOfWeek(date = new Date()) {
    const today = new Date(date);
    const day = today.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
  }
  
  const baselineMonday = new Date(1970, 0, 5);
  function getWeekNumber(date = new Date()) {
    const monday = getMondayOfWeek(date);
    const diffInMs = monday - baselineMonday;
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diffInMs / msPerWeek);
  }
  
  function rotateAssignments(assignments, weekNumber) {
    const rotation = weekNumber % assignments.length;
    return assignments.slice(rotation).concat(assignments.slice(0, rotation));
  }
  
  function getWeeklyAssignments(date = new Date()) {
    const weekNumber = getWeekNumber(date);
    return rotateAssignments(initialAssignments, weekNumber);
  }
  
// 追加: 画面に表示する関数を定義し、読み込み時に実行する
function displayAssignments() {
    const assignmentsElement = document.getElementById("assignments");
    const assignments = getWeeklyAssignments();
    assignmentsElement.textContent = assignments
      .map(a => `${a.location}: ${a.team}`)
      .join("\n");
  }
  
  // ES Modules では即時実行する場合、ファイルの末尾に直接書いてもOK
  displayAssignments();
  