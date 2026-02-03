let timerInterval;
const calendar = document.getElementById("calendar");

document.getElementById("setTimer").addEventListener("click", () => {
  clearInterval(timerInterval);

  const startTime = new Date(document.getElementById("startTime").value);
  const durationMin = Number(document.getElementById("duration").value);
  const studyTitle = document.getElementById("studyTitle").value || "勉強";
  const alarm = document.getElementById("alarm");
  const status = document.getElementById("status");
  const countdown = document.getElementById("countdown");

  if (isNaN(startTime.getTime())) {
    alert("開始時間を設定してください");
    return;
  }

  status.textContent = "開始待ち…";

  const wait = setInterval(() => {
    if (new Date() >= startTime) {
      clearInterval(wait);
      alarm.play();
      startCountdown(durationMin * 60);
    }
  }, 1000);

  function startCountdown(seconds) {
    let remaining = seconds;
    status.textContent = "勉強中！";

    timerInterval = setInterval(() => {
      countdown.textContent =
        String(Math.floor(remaining / 60)).padStart(2, "0") + ":" +
        String(remaining % 60).padStart(2, "0");

      if (remaining <= 0) {
        clearInterval(timerInterval);
        status.textContent = "終了！お疲れさま 🎉";
        alarm.play();
        saveStudyLog(startTime, studyTitle, durationMin);
        renderCalendar();
      }
      remaining--;
    }, 1000);
  }
});

function saveStudyLog(date, title, time) {
  const logs = JSON.parse(localStorage.getItem("studyLogs")) || [];
  logs.push({
    date: date.toISOString().split("T")[0],
    title,
    time
  });
  localStorage.setItem("studyLogs", JSON.stringify(logs));
}

function renderCalendar() {
  calendar.innerHTML = "";
  const logs = JSON.parse(localStorage.getItem("studyLogs")) || [];

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const cell = document.createElement("div");
    cell.className = "day";
    cell.innerHTML = `<strong>${day}</strong>`;

    logs
      .filter(log => log.date === dateStr)
      .forEach(log => {
        const div = document.createElement("div");
        div.className = "study-log";
        div.textContent = `${log.title} (${log.time}分)`;
        cell.appendChild(div);
      });

    calendar.appendChild(cell);
  }
}

renderCalendar();
