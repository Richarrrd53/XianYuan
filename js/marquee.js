const marqueeContent = this.document.getElementById('marquee-content');
let messages = [
"歡迎光臨仙園海鮮餐廳！" // 預設第一則消息
];
let currentIndex = 0;

async function updateMarquee() {
    // 嘗試讀取文字檔
    try {
        const baseUrl = window.location.origin;
        const response = fetch('../data/marquee_table_number.txt', {method: 'POST'});
        const text = await response.text();
        const newMessages = text.target.result.split('\n').filter(line => line.trim() !== '');
        messages = messages.concat(newMessages);
        // 清空跑馬燈內容
        marqueeContent.innerHTML = '';
        messages.forEach(message => {
            const item = document.createElement('div');
            item.className = 'marquee-item';
            item.textContent = message;
            marqueeContent.appendChild(item);
        });
    }
    catch (error) {
        console.error('無法讀取文字檔:', error);
        // 可以在此處顯示錯誤訊息或預設內容
    }
}

function slideToNext() {
    if (messages.length > 0) {
        currentIndex = (currentIndex + 1) % messages.length;
        const translateY = -currentIndex * 150; // 每條消息高度 150px
        marqueeContent.style.transform = `translateY(${translateY}px)`;
    }
}

// 初始化跑馬燈內容
updateMarquee();

// 每 5 秒切換一次消息
setInterval(slideToNext, 5000);
setInterval(updateMarquee(), 5000);


// 處理檔案讀取
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // 將檔案內容按行分割，排除空行並附加到 messages 中
            const newMessages = e.target.result.split('\n').filter(line => line.trim() !== '');
            messages = messages.concat(newMessages); // 保留原本訊息，附加新內容
            updateMarquee(); // 更新跑馬燈內容
        };
        reader.readAsText(file);
    }
});