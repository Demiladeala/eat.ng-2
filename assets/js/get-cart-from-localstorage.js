//GET LANDING PAGE MENU PRODUCTS

let listProductHTML = document.querySelector('.menu-flex');
let listCartHTML = document.querySelector(".cart-items-container");
let iconCartSpan = document.querySelector(".cart-icon span");
let cartIcon = document.querySelector(".cart-icon");
let listProducts = [];
let carts = [];


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

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.innerHTML = `
        <div class="items-button-container">
            <button>Proceed to Checkout</button>
            <button class="cancel-button" onclick="clearOrders()">Clear Orders</button>
        </div>
        `;
        listCartHTML.appendChild(buttonContainer);
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
    getCartFromLocalStorage();
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
        getCartFromLocalStorage();
    }
}


const clearOrders = () => {
    carts = [];
    addCartToHTML();
    addCartToMemory();
}

const getCartFromLocalStorage = () => {
    // listCartHTML.innerHTML = "";
    let totalItemQuantity = 0;
    // get from local storage 
    const cartJSON = localStorage.getItem('cart');
    if(cartJSON){
        const cart = JSON.parse(cartJSON);
        console.log(cart);
        const totalQuantity = cart.reduce((sum, cart) => sum + cart.quantity, 0);
        updateCartIconVisibility(totalQuantity);
        console.log(totalQuantity);
        iconCartSpan.innerText = totalQuantity;
        if(cart.length > 0) {
            totalItemQuantity = totalItemQuantity + cart.quantity;
        }
    }
}

const updateCartIconVisibility = (totalQuantity) => {
    if (totalQuantity <= 0) {
        cartIcon.style.display = 'none'; // Show the cart-icon
    } else {
        cartIcon.style.display = 'flex'; // Hide the cart-icon
    }
}

const initApp = () => {
    fetch('specials.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
            getCartFromLocalStorage();
        }
    })
}
initApp();
