const products = [
	{
		id: 1,
		name: "MacBook Air 13 inch với chip M1",
		category: "Macbook",
		price: 25440000,
		img: "../images/product/mac6.jpg",
		url: "../NOIDUNG/product_detail.html",
	},
	{
		id: 2,
		name: "iPhone 15 Pro Max 256GB",
		category: "iPhone",
		price: 33990000,
		img: "../images/product/iPhone4.jpg",
		url: "../NOIDUNG/iphoneDetail.html",
	},
	{
		id: 3,
		name: "Apple Watch Ultra 4K 2MCK LTE 49mm",
		category: "Apple Watch",
		price: 21990000,
		img: "../images/product/watch1.jpg",
		url: "../NOIDUNG/watchDetail.html",
	},
	{
		id: 4,
		name: "iPad 9 WiFi",
		category: "iPad",
		price: 7490000,
		img: "../images/product/iPad2.jpg",
		url: "../NOIDUNG/ipadDetail.html",
	},
	{
		id: 5,
		name: "Tai nghe Bluetooth AirPods Pro Gen 2 MagSafe Charge",
		category: "AirPods",
		price: 6200000,
		img: "../images/product/pods1.jpg",
		url: "../NOIDUNG/airPods.html",
	},
	{
		id: 6,
		name: "Bút cảm ứng Apple Pencil Gen 2.0 MK0C2",
		category: "Phụ kiện Apple",
		price: 2890000,
		img: "../images/product/apple1.jpeg",
		url: "../NOIDUNG/phuKienDetail.html",
	},
	{
		id: 7,
		name: "MacBook Air 13 inch với chip M2",
		category: "Macbook",
		price: 26990000,
		img: "../images/productDetail/macbook/mac8.jpg",
		url: "../NOIDUNG/macbook2.html",
	},
	{
		id: 8,
		name: "iPhone 14 Pro",
		category: "iPhone",
		price: 24190000,
		img: "../images/productDetail/iphone/iphoneDetail2/iPhone.jpg",
		url: "../NOIDUNG/iphoneDetail2.html",
	},
	{
		id: 9,
		name: "Apple Watch S9 GPS 41mm",
		category: "Apple Watch",
		price: 10490000,
		img: "../images/productDetail/watch/watch2/watch2.jpg",
		url: "../NOIDUNG/watchDetail2.html",
	},
	{
		id: 10,
		name: "Tai nghe Bluetooth AirPods 3 Lightning Charge Apple MPNY3",
		category: "AirPods",
		price: 4090000,
		img: "../images/productDetail/airPod/airPod2/pods2.jpg",
		url: "../NOIDUNG/airPods2.html",
	},
    {
		id: 11,
		name: "iPad Air 5 M1 WiFi 64GB",
		category: "iPad",
		price: 14590000,
		img: "../images/productDetail/ipad/ipad2/iPad2.jpg",
		url: "../NOIDUNG/ipadDetail2.html",
	},
    {
		id: 12,
		name: "Bao da bàn phím Smart Keyboard Folio 2 iPad Pro 11",
		category: "Phụ kiện Apple",
		price: 4665000,
		img: "../images/productDetail/phuKien/phuKien2/apple2.jpg",
		url: "../NOIDUNG/phuKienDetail2.html",
	}
];

// variable global
let table = document.getElementById("customers");
let tbody = table.getElementsByTagName("tbody")[0];

// render table
function render(products) {
	tbody.innerHTML = "";
	products.map((product) => {
		let row = document.createElement("tr");
		row.innerHTML = `<tr id="${product.id}">
            <td><input type="checkbox" name="check-item" id="r-${
					product.id
				}"></td>
			<td><img data-id="${product.id}" class="product-image"  src="${
			product.img
		}" alt="${product.name}" width="100">
		<div id="myModal-${product.id}" class="modal">
  				<span class="close">&times;</span>
  				<img class="modal-content" id="img01-${product.id}">
			</div></td>
            <td><a href=${product.url}>${product.name}</a></td>
            <td>${product.category}</td>
            <td>${product.price.toLocaleString("vi-en")}đ</td>
            <td><input type="number" value="0" disabled name="n-${
					product.id
				}" id="n-${product.id}"></td>
            <td name="total-product" id="total-${product.id}"></td>
         </tr>`;
		tbody.appendChild(row);

		// Thêm sự kiện onchange vào trường input quantity
		const inputQuantity = row.querySelector(`#n-${product.id}`);
		inputQuantity.addEventListener("change", (e) => {
			if (e.target.value > 0) {
				handleChangeQuantity(e.target.value, product.price, product.id);
			} else {
				inputQuantity.value = 1;
				handleChangeQuantity(1, product.price, product.id);
			}
		});
	});
}

// Price format (1.000.000 => 1000000)
function priceFormat(price) {
	return parseFloat(price.replace(/\.|đ/g, ''));
}

// Handle checkboxes
function hanldeCheckboxesChange(checkbox) {
	const row = checkbox.closest("tr");
	const inputQuantity = row.querySelector("td:nth-child(6) input");
	const totalPrice = row.querySelector("td:nth-child(7)");
	const price = row.querySelector("td:nth-child(5)").textContent;
	if (checkbox.checked) {
		inputQuantity.disabled = false;
		inputQuantity.value = 1;
		totalPrice.innerHTML = priceFormat(price).toLocaleString("vi-en") + 'đ';
		handleTotalPrice();
	} else {
		inputQuantity.disabled = true;
		inputQuantity.value = 0;
		totalPrice.innerHTML = "";
		handleTotalPrice();
	}
}

// Handle checkbox all
function handleCheckboxAllChange(checkboxAll, checkboxesElementItems) {
	let isChecked = checkboxAll.checked;
	checkboxesElementItems.forEach((checkbox) => {
		checkbox.checked = isChecked;
		hanldeCheckboxesChange(checkbox);
	});
}

// Handle input quantity
function handleChangeQuantity(quantity, price, id) {
	let totalElement = document.getElementById(`total-${id}`);
	totalElement.innerText = (quantity * price).toLocaleString("vi-en") + 'đ';
	handleTotalPrice();
}

// Handle total price
function handleTotalPrice() {
	const totalProductElements = document.querySelectorAll(
		'td[name="total-product"]'
	);

	const totalPriceElement = document.getElementById("total-price");
	let totalPrice = 0;
	totalProductElements.forEach((totalProductElement) => {
		const value = totalProductElement.textContent;
		if (value !== "") {
            // alert(priceFormat(value))
			totalPrice += priceFormat(value);
		}
	});
	totalPriceElement.innerHTML = totalPrice.toLocaleString("vi-en")+ 'đ';
}

// Handle select
function handleChangeSelect(selectElement) {
	const selectedValue = selectElement.value;
	if (selectedValue === "0") {
		table.style.display = "none";
	} else {
		document.getElementById("check-all").checked = false;
		document.getElementById("total-price").innerText = "";
		table.style.display = "block";
	}
	let newProducts = [];
	if (selectedValue === "1") {
		newProducts = products.filter(
			(p) => p.price >= 1000000 && p.price <= 10000000
		);
	} else if (selectedValue === "2") {
		newProducts = products.filter(
			(p) => p.price >= 10000000 && p.price <= 20000000
		);
	} else if (selectedValue === "3") {
		newProducts = products.filter(
			(p) => p.price >= 20000000 && p.price <= 30000000
		);
    } else if (selectedValue === "4") {
		newProducts = products.filter((p) => p.price > 30000000);
	} else if (selectedValue === "5") {
		newProducts = products.sort((p1, p2) => p1.price - p2.price);
	} else if (selectedValue === "6") {
		newProducts = products.sort((p1, p2) => p2.price - p1.price);
	}

	// In sản phẩm ra table
	render(newProducts);

	// Logic checkbox item
	let checkboxesElementItems = document.querySelectorAll(
		'input[name="check-item"]'
	);
	checkboxesElementItems.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			hanldeCheckboxesChange(checkbox);
		});
	});

	// Logic checkbox all
	let checkboxAll = document.getElementById("check-all");
	checkboxAll.addEventListener("change", () => {
		handleCheckboxAllChange(checkboxAll, checkboxesElementItems);
	});

	// Lấy danh sách tất cả các hình ảnh sản phẩm
	const productImages = document.querySelectorAll(".product-image");

	productImages.forEach((img) => {
		img.addEventListener("click", function (e) {
			const productId = this.getAttribute("data-id");
			const modal = document.getElementById(`myModal-${productId}`);
			const modalImg = document.getElementById(`img01-${productId}`);
			modal.style.display = "block";
			modalImg.src = this.src;

			modal.addEventListener("click", () => {
				modal.style.display = "none";
			});
		});
	});

	// Xử lý đóng modal khi click vào nút đóng (x)
	const closeButtons = document.querySelectorAll(".close");
	closeButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const modal = this.parentElement;
			modal.style.display = "none";
		});
	});
}

var listProduct = document.querySelector('.list-product');
listProduct.innerHTML = '';

// Assuming `products` is an array of product objects as in your previous examples

products.forEach(item => {
    var newProduct = document.createElement('div');
    newProduct.classList.add('one-product');
    newProduct.innerHTML = `
        <img src="${item.img}" alt="">
        <div class="info">
            <div class="info-name">
                ${item.name}
            </div>
			<div class="info-id" style="display: none;">
                ${item.id}
            </div>
            <div class="info-price">
                ${item.price.toLocaleString('vi-VN')}đ
            </div>
        </div>
    `;
    listProduct.appendChild(newProduct);
	newProduct.addEventListener('click', function () {
        // Retrieve and log the id when the item is clicked
        const infoIdDiv = this.querySelector('.info-id');
        const productId = infoIdDiv.innerText;
        let newProducts = [];
		newProducts = products.filter((p) => p.id == productId)
		document.getElementById("check-all").checked = false;
		document.getElementById("total-price").innerText = "";
		table.style.display = "block";
		render(newProducts);
		console.log(newProducts);
		let checkboxesElementItems = document.querySelectorAll(
			'input[name="check-item"]'
		);
		checkboxesElementItems.forEach((checkbox) => {
			checkbox.addEventListener("change", () => {
				hanldeCheckboxesChange(checkbox);
			});
		});
	
		// Logic checkbox all
		let checkboxAll = document.getElementById("check-all");
		checkboxAll.addEventListener("change", () => {
			handleCheckboxAllChange(checkboxAll, checkboxesElementItems);
		});
	
		// Lấy danh sách tất cả các hình ảnh sản phẩm
		const productImages = document.querySelectorAll(".product-image");
	
		productImages.forEach((img) => {
			img.addEventListener("click", function (e) {
				const productId = this.getAttribute("data-id");
				const modal = document.getElementById(`myModal-${productId}`);
				const modalImg = document.getElementById(`img01-${productId}`);
				modal.style.display = "block";
				modalImg.src = this.src;
	
				modal.addEventListener("click", () => {
					modal.style.display = "none";
				});
			});
		});
	
		// Xử lý đóng modal khi click vào nút đóng (x)
		const closeButtons = document.querySelectorAll(".close");
		closeButtons.forEach((button) => {
			button.addEventListener("click", function () {
				const modal = this.parentElement;
				modal.style.display = "none";
			});
		});
    });
});

var searchProduct = document.querySelector('.search input');

searchProduct.addEventListener('input', function (e) {
    let txtSearch = e.target.value.trim().toLowerCase();
    let listProductDOM = document.querySelectorAll('.one-product');

    if (txtSearch === '') {
        listProduct.style.display = 'none';
    } else {
        listProduct.style.display = 'block';
        listProductDOM.forEach(item => {
            let productText = item.querySelector('.info-name').innerText.toLowerCase();

            if (productText.includes(txtSearch)) {
                item.classList.remove('hide');
				
            } else {
                item.classList.add('hide');
            }
        });
    }
});

// Initial check when the page loads
if (searchProduct.value.trim() === '') {
    listProduct.style.display = 'none';
}