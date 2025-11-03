// Cliente JS simple. Guarda nombre en sessionStorage (se pierde al cerrar la pestaña).
(function () {
  const socket = io();

  // UI
  const nameScreen = document.getElementById('nameScreen');
  const roomsScreen = document.getElementById('roomsScreen');
  const chatScreen = document.getElementById('chatScreen');
  const nameInput = document.getElementById('nameInput');
  const enterBtn = document.getElementById('enterBtn');
  const roomsList = document.getElementById('roomsList');
  const roomTitle = document.getElementById('roomTitle');
  const messages = document.getElementById('messages');
  const messageForm = document.getElementById('messageForm');
  const messageInput = document.getElementById('messageInput');
  const leaveRoomBtn = document.getElementById('leaveRoomBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const backToName = document.getElementById('backToName');

  let currentRoom = null;
  let username = sessionStorage.getItem('chat_username') || '';

  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }

  function renderScreens() {
    if (!username) {
      show(nameScreen); hide(roomsScreen); hide(chatScreen); 
    } else if (!currentRoom) {
      hide(nameScreen); show(roomsScreen); hide(chatScreen); 
    } else {
      hide(nameScreen); hide(roomsScreen); show(chatScreen);
    }
  }

  function loadRooms() {
    fetch('/rooms').then(r => r.json()).then(rooms => {
      roomsList.innerHTML = '';
      rooms.forEach(rn => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = rn;
        btn.onclick = () => joinRoom(rn);
        li.appendChild(btn);
        roomsList.appendChild(li);
      });
    });
  }

  function appendSystem(text, time) {
    const div = document.createElement('div');
    div.className = 'msg system';
    div.textContent = `[${new Date(time).toLocaleTimeString()}] ${text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendMessage({ username: from, message, time }) {
    const mine = from === username;
    const div = document.createElement('div');
    div.className = 'msg ' + (mine ? 'mine' : 'other');
    div.innerHTML = '<div class="meta">' + (mine ? 'Yo' : from) + ' • ' + new Date(time).toLocaleString() + '</div>' +
      '<div class="text">' + escapeHtml(message) + '</div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHtml(s) {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function joinRoom(room) {
    if (!username) return alert('Introduce tu nombre primero.');
    if (currentRoom) {
      socket.emit('leaveRoom', { room: currentRoom, username });
    }
    currentRoom = room;
    roomTitle.textContent = 'Sala: ' + room;
    messages.innerHTML = '';
    socket.emit('joinRoom', { room, username });
    renderScreens();
  }

  function leaveRoom() {
    if (!currentRoom) return;
    socket.emit('leaveRoom', { room: currentRoom, username });
    currentRoom = null;
    renderScreens();
  }

  enterBtn.addEventListener('click', () => {
    const val = nameInput.value.trim();
    if (!val) return alert('Escribe un nombre.');
    username = val;
    sessionStorage.setItem('chat_username', username);
    nameInput.value = '';
    loadRooms();
    renderScreens();
  });



  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text || !currentRoom) return;
    socket.emit('sendMessage', { room: currentRoom, username, message: text });
    messageInput.value = '';
  });

  leaveRoomBtn.addEventListener('click', () => {
    leaveRoom();
  });

  logoutBtn.addEventListener('click', () => {
    if (currentRoom) socket.emit('leaveRoom', { room: currentRoom, username });
    sessionStorage.removeItem('chat_username');
    username = '';
    currentRoom = null;
    renderScreens();
  });

  socket.on('systemMessage', (data) => {
    appendSystem(data.text, data.time);
  });

    socket.on('chatMessage', (data) => {
    appendMessage(data);
  });


  // init UI state
  if (username) {
    loadRooms();
  }
  renderScreens();
})();
