// public/script.js
export const locations = [
  "床（オフィス）",
  "床（会議室）",
  "共用スペース",
  "机",
  "ホワイトボード、戸棚、モニタ、換気",
  "給湯室、ドア"
];

export const teams = [
  "コーポレート",
  "セールス",
  "プロダクト",
  "旧CS・TS"
];

// 基準日を2023年1月2日（月曜日）に設定
const baselineDate = new Date(2023, 0, 2);

export function getMondayOfWeek(date = new Date()) {
  const today = new Date(date);
  const day = today.getDay();
  // 日曜日は0、月曜日は1なので、月曜日に調整するための計算
  const diff = (day === 0 ? -6 : 1) - day;
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + diff);
}

export function getWeekNumber(date = new Date()) {
  const monday = getMondayOfWeek(date);
  const diffInTime = monday.getTime() - baselineDate.getTime();
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diffInTime / msPerWeek);
}

export function getTeamRotations(weekNumber) {
  // チームのローテーション計算
  const rotations = [];
  
  for (let i = 0; i < locations.length; i++) {
      // 各場所ごとに開始チームのインデックスを変える
      // 例: 場所0は0から開始、場所1は1から開始、など
      const startTeamIndex = i % teams.length;
      
      // 週ごとのローテーション
      const teamIndex = (startTeamIndex + weekNumber) % teams.length;
      rotations.push(teams[teamIndex]);
  }
  
  return rotations;
}

export function getWeeklyAssignments(date = new Date()) {
  const weekNumber = getWeekNumber(date);
  const teamRotations = getTeamRotations(weekNumber);
  
  return locations.map((location, index) => {
      return {
          location: location,
          team: teamRotations[index]
      };
  });
}

// displayAssignments の定義
export function displayAssignments(date = new Date()) {
  const assignmentsElement = document.getElementById("assignments");
  if (!assignmentsElement) {
      console.warn("assignments 要素が見つかりません。");
      return;
  }
  
  // 現在の週の月曜日を取得
  const monday = getMondayOfWeek(date);
  const formattedDate = `${monday.getFullYear()}/${monday.getMonth() + 1}/${monday.getDate()}週`;
  
  const assignments = getWeeklyAssignments(date);
  
  // 日付を表示
  const dateElement = document.getElementById("current-week");
  if (dateElement) {
      dateElement.textContent = formattedDate;
  }
  
  // 担当を表示
  assignmentsElement.innerHTML = assignments
      .map(a => `<div class="assignment"><span class="location">${a.location}:</span> <span class="team">${a.team}</span></div>`)
      .join("");
}

// ページ読み込み時に自動で実行
window.addEventListener("DOMContentLoaded", () => {
  displayAssignments();
  
  // 前の週と次の週のボタンがあれば、イベントリスナーを追加
  const prevWeekBtn = document.getElementById("prev-week");
  const nextWeekBtn = document.getElementById("next-week");
  let currentDate = new Date();
  
  if (prevWeekBtn) {
      prevWeekBtn.addEventListener("click", () => {
          currentDate.setDate(currentDate.getDate() - 7);
          displayAssignments(new Date(currentDate));
      });
  }
  
  if (nextWeekBtn) {
      nextWeekBtn.addEventListener("click", () => {
          currentDate.setDate(currentDate.getDate() + 7);
          displayAssignments(new Date(currentDate));
      });
  }
});