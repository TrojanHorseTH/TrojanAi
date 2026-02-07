async function sendMessage() {
    const inputBox = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = inputBox.value;
    if (!message) return;

    // Show user message
    chatBox.innerHTML += `<p class="user">${message}</p>`;
    inputBox.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch("https://your-serverless-function-url.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        chatBox.innerHTML += `<p class="bot">${data.reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
        chatBox.innerHTML += `<p class="bot">Error: Could not connect to AI</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
