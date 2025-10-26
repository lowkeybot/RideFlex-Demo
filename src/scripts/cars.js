// Car Listings Page JavaScript
// Ensure mobile menu logic is available for this page
if (typeof toggleMobileMenu !== 'function') {
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (mobileMenu && overlay) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.transform = 'translateX(0)';
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };
    window.closeMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (mobileMenu && overlay) {
            mobileMenu.style.transform = '';
            mobileMenu.classList.add('hidden');
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };
}

let currentCars = [];
let allCars = [];
let currentFilters = {};

// Initialize car listings page
function initializeCarListings() {
    // Load cars data
    allCars = window.rideflex.cars;
    currentCars = [...allCars];
    
    // Populate search form with URL parameters
    populateSearchFromURL();
    
    // Render initial car grid
    renderCarGrid();
    
    // Setup event listeners
    setupEventListeners();
}

// Populate search form from URL parameters
function populateSearchFromURL() {
    const pickupLocation = window.rideflex.getUrlParameter('pickupLocation');
    const pickupDate = window.rideflex.getUrlParameter('pickupDate');
    const dropoffDate = window.rideflex.getUrlParameter('dropoffDate');
    const category = window.rideflex.getUrlParameter('category');
    
    if (pickupLocation) {
        document.getElementById('pickup-location').value = pickupLocation;
    }
    if (pickupDate) {
        document.getElementById('pickup-date').value = pickupDate;
    }
    if (dropoffDate) {
        document.getElementById('dropoff-date').value = dropoffDate;
    }
    if (category) {
        document.getElementById('car-category').value = category.toLowerCase();
    }
    
    // Apply initial filters if any
    applyFilters();
}

// Setup event listeners
function setupEventListeners() {
    // Price filter change
    document.querySelectorAll('input[name="price"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
    
    // Features filter change
    document.querySelectorAll('input[name="features"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Category filter from search form
    document.getElementById('car-category').addEventListener('change', applyFilters);
}

// Render car grid
function renderCarGrid() {
    const carGrid = document.getElementById('car-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    if (currentCars.length === 0) {
        carGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        resultsCount.textContent = 'No cars found';
        return;
    }
    
    noResults.classList.add('hidden');
    resultsCount.textContent = `Showing ${currentCars.length} car${currentCars.length === 1 ? '' : 's'}`;
    
    carGrid.innerHTML = currentCars.map(car => createCarCard(car)).join('');
}

// Create car card HTML
function createCarCard(car) {
    const categoryEmoji = {
        'Sedan': '🚗',
        'SUV': '🚙',
        'Van': '🚐'
    };
    
    return `
        <div class="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow hover-lift">
            <div class="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div class="text-6xl">${categoryEmoji[car.category] || '🚗'}</div>
                <span class="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                    ${car.category}
                </span>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-semibold text-gray-900">${car.name}</h3>
                    <div class="flex items-center space-x-1">
                        <svg class="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span class="text-sm text-gray-600">${car.rating}</span>
                    </div>
                </div>
                
                <p class="text-gray-600 text-sm mb-3">${car.description}</p>
                
                <div class="flex items-center text-sm text-gray-600 mb-4">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    ${car.location}
                </div>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${car.features.map(feature => `
                        <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            ${feature}
                        </span>
                    `).join('')}
                </div>

                <div class="flex justify-between items-center">
                    <div>
                        <div>
                            <span class="text-2xl font-bold text-orange-500">₱${car.price.toLocaleString()}</span>
                            <span class="text-gray-600">/day</span>
                        </div>
                        <div class="text-sm text-gray-500">
                            ₱${car.hourlyPrice}/hour
                        </div>
                    </div>
                    <div class="space-x-2">
                        <a href="car-details.html?id=${car.id}" 
                           class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Apply filters
function applyFilters() {
    const category = document.getElementById('car-category').value;
    const priceRange = document.querySelector('input[name="price"]:checked')?.value;
    const selectedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked'))
                                  .map(cb => cb.value);
    
    currentFilters = {
        category,
        priceRange,
        features: selectedFeatures
    };
    
    currentCars = filterCars(allCars, currentFilters);
    renderCarGrid();
}

// Filter cars based on criteria
function filterCars(cars, filters) {
    return cars.filter(car => {
        // Category filter
        if (filters.category && car.category.toLowerCase() !== filters.category.toLowerCase()) {
            return false;
        }
        
        // Price range filter
        if (filters.priceRange) {
            const price = car.price;
            switch (filters.priceRange) {
                case '0-2000':
                    if (price > 2000) return false;
                    break;
                case '2000-4000':
                    if (price <= 2000 || price > 4000) return false;
                    break;
                case '4000+':
                    if (price <= 4000) return false;
                    break;
            }
        }
        
        // Features filter
        if (filters.features && filters.features.length > 0) {
            const carFeatures = car.features.map(f => f.toLowerCase());
            const hasAllFeatures = filters.features.every(feature => {
                switch (feature) {
                    case 'automatic':
                        return carFeatures.some(f => f.includes('automatic'));
                    case 'ac':
                        return carFeatures.some(f => f.includes('ac'));
                    case 'gps':
                        return carFeatures.some(f => f.includes('gps'));
                    case 'bluetooth':
                        return carFeatures.some(f => f.includes('bluetooth'));
                    default:
                        return carFeatures.includes(feature);
                }
            });
            if (!hasAllFeatures) return false;
        }
        
        return true;
    });
}

// Sort cars
function sortCars() {
    const sortBy = document.getElementById('sort-by').value;
    
    switch (sortBy) {
        case 'price-low':
            currentCars.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentCars.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            currentCars.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            currentCars.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default: // recommended
            currentCars.sort((a, b) => b.rating - a.rating);
    }
    
    renderCarGrid();
}

// Clear all filters
function clearFilters() {
    // Clear search form
    document.getElementById('pickup-location').value = '';
    document.getElementById('pickup-date').value = '';
    document.getElementById('dropoff-date').value = '';
    document.getElementById('car-category').value = '';
    
    // Clear sidebar filters
    document.querySelectorAll('input[name="price"]').forEach(radio => {
        radio.checked = radio.value === '';
    });
    document.querySelectorAll('input[name="features"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset sort
    document.getElementById('sort-by').value = 'recommended';
    
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
    
    // Reset cars
    currentCars = [...allCars];
    currentFilters = {};
    
    renderCarGrid();
    window.rideflex.showToast('Filters cleared', 'info');
}

// Enhanced search function for this page
function handleSearch(event) {
    event.preventDefault();
    
    const pickupLocation = document.getElementById('pickup-location').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const dropoffDate = document.getElementById('dropoff-date').value;
    const category = document.getElementById('car-category').value;
    
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (pickupLocation) params.append('pickupLocation', pickupLocation);
    if (pickupDate) params.append('pickupDate', pickupDate);
    if (dropoffDate) params.append('dropoffDate', dropoffDate);
    if (category) params.append('category', category);
    
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    
    // Apply filters
    applyFilters();
    
    window.rideflex.showToast('Search updated', 'success');
}

// Export functions for global access
window.initializeCarListings = initializeCarListings;
window.handleSearch = handleSearch;
window.clearFilters = clearFilters;
window.applyFilters = applyFilters;
window.sortCars = sortCars;