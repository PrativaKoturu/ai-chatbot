const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultDiv = document.getElementById('result');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    resultDiv.innerHTML = 'You Said: ' + transcript + '<br><br>'; 

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: transcript })
        });
        const data = await response.json();
        const botResponse = data.response;

        resultDiv.innerHTML += 'Bot: ' + botResponse;

        const utterance = new SpeechSynthesisUtterance(botResponse);
        
        // Add debugging information
        utterance.onstart = () => console.log('Speech synthesis started');
        utterance.onend = () => console.log('Speech synthesis ended');
        utterance.onerror = (event) => console.error('Speech synthesis error:', event.error);

        // Speak the response
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('Error:', error);
    }
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

startBtn.addEventListener('click', () => {
    recognition.start();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
});
