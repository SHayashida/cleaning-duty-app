// 初期の組み合わせ
const initialAssignments = [
    { location: "床（オフィス）", team: "コーポレート" },
    { location: "床（会議室）", team: "セールス" },
    { location: "共用スペース", team: "セールス" },
    { location: "机", team: "プロダクト" },
    { location: "ホワイトボード、戸棚、モニタ、換気", team: "プロダクト" },
    { location: "給湯室、ドア", team: "CS・TS" }
];

// 今週の月曜日を計算（todayオブジェクトを変更せず、新たなDateオブジェクトを返す）
function getMondayOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay(); // 0 (日曜) ~ 6 (土曜)
    const diff = (day === 0 ? -6 : 1) - day; // 月曜日との差
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
}

// 基準となる月曜日（例：1970年1月5日（月曜日））
const baselineMonday = new Date(1970, 0, 5);

// 基準日からの週番号を計算
function getWeekNumber() {
    const monday = getMondayOfCurrentWeek();
    const diffInMs = monday - baselineMonday;
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diffInMs / msPerWeek);
}

// チームの割り当てをローテーション（moduloを使用して効率化）
function rotateAssignments(assignments, weekNumber) {
    const rotation = weekNumber % assignments.length;
    return assignments.slice(rotation).concat(assignments.slice(0, rotation));
}

// 今週の割り当てを取得
function getWeeklyAssignments() {
    const weekNumber = getWeekNumber();
    return rotateAssignments(initialAssignments, weekNumber);
}

// ページに割り当てを表示
function displayAssignments() {
    const assignments = getWeeklyAssignments();
    const assignmentsElement = document.getElementById("assignments");
    if(assignmentsElement) {
        assignmentsElement.textContent = assignments
            .map(a => `${a.location}: ${a.team}`)
            .join("\n");
    } else {
        console.error("assignments要素が見つかりません。");
    }
}

displayAssignments();
