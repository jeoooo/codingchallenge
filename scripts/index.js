
// Function to add an item to the cart
function addToCart(productName, price, imageUrl) {
    // Assuming you have a cart object
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push({
        productName: productName,
        price: price,
        imageUrl: imageUrl,
        // Add other relevant information here
    });

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the tooltip content
    updateTooltipContent(cart);
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    // Assuming you have a cart object
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the last occurrence of the item
    let lastIndex = cart.map(item => item.productName).lastIndexOf(productName);

    // Remove the item from the cart based on the index
    if (lastIndex !== -1) {
        cart.splice(lastIndex, 1);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the tooltip content
    updateTooltipContent(cart);

    // Keep the tooltip open after removing an item
    let tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
}

// Function to truncate a string if it's too long
function truncateString(str, maxLen) {
    return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
}

// Function to update the tooltip content
function updateTooltipContent(cart) {
    // Get the tooltip element
    let tooltip = document.getElementById('tooltip');

    // Check if the cart is empty
    if (cart.length === 0) {
        tooltip.innerHTML = "Shopping cart is empty.";
    } else {
        // Update your tooltip content based on the cart items
        let tooltipContent = "<table><thead><tr><th style='width: 250px;'>Product Name</th><th style='width: 250px;'>Price</th><th style='width: 250px;'>Quantity</th><th style='width: 250px;'></th></tr></thead><tbody>";
        let totalPrice = 0;

        cart.forEach(item => {
            let truncatedName = truncateString(item.productName, 20); // Adjust the max length as needed
            tooltipContent += `<tr><td style='width: 250px;'><img src='${item.imageUrl}' alt='${truncatedName}'><br>${truncatedName}</td><td style='width: 250px;'>$${item.price.toFixed(2)}</td><td style='width: 250px;'>1</td><td style='width: 250px;'><button onclick="removeFromCart('${item.productName}')">Remove</button></td></tr>`;
            totalPrice += item.price;
        });

        // Display the total price
        tooltipContent += `</tbody></table> <br> Total: $${totalPrice.toFixed(2)}`;

        // Add "Proceed to Checkout" button after all items
        tooltipContent += `<br> <button onclick="proceedToCheckout()">Proceed to Checkout</button>`;

        tooltip.innerHTML = tooltipContent;
    }

    // Toggle the display of the tooltip
    tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
}

// Function to proceed to checkout (you need to define the actual URL to redirect)
function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

document.getElementById('shopping-bag').addEventListener('click', function () {
    // Toggle the display of the tooltip
    let tooltip = document.getElementById('tooltip');
    tooltip.style.display = tooltip.style.display === 'none' ? 'block' : 'none';
});