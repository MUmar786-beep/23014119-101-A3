// 1. Mobile Menu Toggle
function toggleMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');
    
    menuBtn.addEventListener('click', () => {
        navbar.style.display = navbar.style.display === 'block' ? 'none' : 'block';
    });
}

// 2. Dropdown Menu Handler
function setupDropdownMenus() {
    const dropdowns = document.querySelectorAll('.list');
    
    dropdowns.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.drowpdown').style.display = 'block';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.drowpdown').style.display = 'none';
        });
    });
}

// 3. Product Filter by Collection
function filterByCollection() {
    const filterButtons = document.querySelectorAll('.collection-filter button');
    const products = document.querySelectorAll('.first > div');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const collection = button.dataset.collection;
            
            products.forEach(product => {
                const productCollection = product.querySelector('h5').textContent.toLowerCase();
                
                if (collection === 'all' || productCollection.includes(collection)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// 4. Price Filter
function filterByPrice() {
    const priceFilter = document.getElementById('price-filter');
    
    priceFilter.addEventListener('change', () => {
        const value = priceFilter.value;
        const products = document.querySelectorAll('.first > div');
        
        products.forEach(product => {
            const priceText = product.querySelector('.new').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            
            if (value === 'all' || 
                (value === '0-2000' && price < 2000) ||
                (value === '2000-5000' && price >= 2000 && price <= 5000) ||
                (value === '5000+' && price > 5000)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

// 5. Shopping Cart Functionality
function setupShoppingCart() {
    const cartIcon = document.getElementById('cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count display
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartCount.textContent = count;
        
        // Remove existing count if any
        const existingCount = document.querySelector('.cart-count');
        if (existingCount) existingCount.remove();
        
        if (count > 0) {
            cartIcon.parentNode.appendChild(cartCount);
        }
    }
    
    // Add to cart functionality
    document.querySelectorAll('.first > div').forEach(product => {
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'add-to-cart';
        addToCartBtn.textContent = 'Add to Cart';
        
        addToCartBtn.addEventListener('click', () => {
            const productName = product.querySelector('h5').textContent;
            const productPrice = product.querySelector('.new').textContent;
            const productImg = product.querySelector('img').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImg,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${productName} added to cart!`);
        });
        
        product.appendChild(addToCartBtn);
    });
    
    // Initialize cart count
    updateCartCount();
}

// 6. Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 7. FAQ Accordion
function setupFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all answers first
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
                ans.previousElementSibling.querySelector('span').textContent = '+';
            });
            
            // Toggle current answer
            if (!isOpen) {
                answer.style.display = 'block';
                question.querySelector('span').textContent = '-';
            }
        });
    });
}

// 8. Newsletter Subscription
function setupNewsletter() {
    const newsletterForm = document.querySelector('footer section');
    const emailInput = document.getElementById('username');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (emailInput.value && emailInput.value.includes('@')) {
            showNotification('Thanks for subscribing!');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address');
        }
    });
}

// 9. Product Search
function setupProductSearch() {
    const searchInput = document.getElementById('search');
    const searchIcon = document.getElementById('icone');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.first > div');
        let found = false;
        
        products.forEach(product => {
            const productName = product.querySelector('h5').textContent.toLowerCase();
            
            if (productName.includes(query)) {
                product.style.display = 'block';
                found = true;
                
                // Highlight matching text
                const regex = new RegExp(query, 'gi');
                const highlighted = productName.replace(regex, match => 
                    `<span class="highlight">${match}</span>`
                );
                product.querySelector('h5').innerHTML = highlighted;
            } else {
                product.style.display = 'none';
            }
        });
        
        if (!found) {
            showNotification('No products found matching your search');
        }
    }
    
    searchIcon.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// 10. Image Zoom on Hover
function setupImageZoom() {
    const productImages = document.querySelectorAll('.first .image img');
    
    productImages.forEach(img => {
        const parent = img.parentElement;
        parent.style.overflow = 'hidden';
        parent.style.position = 'relative';
        
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// 11. Discount Badges
function addDiscountBadges() {
    document.querySelectorAll('.first > div').forEach(product => {
        const prevPrice = parseFloat(product.querySelector('.previous').textContent);
        const newPrice = parseFloat(product.querySelector('.new').textContent);
        const discount = Math.round(((prevPrice - newPrice) / prevPrice) * 100);
        
        if (discount > 0) {
            const badge = document.createElement('span');
            badge.className = 'discount-badge';
            badge.textContent = `-${discount}%`;
            product.querySelector('.image').appendChild(badge);
        }
    });
}

// 12. Quick View Modal
function setupQuickView() {
    document.querySelectorAll('.first > div').forEach(product => {
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'quick-view';
        quickViewBtn.textContent = 'Quick View';
        
        quickViewBtn.addEventListener('click', () => {
            const productName = product.querySelector('h5').textContent;
            const productPrice = product.querySelector('.new').textContent;
            const productImg = product.querySelector('img').src;
            
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${productImg}" alt="${productName}">
                    <h3>${productName}</h3>
                    <p>${productPrice}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
        
        product.appendChild(quickViewBtn);
    });
}

// 13. Wishlist Functionality
function setupWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    document.querySelectorAll('.first > div').forEach(product => {
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'wishlist-btn';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        
        const productId = product.querySelector('h5').textContent.replace(/\s+/g, '-').toLowerCase();
        
        // Check if already in wishlist
        if (wishlist.includes(productId)) {
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        
        wishlistBtn.addEventListener('click', () => {
            const index = wishlist.indexOf(productId);
            
            if (index === -1) {
                wishlist.push(productId);
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
                showNotification('Added to wishlist!');
            } else {
                wishlist.splice(index, 1);
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
                showNotification('Removed from wishlist');
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });
        
        product.appendChild(wishlistBtn);
    });
}

// 14. Scroll to Top Button
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '&uarr;';
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 15. Product Rating System
function addProductRatings() {
    document.querySelectorAll('.first > div').forEach(product => {
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'rating';
        
        // Create 5 stars
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.dataset.rating = i;
            star.innerHTML = '&#9733;';
            
            star.addEventListener('click', () => {
                // Reset all stars
                ratingContainer.querySelectorAll('.star').forEach(s => {
                    s.classList.remove('active');
                });
                
                // Activate clicked star and previous ones
                for (let j = 1; j <= i; j++) {
                    ratingContainer.querySelector(`.star[data-rating="${j}"]`).classList.add('active');
                }
                
                showNotification(`Thanks for your ${i}-star rating!`);
            });
            
            ratingContainer.appendChild(star);
        }
        
        product.appendChild(ratingContainer);
    });
}

// 16. Countdown Timer for Sale
function addSaleCountdown() {
    const saleElements = document.querySelectorAll('.line p');
    
    saleElements.forEach(element => {
        if (element.textContent.includes('OFF ON SALE')) {
            const countdown = document.createElement('div');
            countdown.className = 'countdown';
            countdown.textContent = 'Sale ends in: 24:59:59';
            
            element.parentNode.insertBefore(countdown, element.nextSibling);
            
            // Update countdown every second
            let hours = 24, minutes = 59, seconds = 59;
            
            const timer = setInterval(() => {
                seconds--;
                
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                
                if (hours < 0) {
                    clearInterval(timer);
                    countdown.textContent = 'Sale has ended!';
                    return;
                }
                
                countdown.textContent = `Sale ends in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
    });
}

// 17. Product Comparison
function setupProductComparison() {
    const compareBtn = document.createElement('button');
    compareBtn.id = 'compare-btn';
    compareBtn.textContent = 'Compare Products (0)';
    document.body.appendChild(compareBtn);
    
    let comparisonProducts = [];
    
    document.querySelectorAll('.first > div').forEach(product => {
        const compareCheckbox = document.createElement('input');
        compareCheckbox.type = 'checkbox';
        compareCheckbox.className = 'compare-checkbox';
        
        compareCheckbox.addEventListener('change', () => {
            const productName = product.querySelector('h5').textContent;
            
            if (compareCheckbox.checked) {
                if (comparisonProducts.length < 3) {
                    comparisonProducts.push(productName);
                } else {
                    compareCheckbox.checked = false;
                    showNotification('You can compare up to 3 products at a time');
                }
            } else {
                comparisonProducts = comparisonProducts.filter(name => name !== productName);
            }
            
            compareBtn.textContent = `Compare Products (${comparisonProducts.length})`;
        });
        
        product.appendChild(compareCheckbox);
    });
    
    compareBtn.addEventListener('click', () => {
        if (comparisonProducts.length > 1) {
            showNotification(`Comparing ${comparisonProducts.join(' vs ')}`);
            // Here you would typically open a comparison modal
        } else {
            showNotification('Please select at least 2 products to compare');
        }
    });
}

// 18. Recently Viewed Products
function trackRecentlyViewed() {
    let viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
    
    document.querySelectorAll('.first > div').forEach(product => {
        product.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
                const productName = product.querySelector('h5').textContent;
                const productImg = product.querySelector('img').src;
                
                // Remove if already exists
                viewedProducts = viewedProducts.filter(p => p.name !== productName);
                
                // Add to beginning
                viewedProducts.unshift({
                    name: productName,
                    image: productImg
                });
                
                // Keep only last 5 viewed
                if (viewedProducts.length > 5) {
                    viewedProducts = viewedProducts.slice(0, 5);
                }
                
                localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
            }
        });
    });
}

// 19. Dynamic Breadcrumbs
function addBreadcrumbs() {
    const breadcrumbs = document.createElement('div');
    breadcrumbs.className = 'breadcrumbs';
    
    const path = window.location.pathname.split('/').filter(Boolean);
    let breadcrumbHTML = '<a href="/">Home</a>';
    
    path.forEach((part, index) => {
        if (index < path.length - 1) {
            breadcrumbHTML += ` &rsaquo; <a href="/${path.slice(0, index + 1).join('/')}">${part.replace('.html', '').replace(/-/g, ' ')}</a>`;
        } else {
            breadcrumbHTML += ` &rsaquo; <span>${part.replace('.html', '').replace(/-/g, ' ')}</span>`;
        }
    });
    
    breadcrumbs.innerHTML = breadcrumbHTML;
    document.body.insertBefore(breadcrumbs, document.querySelector('header').nextSibling);
}

// 20. Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.dataset.src = img.src;
        img.src = 'placeholder.jpg'; // You should have a small placeholder image
        observer.observe(img);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    toggleMobileMenu();
    setupDropdownMenus();
    filterByCollection();
    filterByPrice();
    setupShoppingCart();
    setupFAQAccordion();
    setupNewsletter();
    setupProductSearch();
    setupImageZoom();
    addDiscountBadges();
    setupQuickView();
    setupWishlist();
    addScrollToTop();
    addProductRatings();
    addSaleCountdown();
    setupProductComparison();
    trackRecentlyViewed();
    addBreadcrumbs();
    lazyLoadImages();
});