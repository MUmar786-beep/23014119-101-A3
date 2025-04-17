// 1. Toggle dropdown menus for navigation
function setupNavDropdowns() {
    const navItems = document.querySelectorAll('.nav > ul > li');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dropdown = item.querySelector('.drowpdown');
            if (dropdown) dropdown.style.display = 'block';
        });
        item.addEventListener('mouseleave', () => {
            const dropdown = item.querySelector('.drowpdown');
            if (dropdown) dropdown.style.display = 'none';
        });
    });
}

// 2. Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.left input');
    const searchIcon = document.querySelector('.left img[alt="image"]');
    
    searchIcon.addEventListener('click', () => {
        if (searchInput.value.trim()) {
            alert(`Searching for: ${searchInput.value}`);
            // In a real implementation, this would redirect or filter products
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            alert(`Searching for: ${searchInput.value}`);
        }
    });
}

// 3. Cart counter functionality
function setupCartCounter() {
    const cartIcon = document.getElementById('cart');
    let cartCount = 0;
    
    cartIcon.addEventListener('click', () => {
        alert(`Cart has ${cartCount} items`);
    });
    
    // This would be called when items are added to cart
    function updateCartCount(count) {
        cartCount = count;
        // In a real implementation, you'd update a counter badge
    }
}

// 4. Product hover effects
function setupProductHover() {
    const products = document.querySelectorAll('.first > div');
    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            product.style.transform = 'scale(1.02)';
            product.style.transition = 'transform 0.3s ease';
            product.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        product.addEventListener('mouseleave', () => {
            product.style.transform = 'scale(1)';
            product.style.boxShadow = 'none';
        });
    });
}

// 5. Price filter functionality
function setupPriceFilter() {
    // This would be triggered by a filter UI element (you'd need to add it)
    function filterByPrice(min, max) {
        const products = document.querySelectorAll('.first > div');
        products.forEach(product => {
            const priceElement = product.querySelector('.new');
            if (priceElement) {
                const price = parseInt(priceElement.textContent.replace('RS.', '').trim());
                if (price >= min && price <= max) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        });
    }
    
    // Example usage:
    // filterByPrice(1000, 5000);
}

// 6. Category filter functionality
function setupCategoryFilter() {
    // This would filter products by their category (WOOL COATS, PRINCE COATS, etc.)
    function filterByCategory(category) {
        const sections = document.querySelectorAll('.line + .first');
        sections.forEach(section => {
            const sectionTitle = section.previousElementSibling.querySelector('p').textContent;
            if (sectionTitle.includes(category.toUpperCase())) {
                section.style.display = 'flex';
            } else {
                section.style.display = 'none';
            }
        });
    }
    
    // Example usage:
    // filterByCategory('wool');
}

// 7. Add to cart functionality
function setupAddToCart() {
    const products = document.querySelectorAll('.first > div');
    products.forEach(product => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.className = 'add-to-cart';
        product.appendChild(addButton);
        
        addButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const productName = product.querySelector('.first-text h5').textContent;
            const price = product.querySelector('.new').textContent;
            alert(`Added ${productName} (${price}) to cart`);
            // In a real implementation, you'd update the cart state
        });
    });
}

// 8. Newsletter signup
function setupNewsletter() {
    const emailInput = document.querySelector('input[id="username"]');
    const submitButton = document.querySelector('footer button');
    
    submitButton.addEventListener('click', () => {
        if (emailInput.value.includes('@') && emailInput.value.includes('.')) {
            alert('Thanks for subscribing!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// 9. Quick view modal
function setupQuickView() {
    const products = document.querySelectorAll('.first > div');
    products.forEach(product => {
        product.addEventListener('click', () => {
            const productName = product.querySelector('.first-text h5').textContent;
            const price = product.querySelector('.new').textContent;
            const oldPrice = product.querySelector('.previous').textContent;
            const imgSrc = product.querySelector('.image img').src;
            
            // Create modal (you'd need to add CSS for this)
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${imgSrc}" alt="${productName}">
                    <h3>${productName}</h3>
                    <p class="old-price">${oldPrice}</p>
                    <p class="current-price">${price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.close').addEventListener('click', () => {
                modal.remove();
            });
        });
    });
}

// 10. Sort products by price
function setupSorting() {
    // This would be triggered by a sort dropdown (you'd need to add it)
    function sortProducts(order) {
        const productSections = document.querySelectorAll('.line + .first');
        
        productSections.forEach(section => {
            const products = Array.from(section.children);
            
            products.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.new').textContent.replace('RS.', '').trim());
                const priceB = parseInt(b.querySelector('.new').textContent.replace('RS.', '').trim());
                return order === 'asc' ? priceA - priceB : priceB - priceA;
            });
            
            // Clear and re-add sorted products
            section.innerHTML = '';
            products.forEach(product => section.appendChild(product));
        });
    }
    
    // Example usage:
    // sortProducts('asc'); // or 'desc'
}

// 11. Wishlist functionality
function setupWishlist() {
    const products = document.querySelectorAll('.first > div');
    products.forEach(product => {
        const wishlistButton = document.createElement('span');
        wishlistButton.className = 'wishlist-button';
        wishlistButton.innerHTML = '❤️';
        product.appendChild(wishlistButton);
        
        wishlistButton.addEventListener('click', (e) => {
            e.stopPropagation();
            wishlistButton.style.color = wishlistButton.style.color === 'red' ? 'gray' : 'red';
            const productName = product.querySelector('.first-text h5').textContent;
            alert(wishlistButton.style.color === 'red' ? 
                `Added ${productName} to wishlist` : 
                `Removed ${productName} from wishlist`);
        });
    });
}

// 12. Discount percentage calculator
function showDiscountPercentages() {
    const products = document.querySelectorAll('.first > div');
    products.forEach(product => {
        const previousPrice = product.querySelector('.previous');
        const newPrice = product.querySelector('.new');
        
        if (previousPrice && newPrice) {
            const prev = parseInt(previousPrice.textContent.replace('RS.', '').trim());
            const current = parseInt(newPrice.textContent.replace('RS.', '').trim());
            const discount = Math.round(((prev - current) / prev) * 100);
            
            const discountBadge = document.createElement('span');
            discountBadge.className = 'discount-badge';
            discountBadge.textContent = `${discount}% OFF`;
            product.appendChild(discountBadge);
        }
    });
}

// 13. Responsive navigation for mobile
function setupMobileNav() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('header').prepend(menuToggle);
    
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Adjust for window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = '';
        }
    });
}

// 14. Product count display
function displayProductCounts() {
    const sectionTitles = document.querySelectorAll('.line p');
    sectionTitles.forEach(title => {
        if (title.textContent !== '40% OFF ON SALE') {
            const section = title.nextElementSibling.nextElementSibling;
            if (section && section.className === 'first') {
                const count = section.children.length;
                title.textContent += ` (${count} items)`;
            }
        }
    });
}

// 15. Scroll to top button
function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.textContent = '↑';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 16. Image lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('.image img');
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        io.observe(target);
    };
    
    images.forEach(img => {
        img.dataset.src = img.src;
        img.src = ''; // Or use a placeholder
        lazyLoad(img);
    });
}

// 17. Social media links handler
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('footer li a');
    socialLinks.forEach(link => {
        if (link.textContent.includes('Facebook') || 
            link.textContent.includes('Instagram') || 
            link.textContent.includes('LinkedIn') || 
            link.textContent.includes('TikTok')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Redirecting to our ${link.textContent} page`);
                // In real implementation: window.open(link.href, '_blank');
            });
        }
    });
}

// 18. Currency converter
function setupCurrencyConverter() {
    // This would be triggered by a currency selector (you'd need to add it)
    function convertPrices(currency, rate) {
        const prices = document.querySelectorAll('.previous, .new');
        prices.forEach(price => {
            const currentValue = parseInt(price.textContent.replace('RS.', '').trim());
            const convertedValue = (currentValue * rate).toFixed(2);
            price.textContent = `${convertedValue} ${currency}`;
        });
    }
    
    // Example usage:
    // convertPrices('USD', 0.0036); // Convert PKR to USD
}

// 19. Product comparison feature
function setupProductComparison() {
    const compareCheckboxes = [];
    const products = document.querySelectorAll('.first > div');
    
    products.forEach(product => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'compare-checkbox';
        checkbox.style.position = 'absolute';
        checkbox.style.top = '10px';
        checkbox.style.left = '10px';
        product.appendChild(checkbox);
        compareCheckboxes.push(checkbox);
        
        checkbox.addEventListener('change', () => {
            const selectedCount = compareCheckboxes.filter(cb => cb.checked).length;
            if (selectedCount > 3) {
                checkbox.checked = false;
                alert('You can compare up to 3 products at a time');
            }
        });
    });
    
    // Add compare button (you'd need to add this to your HTML)
    const compareButton = document.createElement('button');
    compareButton.textContent = 'Compare Selected (0)';
    compareButton.className = 'compare-button';
    document.querySelector('header').appendChild(compareButton);
    
    compareCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCompareButton);
    });
    
    function updateCompareButton() {
        const selectedCount = compareCheckboxes.filter(cb => cb.checked).length;
        compareButton.textContent = `Compare Selected (${selectedCount})`;
        
        if (selectedCount >= 2) {
            compareButton.disabled = false;
            compareButton.addEventListener('click', showComparison);
        } else {
            compareButton.disabled = true;
            compareButton.removeEventListener('click', showComparison);
        }
    }
    
    function showComparison() {
        const selectedProducts = Array.from(compareCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement);
        
        // Create comparison modal
        const comparisonModal = document.createElement('div');
        comparisonModal.className = 'comparison-modal';
        
        let modalContent = '<div class="modal-content"><span class="close">&times;</span><h2>Product Comparison</h2><table><tr>';
        
        selectedProducts.forEach(product => {
            modalContent += `<td>
                <img src="${product.querySelector('img').src}">
                <h3>${product.querySelector('h5').textContent}</h3>
                <p>${product.querySelector('.new').textContent}</p>
            </td>`;
        });
        
        modalContent += '</tr></table></div>';
        comparisonModal.innerHTML = modalContent;
        
        document.body.appendChild(comparisonModal);
        
        comparisonModal.querySelector('.close').addEventListener('click', () => {
            comparisonModal.remove();
        });
    }
}

// 20. Recently viewed products
function trackRecentlyViewed() {
    const products = document.querySelectorAll('.first > div');
    
    products.forEach(product => {
        product.addEventListener('click', () => {
            const productId = product.querySelector('img').src.split('/').pop();
            const productName = product.querySelector('h5').textContent;
            
            let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            
            // Remove if already exists
            recentlyViewed = recentlyViewed.filter(p => p.id !== productId);
            
            // Add to beginning
            recentlyViewed.unshift({
                id: productId,
                name: productName,
                image: product.querySelector('img').src,
                price: product.querySelector('.new').textContent
            });
            
            // Keep only last 5
            if (recentlyViewed.length > 5) {
                recentlyViewed = recentlyViewed.slice(0, 5);
            }
            
            localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupNavDropdowns();
    setupSearch();
    setupCartCounter();
    setupProductHover();
    setupPriceFilter();
    setupCategoryFilter();
    setupAddToCart();
    setupNewsletter();
    setupQuickView();
    setupSorting();
    setupWishlist();
    showDiscountPercentages();
    setupMobileNav();
    displayProductCounts();
    setupScrollToTop();
    setupLazyLoading();
    setupSocialLinks();
    setupCurrencyConverter();
    setupProductComparison();
    trackRecentlyViewed();
});