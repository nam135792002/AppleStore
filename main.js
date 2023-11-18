const selectElement = (element) => document.querySelector(element);
// tạo hàm chọn để kích hoạt thanh mobile 

selectElement('.mobile-menu').addEventListener('click', () => {
    selectElement('header').classList.toggle('active');
});

let thumbnails = document.getElementsByClassName('thumbnail');
let activeImages = document.getElementsByClassName('active');
let currentIndex = 0;

for (var i=0; i < thumbnails.length; i++){
    thumbnails[i].addEventListener('mouseover', function(){
        if (activeImages.length > 0){
            activeImages[0].classList.remove('active');
        }
        this.classList.add('active');
        document.getElementById('mainImage').src = this.src;
        currentIndex = Array.from(thumbnails).findIndex(thumbnail => thumbnail.classList.contains('active'));
        document.getElementById('imageIndex').innerText = `Image ${currentIndex + 1} of ${thumbnails.length}`;
    });

}

let buttonRight = document.getElementById('slideRight');
let buttonLeft = document.getElementById('slideLeft');

buttonLeft.addEventListener('click', function(){
    currentIndex = (currentIndex === 0) ? thumbnails.length - 1 : currentIndex - 1;
    let prevImage = thumbnails[currentIndex];
    if (activeImages.length > 0){
        activeImages[0].classList.remove('active');
    }
    prevImage.classList.add('active');
    document.getElementById('mainImage').src = prevImage.src;
    document.getElementById('slider').scrollLeft = prevImage.parentElement.offsetLeft - prevImage.offsetWidth;
    document.getElementById('imageIndex').innerText = `Image ${currentIndex + 1} of ${thumbnails.length}`;
});

buttonRight.addEventListener('click', function(){
    currentIndex = (currentIndex === thumbnails.length - 1) ? 0 : currentIndex + 1;
    let nextImage = thumbnails[currentIndex];
    if (activeImages.length > 0){
        activeImages[0].classList.remove('active');
    }
    nextImage.classList.add('active');
    document.getElementById('mainImage').src = nextImage.src;
    document.getElementById('slider').scrollLeft = nextImage.parentElement.offsetLeft - nextImage.offsetWidth;
    document.getElementById('imageIndex').innerText = `Image ${currentIndex + 1} of ${thumbnails.length}`;
});

document.addEventListener('DOMContentLoaded', function() {
    let thumbnails = document.getElementsByClassName('thumbnail');
    let activeImages = document.getElementsByClassName('active');
    let currentIndex = 1;

    // Add this part to update the position when the page is loaded
    if (activeImages.length > 0){
        currentIndex = Array.from(thumbnails).findIndex(thumbnail => thumbnail.classList.contains('active')) + 1;
        document.getElementById('imageIndex').innerText = `Image ${currentIndex} of ${thumbnails.length}`;
    }

});

let mainImageGroup = document.querySelector('.main-img-group');

mainImageGroup.addEventListener('mouseover', function(){
    document.getElementById('slideLeft').style.display = 'block';
    document.getElementById('slideRight').style.display = 'block';
});

mainImageGroup.addEventListener('mouseout', function(){
    document.getElementById('slideLeft').style.display = 'none';
    document.getElementById('slideRight').style.display = 'none';
});

var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('mainImage');
var modalImg = document.getElementById("img01");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}