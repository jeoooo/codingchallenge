// Function to get items from localStorage and update the checkout page
function updateCheckout() {
    // Get the checkout items element
    let checkoutItems = document.getElementById('checkout-items');

    // Get the total element
    let checkoutTotal = document.getElementById('checkout-total');

    // Get the cart data from localStorage
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the cart is empty
    if (cartData.length === 0) {
        checkoutItems.innerHTML = '<p style="padding-top: 10px; padding-bottom: 10px;  font-size: 20px; font-family: \'Montserrat\';">No items in the cart.</p>';

        checkoutTotal.innerHTML = "Total: $0";
    } else {
        // Update checkout items based on the cart data
        let itemsHTML = "<ul>";
        let totalPrice = 0;

        cartData.forEach((item, index) => {
            itemsHTML += `<li style="padding-top: 10px; padding-bottom: 10px;  font-size: 20px;
                    font-family: 'Montserrat';">${item.productName} - $${item.price.toFixed(2)}
                    <button onclick="removeFromCart(${index})">Remove</button></li>`;
            totalPrice += item.price;
        });

        itemsHTML += "</ul>";

        // Display the checkout items
        checkoutItems.innerHTML = itemsHTML;

        // Display the total price
        checkoutTotal.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item from the cart based on the index
    if (index >= 0 && index < cartData.length) {
        cartData.splice(index, 1);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartData));

        // Update the checkout page
        updateCheckout();
    }
}
// Call the updateCheckout function when the page loads
updateCheckout();

// You can also call the updateCheckout function when needed, for example, when the shopping bag is clicked
document.getElementById('shopping-bag').addEventListener('click', function () {
    updateCheckout();
});
