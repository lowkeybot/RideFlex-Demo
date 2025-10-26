// Rideflex - Main JavaScript Functions

// Navigation functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenu && overlay) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.transform = 'translateX(0)';
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenu && overlay) {
        mobileMenu.style.transform = '';
        mobileMenu.classList.add('hidden');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Auth modal functions
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Search form handling
function handleSearch(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();
    
    // Get form values
    const pickupLocation = event.target.querySelector('select[name="pickup_location"]')?.value || 
                          event.target.querySelector('select:first-of-type').value;
    const dropoffLocation = event.target.querySelector('select[name="dropoff_location"]')?.value || 
                           event.target.querySelector('select:nth-of-type(2)').value;
    const pickupDate = event.target.querySelector('input[type="date"]:first-of-type').value;
    const pickupTime = event.target.querySelector('select:nth-of-type(3)').value;
    const dropoffDate = event.target.querySelector('input[type="date"]:last-of-type').value;
    const dropoffTime = event.target.querySelector('select:last-of-type').value;
    
    // Validate required fields
    if (!pickupLocation || !pickupDate || !pickupTime) {
        alert('Please select pickup location, date, and time to search for cars.');
        return;
    }
    
    // Build search parameters
    if (pickupLocation) searchParams.append('pickupLocation', pickupLocation);
    if (dropoffLocation) searchParams.append('dropoffLocation', dropoffLocation);
    if (pickupDate) searchParams.append('pickupDate', pickupDate);
    if (pickupTime) searchParams.append('pickupTime', pickupTime);
    if (dropoffDate) searchParams.append('dropoffDate', dropoffDate);
    if (dropoffTime) searchParams.append('dropoffTime', dropoffTime);
    
    // Navigate to cars page with search parameters
    window.location.href = `cars.html?${searchParams.toString()}`;
}

// Date input validation
function setupDateValidation() {
    const pickupDateInput = document.querySelector('input[type="date"]:first-of-type');
    const dropoffDateInput = document.querySelector('input[type="date"]:last-of-type');
    
    if (pickupDateInput && dropoffDateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        pickupDateInput.min = today;
        
        // Update dropoff minimum when pickup changes
        pickupDateInput.addEventListener('change', function() {
            dropoffDateInput.min = this.value || today;
            if (dropoffDateInput.value && dropoffDateInput.value < this.value) {
                dropoffDateInput.value = this.value;
            }
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Loading states
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Toast notifications (simple implementation)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white max-w-sm slide-in-up`;
    
    switch (type) {
        case 'success':
            toast.style.backgroundColor = '#10B981';
            break;
        case 'error':
            toast.style.backgroundColor = '#EF4444';
            break;
        case 'warning':
            toast.style.backgroundColor = '#F59E0B';
            break;
        default:
            toast.style.backgroundColor = '#6B7280';
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// URL parameter helpers
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({ path: url.href }, '', url.href);
}

// Local storage helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        return false;
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
        return null;
    }
}

// Theme handling
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark');
    
    if (isDark) {
        body.classList.remove('dark');
        saveToStorage('theme', 'light');
    } else {
        body.classList.add('dark');
        saveToStorage('theme', 'dark');
    }
}

function initializeTheme() {
    const savedTheme = loadFromStorage('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
    }
}

// Car data (mock data for the static site)
const cars = [
    {
        id: 1,
        name: "Toyota Vios",
        category: "Sedan",
        price: 1800,
        hourlyPrice: 120,
        rating: 4.8,
        location: "Manila - BGC",
        features: ["Automatic", "5 Seats", "AC"],
        description: "Perfect for city driving and daily commutes. Fuel-efficient and reliable.",
        specs: {
            engine: "1.3L DOHC",
            transmission: "CVT",
            fuel: "Gasoline",
            seats: 5
        }
    },
    {
        id: 2,
        name: "Honda CR-V",
        category: "SUV",
        price: 3200,
        hourlyPrice: 220,
        rating: 4.9,
        location: "Manila - Makati",
        features: ["Automatic", "7 Seats", "4WD"],
        description: "Spacious SUV perfect for family trips and weekend adventures.",
        specs: {
            engine: "1.5L Turbo",
            transmission: "CVT",
            fuel: "Gasoline",
            seats: 7
        }
    },
    {
        id: 3,
        name: "Toyota Hiace",
        category: "Van",
        price: 4500,
        hourlyPrice: 350,
        rating: 4.7,
        location: "Manila - Ortigas",
        features: ["Manual", "15 Seats", "AC"],
        description: "Large capacity van ideal for group transportation and events.",
        specs: {
            engine: "2.8L Diesel",
            transmission: "Manual",
            fuel: "Diesel",
            seats: 15
        }
    }
];

// Get car by ID
function getCarById(id) {
    return cars.find(car => car.id === parseInt(id));
}

// Filter cars
function filterCars(filters) {
    return cars.filter(car => {
        if (filters.category && car.category.toLowerCase() !== filters.category.toLowerCase()) {
            return false;
        }
        if (filters.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
        }
        if (filters.maxPrice && car.price > filters.maxPrice) {
            return false;
        }
        return true;
    });
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(price);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('auth-modal');
    if (modal && !modal.classList.contains('hidden')) {
        if (event.target === modal) {
            closeAuthModal();
        }
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('auth-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeAuthModal();
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Setup date validation
    setupDateValidation();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Add any page-specific initialization here
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            // Homepage specific initialization
            console.log('Homepage loaded');
            break;
        case 'cars.html':
            // Car listings specific initialization
            if (typeof initializeCarListings === 'function') {
                initializeCarListings();
            }
            break;
        case 'car-details.html':
            // Car details specific initialization
            if (typeof initializeCarDetails === 'function') {
                initializeCarDetails();
            }
            break;
        case 'booking-checkout.html':
            // Booking checkout page specific initialization
            if (typeof initializeBookingCheckout === 'function') {
                initializeBookingCheckout();
            }
            break;
        case 'support.html':
            // Support page specific initialization
            if (typeof initializeSupport === 'function') {
                initializeSupport();
            }
            break;
    }
});

// Export functions for use in other scripts
window.rideflex = {
    toggleMobileMenu,
    openAuthModal,
    closeAuthModal,
    handleSearch,
    showToast,
    getUrlParameter,
    setUrlParameter,
    saveToStorage,
    loadFromStorage,
    toggleTheme,
    getCarById,
    filterCars,
    formatPrice,
    cars
};