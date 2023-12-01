window.onload = function(){
    const dataFromLocalStorage = localStorage.getItem('cart')
    const dataContainer = document.querySelector('.cart-items-container');
    console.log(dataFromLocalStorage);

    if (dataFromLocalStorage) {
        const cartData = JSON.parse(dataFromLocalStorage);
        cartData.forEach(cartItem => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            // You may customize this part based on your cart item structure
            cartItemElement.innerHTML = `
                <p>Product ID: ${cartItem.product_id}, Quantity: ${cartItem.quantity}</p>
            `;

            dataContainer.appendChild(cartItemElement);
        })
    }
}