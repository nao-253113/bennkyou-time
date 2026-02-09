const dateInput = document.getElementById("date");
const subjectInput = document.getElementById("subject");
const minutesInput = document.getElementById("minutes");
const saveBtn = document.getElementById("saveBtn");
const calendar = document.getElementById("calendar");

const alarmTimeInput = document.getElementById("alarmTime");
const alarmBtn = document.getElementById("alarmBtn");
const canon = document.getElementById("canon");

let studyData = JSON.parse(localStorage.getItem("studyData")) || {};

// カレンダー描画
function renderCalendar() {
  calendar.innerHTML = "";

  Object.keys(studyData).sort().forEach(date => {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    let html = `<strong>${date}</strong>`;
    studyData[date].forEach(item => {
      html += `${item.subject}：${item.minutes}分<br>`;
    });

    dayDiv.innerHTML = html;
    calendar.appendChild(dayDiv);
  });
}

// 保存処理
saveBtn.addEventListener("click", () => {
  const date = dateInput.value;
  const subject = subjectInput.value;
  const minutes = minutesInput.value;

  if (!date || !subject || !minutes) {
    alert("すべて入力してください");
    return;
  }

  if (!studyData[date]) {
    studyData[date] = [];
  }

  studyData[date].push({ subject, minutes });

  localStorage.setItem("studyData", JSON.stringify(studyData));

  renderCalendar();

  subjectInput.value = "";
  minutesInput.value = "";
});

// アラーム設定
alarmBtn.addEventListener("click", () => {
  const time = alarmTimeInput.value;
  if (!time) return;

  const [alarmH, alarmM] = time.split(":").map(Number);

  setInterval(() => {
    const now = new Date();
    if (now.getHours() === alarmH && now.getMinutes() === alarmM) {
      canon.play();
    }
  }, 1000);
});

// 初期表示
renderCalendar();
