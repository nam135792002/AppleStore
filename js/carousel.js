var imgFeature = document.querySelector('.img-feature');
var listImg = document.querySelectorAll('.list-image img');
var preBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
var positionIndicator = document.querySelector('.content-carousel span');

var currentIndexTmp = 0;
var visibleImagesCount = 7; // Number of images to display around the current index

function updateImageByIndex(index) {
    document.querySelectorAll('.list-image div').forEach(item => {
        item.classList.remove('active');
    });

    currentIndexTmp = index;
    imgFeature.src = listImg[index].getAttribute('src');
    listImg[index].parentElement.classList.add('active');

    // Update position indicator
    positionIndicator.textContent = `Hình số ${index + 1} trên ${listImg.length}`;

    // Calculate the range of visible images
    var startIndex = Math.max(0, Math.min(index - Math.floor(visibleImagesCount / 2), listImg.length - visibleImagesCount));
    var endIndex = Math.min(listImg.length - 1, startIndex + visibleImagesCount - 1);

    // Show only the visible images and adjust opacity
    listImg.forEach((imgElement, i) => {
        var parentElement = imgElement.parentElement;
        if (i >= startIndex && i <= endIndex) {
            parentElement.style.display = 'block';
            parentElement.style.opacity = i === index ? '1' : '0.5'; // Adjust opacity for selected and unselected images
        } else {
            parentElement.style.display = 'none';
        }
    });
}


listImg.forEach((imgElement, index) => {
    imgElement.addEventListener('click', e => {
        imgFeature.style.opacity = '0';
        setTimeout(() => {
            updateImageByIndex(index);
            imgFeature.style.opacity = '1';
        }, 400);
    });
});

preBtn.addEventListener('click', e => {
    if (currentIndexTmp == 0) {
        currentIndexTmp = listImg.length - 1;
    } else {
        currentIndexTmp--;
    }
    imgFeature.style.animation = '';
    setTimeout(() => {
        updateImageByIndex(currentIndexTmp);
        imgFeature.style.animation = 'slideLeft 1s ease-in-out forwards';
    }, 200);
});

nextBtn.addEventListener('click', e => {
    if (currentIndexTmp == listImg.length - 1) {
        currentIndexTmp = 0;
    } else {
        currentIndexTmp++;
    }
    imgFeature.style.animation = '';
    setTimeout(() => {
        updateImageByIndex(currentIndexTmp);
        imgFeature.style.animation = 'slideRight 1s ease-in-out forwards';
    }, 200);
});

updateImageByIndex(0);
