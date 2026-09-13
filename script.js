document.addEventListener('DOMContentLoaded', () => {
    // Taymer vaqti
    const startDate = new Date(2025, 8, 1, 9, 0); 

    function updateTimer() {
        const now = new Date();
        const difference = now - startDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Tugmalar: har birini alohida ochish/yashirish
    const extraBtn = document.getElementById('extraBtn');
    const extraText = document.getElementById('extraText');
    const extraBtn2 = document.getElementById('extraBtn2');
    const extraText2 = document.getElementById('extraText2');
    const extraBtn3 = document.getElementById('extraBtn3');
    const extraText3 = document.getElementById('extraText3');

    const toggleMessage = (button, panel, panels) => {
        if (!button || !panel) return;

        button.addEventListener('click', () => {
            const shouldShow = panel.style.display !== 'block';

            panels.forEach(item => {
                if (item) item.style.display = 'none';
            });

            panel.style.display = shouldShow ? 'block' : 'none';
        });
    };

    toggleMessage(extraBtn, extraText, [extraText2, extraText3]);
    toggleMessage(extraBtn2, extraText2, [extraText, extraText3]);
    toggleMessage(extraBtn3, extraText3, [extraText, extraText2]);

    // Telegram Bot sozlamalari
    const BOT_TOKEN = "8950888504:AAHFfJgLXi6D36HN3ExgYuAGWr3VAQgY7k8";
    const CHAT_ID = "7606110677"; 

    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    function sendMessage() {
        const messageInput = document.getElementById('userMessage');
        const statusDiv = document.getElementById('status');
        const text = messageInput.value.trim();

        if (text === "") {
            alert("Iltimos, biror narsa yozing!");
            return;
        }

        statusDiv.style.color = "#6c757d";
        statusDiv.innerText = "Yuborilmoqda...";

        const fullText = `💌 Mohinurdan javob keldi:\n\n"${text}"`;
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: fullText
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                statusDiv.style.color = "#28a745";
                statusDiv.innerText = "Xabaringiz yetkazildi! Rahmat ❤️";
                messageInput.value = "";
            } else {
                statusDiv.style.color = "#dc3545";
                statusDiv.innerText = "Xatolik yuz berdi. Bot sozlamalarini tekshiring.";
            }
        })
        .catch(() => {
            statusDiv.style.color = "#dc3545";
            statusDiv.innerText = "Internet bilan bog'liq xatolik.";
        });
    }

    // Fondagi suzuvchi yurakchalar
    function createHearts() {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerText = ['❤️', '💖', '💗', '💘'][Math.floor(Math.random() * 4)];
        heart.style.left = (Math.random() * 100) + 'vw';
        heart.style.setProperty('--drift-x', (Math.random() * 180 - 90) + 'px');
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 12 + 16) + 'px';
        heart.style.filter = 'drop-shadow(0 0 6px rgba(255, 105, 180, 0.6))';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);
    }
    setInterval(createHearts, 350);
});