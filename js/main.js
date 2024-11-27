
$(document).ready(function(){
    $('.slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay : true,
        arrows: true,
        prevArrow: '.prev',
        nextArrow: '.next',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
});








let toTop = document.querySelector('.to-top');
let toggleBar = document.querySelector('nav .top-nav .fa-bars');
let toggleMenue = document.querySelector('nav .down-nav ul');
let cartItem = document.querySelector('.cart');
let openCart = document.querySelector(' i.fa-cart-shopping');
let closeCart = document.querySelector('i.fa-circle-xmark');
let productCards = document.querySelector('.all-products .container .cards');
let cardsCart = document.querySelector('.cards-cart');
let amount = document.querySelector('.amount');
let totalPrice = document.querySelector('.total-price');
// let priceValue = document.querySelector('.price-value');






window.onscroll = function(){
    if(window.scrollY > 400){
        toTop.style.display = 'flex';
    }else{
        toTop.style.display = 'none';
    }
    
}

toTop.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}




toggleBar.onclick = function(){
    this.classList.toggle('active');
    toggleMenue.classList.toggle('open');
}


openCart.onclick = function(){
    cartItem.classList.add('open-cart')
}

closeCart.onclick = function(){
    cartItem.classList.remove('open-cart')
}





var products = [
    {
        id: 1,
        img: 'images/straw.png',
        name: 'ice strow',
        price: 83,
    },
    {
        id: 2,
        img: 'images/donut-transparent.png',
        name: 'donut',
        price: 84,
    },
    {
        id: 3,
        img: 'images/yogurt.png',
        name: 'Yogurt',
        price: 91,
    },
    {
        id: 4,
        img: 'images/icone.png',
        name: 'Fresh vagies',
        price: 73,
    },
    {
        id: 5,
        img: 'images/plate-2.png',
        name: 'Cottage dish',
        price: 120,
    },
    {
        id: 6,
        img: 'images/salad-table.jpg',
        name: 'paradise salad',
        price: 60,
    },
    {
        id: 7,
        img: 'images/plate-3.png',
        name: 'greek salad',
        price: 68,
    },
    {
        id: 8,
        img: 'images/food-table.jpg',
        name: 'dinner time',
        price: 99,
    },
    {
        id: 9,
        img: 'images/jars.jpg',
        name: 'after dinner',
        price: 85,
    },
    {
        id: 10,
        img: 'images/plate-1.png',
        name: 'summer salad',
        price: 40,
    },
    {
        id: 11,
        img: 'images/cupcake.png',
        name: 'cup cake',
        price: 110,
    },
    {
        id: 12,
        img: 'images/coffee.jpg',
        name: 'coffe time',
        price: 53,
    },
];





var cart //undefind
if(localStorage.getItem('cart') == null){
    cart = [];
}else{
    cart = JSON.parse(localStorage.getItem('cart'));
}

function addToCart(index) {
    // تحقق إذا المنتج موجود بالفعل في السلة
    let productIndex = cart.findIndex(function(item) {
        return item.id === products[index].id;
    });

    if (productIndex !== -1) {
        cart[productIndex].quantity++; // زيادة الكمية لو المنتج موجود
    } else {
        let product = Object.assign({}, products[index], { quantity: 1 }); // إضافة المنتج مع خاصية الكمية
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    displayProducts();
}


function displayProducts() {
    var items = ''; // هنا هنضيف كل المنتجات اللي في السلة
    let total = 0; // إجمالي السعر

    // نلف على المنتجات اللي في السلة
    for (var i = 0; i < cart.length; i++) {
        var value = cart[i];

        // نحسب الإجمالي
        total += value.price * value.quantity;

        // نضيف الـ HTML لكل منتج
        items += `
            <div class="card">
                <div class="details">
                    <img src="${value.img}" alt="">
                    <div>
                        <p>${value.name}</p>
                        <p>$${value.price}.00  x${value.quantity}</p>
                    </div>
                </div>
                <div class="counter">
                    <button onclick="increaseQuantity(${i})">+</button>
                    <span>${value.quantity}</span>
                    <button onclick="decreaseQuantity(${i})">-</button>
                    <i onclick="deleteProduct(${i})" class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;
    }

    // تحديث عدد المنتجات والإجمالي
    amount.innerHTML = cart.length;
    totalPrice.innerHTML = `$${total}.00`;

    // عرض المنتجات في السلة
    if (cart.length > 0) {
        cardsCart.innerHTML = items;
        amount.style.color = 'var(--main-color)';
        totalPrice.style.color = 'rgb(0, 248, 0)';
    } else {
        cardsCart.innerHTML = 'cart is empty...';
        cardsCart.style.textAlign = 'center';
        cardsCart.style.fontWeight = '500';
        cardsCart.style.textTransform = 'Capitalize';
        cardsCart.style.fontStyle = 'italic';
        cardsCart.style.letterSpacing = '1px';
        cardsCart.style.color = 'var(--main-color)';
        cardsCart.style.fontSize = '14px';

        amount.style.color = 'red';
        totalPrice.style.color = '#eee';
    }
}
displayProducts()



function deleteProduct(e){
    
    cart.splice(e, 1)
    localStorage.setItem('cart', JSON.stringify(cart)); // تحديث اللوكل ستورج
    displayProducts()
}






function increaseQuantity(index) {
    cart[index].quantity++; // زود الكمية
    localStorage.setItem('cart', JSON.stringify(cart)); // تحديث اللوكل ستورج
    displayProducts(); // حدّث العرض
}










function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--; // قلل الكمية
    } else {
        deleteProduct(index); // احذف المنتج لو الكمية وصلت 0
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // تحديث اللوكل ستورج
    displayProducts(); // حدّث العرض
}








