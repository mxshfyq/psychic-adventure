document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await response.json();
            const productContainer = document.getElementById('product-container');

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <strong>$${product.price.toFixed(2)}</strong>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productContainer.appendChild(productItem);
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = "<p>Unable to load products. Please try again later.</p>";
        }
    }
});
