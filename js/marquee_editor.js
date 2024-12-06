function saveMarqueeData() {
    const newText = document.getElementById('newMarqueeText').value;

    // 使用 Fetch API 寫入文字檔
fetch('../data/marquee_table_number.txt', {
method: 'POST',
body: newText
})
.then(response => {
    if (!response.ok) {
        throw new Error('無法儲存資料');
    }
    alert('儲存成功！');
})
.catch(error => {
    console.error('儲存失敗:', error);
    alert('儲存失敗，請稍後再試');
});
}