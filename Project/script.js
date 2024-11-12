let count = 0;

function addToCart(item) {
    let quantity = 1;
    count++;
    document.getElementById("count").innerHTML = `Your Cart (${count}) `;
    item.querySelector("img").style.border=" 2px solid hsl(14, 86%, 42%)";

    // Create a new quantity  button 
    const newDiv = document.createElement("div");
    newDiv.className = "quantity";
    newDiv.innerHTML = `
        <button class="decrement" onclick="decrement(this)">
        <img src="images/icon-decrement-quantity.svg" alt=""></button>
        <span id="quantity">${quantity}</span>
        <button class="increment" onclick="increment(this)">
        <img src="images/icon-increment-quantity.svg" alt=""></button>`;
    item.appendChild(newDiv);
    
    // Show the cart items and hide the empty cart message
    document.querySelector(".empty-cart").style.display = 'none';
    document.querySelector(".added-items").style.display = 'block';

    // Create a new cart item
    const cartItem = document.createElement("div");
    cartItem.setAttribute("class", "item-cart");
    cartItem.innerHTML = `
        <span class="item-src">${item.querySelector("img").getAttribute("src")}</span>
        <p class="item-name">${item.querySelector(".name").innerHTML}</p>
        <div class="item-info">
            <span class="item-quantity">${quantity}x</span>
            <span class="item-price"><smal>@ </smal>${item.querySelector(".price").innerHTML}</span>
            <span class="item-total"><strong>${item.querySelector(".price").innerHTML}</strong></span>
        </div>
        <button class="delet"><img src="images/icon-remove-item.svg" alt=""></button>`;
        //<button class="delet" onclick="deletItem(this, item)"><img src="images/icon-remove-item.svg" alt=""></button>
        const deleteButton = cartItem.querySelector(".delet");
        deleteButton.addEventListener("click", function() {
            deletItem(this, item);
        });

    // Add the new item to the cart
    const addedItems = document.querySelector(".added-items");
    addedItems.insertBefore(cartItem,addedItems.querySelector(".total-order"));

    // Update the total price
    updateTotalPrice();
}

function updateCartQuantity(button, newQuantity) {
    const itemName = button.parentElement.parentElement.querySelector(".name").innerHTML;
    const cartItems=document.querySelectorAll(".item-cart");
    for(let cartItem of cartItems){
        if (cartItem.querySelector(".item-name").innerHTML === itemName) {
            const quantitySpan = cartItem.querySelector(".item-quantity");
            const totalItem = cartItem.querySelector(".item-total");
            const  price = button.parentElement.parentElement.querySelector(".price").innerHTML.replace(/\$/, '').trim() ;
            quantitySpan.innerHTML = `${newQuantity}x`;
            totalItem.innerHTML = `<strong> $  ${parseFloat(price* newQuantity ).toFixed(2)} </strong> `;   
        }
    }
      
    // Update the total price
    updateTotalPrice();
}

function increment(button) {
    const quantityBtn = button.parentElement.querySelector("#quantity");
    let quantity = parseInt(quantityBtn.innerHTML);
    quantity++;
    quantityBtn.innerHTML = quantity;

    count++;
    document.getElementById("count").innerHTML = `Your Cart (${count})`;

    // Update the cart item quantity
    updateCartQuantity(button, quantity);
}

function decrement(button) {
    const quantityBtn = button.parentElement.querySelector("#quantity");
    let quantity = parseInt(quantityBtn.innerHTML);

    if (quantity > 1) {
        quantity--;
        quantityBtn.innerHTML = quantity;

        count--;
        document.getElementById("count").innerHTML = `Your Cart (${count})`;

        // Update the cart item quantity
        updateCartQuantity(button, quantity);
    }
}

function deletItem(button,item) {
    //remove the item and change the count items
        const cartItem = button.parentElement;
        cartItem.remove();
        item.querySelector("img").style.border=" none";
        const quantity = parseInt(cartItem.querySelector(".item-quantity").innerHTML);
        count -= quantity;
        document.getElementById("count").innerHTML = `Your Cart (${count})`;

    //remove the button quantity 
        item.querySelector(".quantity").remove();
        
    // Show empty cart message if no items remain
        if (count === 0) {
            document.querySelector(".empty-cart").style.display = 'block';
            document.querySelector(".added-items").style.display = 'none';
        }
        updateTotalPrice();
}

function updateTotalPrice() {
    let price,quantity,total = 0;
    const cartItems=document.querySelectorAll(".item-cart");
    for(let cartItem of cartItems){
        price = parseFloat(cartItem.querySelector(".item-price").innerHTML.replace('<smal>@ </smal>$', ''));
        quantity = parseInt(cartItem.querySelector(".item-quantity").innerHTML);
        total += price * quantity;
    }
    document.querySelector(".total").innerHTML = `$${total.toFixed(2)}`;
}


function confirm(cartItems) {
    const popDiv = document.querySelector(".pop-confirm");
    const popItems=popDiv.querySelector(".items-pop");
    document.querySelector(".pop-section").style.display = 'block';
    const container=document.querySelector(".container");
    container.classList.add('reduced-size');
    for(let i=0;i< cartItems.children.length-3;i++){
        const item=cartItems.children[i];
        const confirmItem=document.createElement("div");
        confirmItem.setAttribute("class","item-pop");
        const itemName =item .querySelector('.item-name').innerHTML;
        const itemQuantity =item .querySelector('.item-quantity').innerHTML;
        const itemPrice = item.querySelector('.item-price').innerHTML;
        const itemTotal = item.querySelector('.item-total').innerHTML;
        const itemImage = item.querySelector('.item-src').innerHTML;
        confirmItem.innerHTML=`
            <img src="${itemImage}" alt="">
            <div>
            <p class="item-name"><strong>${itemName}</strong></p>
            <span class="item-quantity" > ${itemQuantity}</span>
            <span class="item-price" > ${itemPrice}</span>
            </div>
            <span class="item-total">${itemTotal}</span>
            `; 
        popItems.insertBefore(confirmItem,popDiv.querySelector(".total-order"));
    }
        const totalCart=cartItems.children[cartItems.children.length-3].querySelector(".total");
        const totalPop=  popItems.lastElementChild.querySelector(".total");
        totalPop.innerHTML=totalCart.innerHTML;
}

  
 

