let timerInterval;

document.getElementById("setTimer").addEventListener("click", () => {
  clearInterval(timerInterval);

  const startTime = new Date(document.getElementById("startTime").value);
  const duration = Number(document.getElementById("duration").value) * 60;
  const status = document.getElementById("status");
  const countdown = document.getElementById("countdown");
  const alarm = document.getElementById("alarm");

  if (isNaN(startTime.getTime())) {
    alert("開始時間を設定してください");
    return;
  }

  status.textContent = "開始待ち…";

  const waitInterval = setInterval(() => {
    const now = new Date();

    if (now >= startTime) {
      clearInterval(waitInterval);
      status.textContent = "勉強中！";
      alarm.play();
      startCountdown(duration);
    }
  }, 1000);

  function startCountdown(seconds) {
    let remaining = seconds;

    timerInterval = setInterval(() => {
      const min = String(Math.floor(remaining / 60)).padStart(2, "0");
      const sec = String(remaining % 60).padStart(2, "0");
      countdown.textContent = `${min}:${sec}`;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        status.textContent = "終了！お疲れさま ";
        alarm.play();
      }

      remaining--;
    }, 1000);
  }
});
