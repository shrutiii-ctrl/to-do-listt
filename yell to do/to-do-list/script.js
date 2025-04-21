const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.textContent = taskText;

    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });

    list.appendChild(li);
    input.value = '';
  }
});
// Notification on task add
function notifyTask(task) {
    if (Notification.permission === 'granted') {
      new Notification("New Task Added", { body: task });
    }
  }
  
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    const taskTime = document.getElementById('todo-time').value;
  
    if (taskText !== '') {
      const li = document.createElement('li');
      li.innerHTML = `<span>${taskText}</span> <small>${taskTime}</small>`;
      li.addEventListener('click', () => li.classList.toggle('completed'));
      list.appendChild(li);
      input.value = '';
      document.getElementById('todo-time').value = '';
  
      notifyTask(taskText); // optional push notification
      if (taskTime) {
        setAlarm(taskText, taskTime);
      }
    }
  });
  
// Voice Input
const voiceBtn = document.getElementById('voice-btn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  input.value = voiceText;
  form.dispatchEvent(new Event('submit'));
};

voiceBtn.addEventListener('click', () => {
  recognition.start();
});


function setAlarm(task, timeStr) {
    const now = new Date();
    const [hour, minute] = timeStr.split(':');
    const alarmTime = new Date();
  
    alarmTime.setHours(hour, minute, 0, 0);
    const delay = alarmTime.getTime() - now.getTime();
  
    if (delay > 0) {
      setTimeout(() => {
        alert(`⏰ Time to: ${task}`);
        notifyTask(`⏰ ${task}`);
      }, delay);
    }
  }
  