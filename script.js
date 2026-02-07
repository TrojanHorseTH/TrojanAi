const API_URL = "https://your-serverless-function-url.com/chat"; // Replace with your deployed serverless API

async function sendMessage() {
    const inputBox = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = inputBox.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<p class="user">${message}</p>`;
    inputBox.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const typingBubble = document.createElement("p");
    typingBubble.className = "bot typing";
    typingBubble.textContent = "AI is typing...";
    chatBox.appendChild(typingBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        typingBubble.classList.remove("typing");
        typingBubble.textContent = data.reply;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        typingBubble.classList.remove("typing");
        typingBubble.textContent = "Error: Could not connect to AI";
    }
}
