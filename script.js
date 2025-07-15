// 🧠 Sameer AI MEERUT Chatbot - Frontend Script

const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

// ✅ Send message to backend
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage('You', message);
  userInput.value = '';
  userInput.disabled = true;

  try {
    const response = await fetch('https://your-backend-url.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();
    appendMessage('AI', data.reply || '❌ No response');

  } catch (error) {
    appendMessage('AI', '⚠️ Error: API not reachable');
    console.error(error);
  }

  userInput.disabled = false;
}

// ✅ Display messages in chat
function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  msgDiv.style.marginBottom = '10px';
  chatLog.appendChild(msgDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}
