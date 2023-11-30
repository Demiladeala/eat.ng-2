// JavaScript to toggle the cart
$(document).ready(function () {
    $('.side-cart').on('click', function () {
        $('#customOffcanvas, .overlay').toggleClass('show');
    });
});

// JavaScript to close the cart
function closeCustomOffcanvas() {
    $('#customOffcanvas, .overlay').removeClass('show');
}
// When the window y scroll > 32, add a class to the <a> tag in <li> with class "quote-button"
var getQuoteButton = document.querySelector('.quote-btn a');

if (getQuoteButton) {
    window.addEventListener("scroll", function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > 32) {
            getQuoteButton.id = "home-quote-btn-color";
        } else {
            getQuoteButton.removeAttribute("id");
        }
    });
}
//GET LANDING PAGE MENU PRODUCTS

let listProductHTML = document.querySelector('.menu-flex');
let listCartHTML = document.querySelector(".cart-items-container");
let iconCartSpan = document.querySelector(".cart-icon span")
let listProducts = [];
let carts = [];

const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    listProductHTML.classList.add("col-2")
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.dataset.id = product.id;
            newProduct.classList.add("item-single");
            newProduct.classList.add("pf-item");
                if (product.category && Array.isArray(product.category)) {
                    product.category.forEach(category => {
                        newProduct.classList.add(category.toLowerCase());
                    });
                }
            newProduct.innerHTML = `
            <div class="item">
                <div class="thumb">
                    <img src=${product.image} alt="Thumb">
                    <h5>₦${product.price}</h5>
                </div>
                <div class="info">
                    <h4>${product.name}</h4>
                    <p>
                        ${product.description}
                    </p>
                    <span class="Add-To-Cart">Add to Cart</span>
                </div>
            </div>
            `
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('Add-To-Cart')){
        let product_id = positionClick.closest('.item-single').dataset.id;
        addToCart(product_id);
    }else{

    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <=0) {
        carts = [{
            product_id:product_id,
            quantity:1
        }]
    }else if (positionThisProductInCart < 0){
        carts.push({
            product_id:product_id,
            quantity:1
        })
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const calculateTotalPrice = () => {
    let totalPrice = 0;
    carts.forEach(cart => {
        let positionProduct = listProducts.findIndex(product => product.id == cart.product_id);
        let info = listProducts[positionProduct];
        totalPrice += info.price * cart.quantity;
    });
    return totalPrice;
}


const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('ct-items');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            totalPrice += info.price * cart.quantity;

            newCart.innerHTML = `
            <div class="cart-items">
                <div class="item-Image-desc-price-container">
                    <img src=${info.image}>
                    <div class="item-desc-price-container">
                        <p>${info.name}</p>
                        <h4>₦${info.price * cart.quantity}</h4>
                    </div>
                </div>
                <div class="item-add-itemPrice-reduce-remove-container">
                    <div class="item-add-itemPrice-reduce-container">
                        <i style="cursor: pointer;" class="bi bi-dash-lg minus"></i>
                        <h4>${cart.quantity}</h4>
                        <i style="cursor: pointer;" class="bi bi-plus-lg plus"></i>
                    </div> 
                    <div class="item-remove-container">
                        <i style="cursor: pointer; color:#ef4444;" class="bi bi-trash trash"></i>
                    </div>
                </div>
            </div>

            <div class="items-button-container">
                <button>Proceed to Checkout</button>
                <button class="cancel-button" onclick="clearOrders()">Clear Orders</button>
            </div>
            `
            listCartHTML.appendChild(newCart);
        })

        let totalContainer = document.createElement('div');
        totalContainer.classList.add('total-container');
        totalContainer.innerHTML = `
            <div class="total-price">
                <p>Total</p>
                <h4>₦${totalPrice.toFixed(2)}</h4>
            </div>
        `;
        listCartHTML.appendChild(totalContainer);
    }
    if(carts.length <= 0){
        let newCart = document.createElement('div');
            newCart.innerHTML = `
            <div style="display: flex; justify-content:center; align-items:center">
                <img src="assets/img/cart-empty.png" alt="">
            </div>
            <p style="text-align: center;">Your cart is empty! <br>Add items to get started</p>
        `
        listCartHTML.appendChild(newCart);
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.closest('.ct-items').dataset.id;
        console.log(product_id)
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = carts[positionItemInCart];
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = carts[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    carts[positionItemInCart].quantity = changeQuantity;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        // ... (existing code)
    } else if (positionClick.classList.contains('trash')) {
        let product_id = positionClick.closest('.ct-items').dataset.id;
        removeItemFromCart(product_id);
    }
});

const removeItemFromCart = (product_id) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        carts.splice(positionItemInCart, 1);
        addCartToHTML();
        addCartToMemory();
    }
}


const clearOrders = () => {
    carts = [];
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    fetch('specials.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();
