// 初期の組み合わせ
const initialAssignments = [
    { location: "床（オフィス）", team: "旧グロースチーム" },
    { location: "床（会議室）", team: "エンジニアチーム" },
    { location: "共用スペース", team: "コーポレートチーム" },
    { location: "机", team: "セールスチーム" },
    { location: "ホワイトボード、戸棚、モニタ、換気", team: "CSチーム" },
    { location: "給湯室、ドア", team: "TSチーム" }
];

// 今週の月曜日を計算
function getMondayOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay(); // 0 (日曜日) ~ 6 (土曜日)
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // 月曜日の日付を計算
    return new Date(today.setDate(diff));
}

// チームの割り当てをローテーション
function rotateAssignments(assignments, weekNumber) {
    const rotatedAssignments = [...assignments];
    for (let i = 0; i < weekNumber; i++) {
        const first = rotatedAssignments.shift();
        rotatedAssignments.push(first);
    }
    return rotatedAssignments;
}

// 今週の割り当てを取得
function getWeeklyAssignments() {
    const monday = getMondayOfCurrentWeek();
    const weekNumber = Math.floor(monday.getTime() / (1000 * 60 * 60 * 24 * 7)); // 週番号
    const rotated = rotateAssignments(initialAssignments, weekNumber);
    return rotated;
}

// ページに割り当てを表示
function displayAssignments() {
    const assignments = getWeeklyAssignments();
    const assignmentsElement = document.getElementById("assignments");
    assignmentsElement.textContent = assignments
        .map(a => `${a.location}: ${a.team}`)
        .join("\n");
}

displayAssignments();