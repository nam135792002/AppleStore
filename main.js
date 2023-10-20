const selectElement = (element) => document.querySelector(element);
// tạo hàm chọn để kích hoạt thanh mobile 

selectElement('.mobile-menu').addEventListener('click', () => {
    selectElement('header').classList.toggle('active');
});