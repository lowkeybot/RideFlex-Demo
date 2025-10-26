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
// Car Details Page JavaScript

let currentCar = null;

// Initialize car details page
function initializeCarDetails() {
    const carId = window.rideflex.getUrlParameter('id');
    if (!carId) {
        showCarNotFound();
        return;
    }
    
    currentCar = window.rideflex.getCarById(parseInt(carId));
    if (!currentCar) {
        showCarNotFound();
        return;
    }
    
    renderCarDetails();
    updateBookingWidget();
}

// Show car not found message
function showCarNotFound() {
    const container = document.getElementById('car-details-container');
    container.innerHTML = `
        <div class="text-center py-12">
            <div class="text-6xl mb-4">🚗</div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Car Not Found</h2>
            <p class="text-gray-600 mb-6">The car you're looking for doesn't exist or has been removed.</p>
            <a href="cars.html" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors inline-block">
                Browse All Cars
            </a>
        </div>
    `;
}

// Render car details
function renderCarDetails() {
    const container = document.getElementById('car-details-container');
    const categoryEmoji = {
        'Sedan': '🚗',
        'SUV': '🚙',
        'Van': '🚐'
    };
    
    // Update breadcrumb
    document.getElementById('car-name-breadcrumb').textContent = currentCar.name;
    
    container.innerHTML = `
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Car Images and Gallery -->
            <div class="lg:col-span-2">
                <div class="mb-6">
                    <!-- Main Image -->
                    <div class="relative h-64 md:h-80 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden mb-4">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-8xl">${categoryEmoji[currentCar.category] || '🚗'}</div>
                        </div>
                        <div class="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                            ${currentCar.category}
                        </div>
                        <div class="absolute top-4 right-4 flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-3 py-1">
                            <svg class="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span class="text-sm font-medium">${currentCar.rating}</span>
                        </div>
                    </div>
                    
                    <!-- Thumbnail Gallery -->
                    <div class="grid grid-cols-4 gap-2">
                        ${[1,2,3,4].map(i => `
                            <div class="h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                                <div class="text-2xl">${categoryEmoji[currentCar.category] || '🚗'}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Car Information -->
                <div class="space-y-6">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h1 class="text-3xl font-bold text-gray-900">${currentCar.name}</h1>
                            <button class="text-gray-400 hover:text-red-500 transition-colors" title="Add to favorites">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        
                        <div class="flex items-center space-x-4 mb-4">
                            <div class="flex items-center space-x-1">
                                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span class="text-gray-600">${currentCar.location}</span>
                            </div>
                            <div class="flex items-center space-x-1">
                                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="text-gray-600">Available Now</span>
                            </div>
                        </div>
                        
                        <p class="text-gray-600 text-lg">${currentCar.description}</p>
                        
                        <div class="flex flex-wrap gap-2 mt-4">
                            ${currentCar.features.map(feature => `
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                                    ${feature}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Specifications -->
                    <div class="bg-gray-50 rounded-lg p-6">
                        <h3 class="text-lg font-semibold mb-4">Specifications</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="text-gray-600">Engine</span>
                                <span class="font-medium">${currentCar.specs.engine}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="text-gray-600">Transmission</span>
                                <span class="font-medium">${currentCar.specs.transmission}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="text-gray-600">Fuel Type</span>
                                <span class="font-medium">${currentCar.specs.fuel}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-200">
                                <span class="text-gray-600">Seating Capacity</span>
                                <span class="font-medium">${currentCar.specs.seats} seats</span>
                            </div>
                        </div>
                    </div>

                    <!-- Features & Amenities -->
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Features & Amenities</h3>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${getCarFeaturesList().map(feature => `
                                <div class="flex items-center space-x-2">
                                    <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>${feature}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Reviews Section -->
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Customer Reviews</h3>
                        <div class="space-y-4">
                            ${getCarReviews().map(review => `
                                <div class="border border-gray-200 rounded-lg p-4">
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center space-x-2">
                                            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                ${review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div class="font-medium">${review.name}</div>
                                                <div class="text-sm text-gray-500">${review.date}</div>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            ${Array.from({length: 5}, (_, i) => `
                                                <svg class="h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <p class="text-gray-600">${review.comment}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Booking Panel -->
            <div class="lg:col-span-1">
                <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                    <div class="mb-6">
                        <div class="flex items-baseline space-x-2 mb-2">
                            <span class="text-3xl font-bold text-orange-500">₱${currentCar.price.toLocaleString()}</span>
                            <span class="text-gray-600">/day</span>
                        </div>
                        <div class="text-sm text-gray-500">₱${currentCar.hourlyPrice}/hour available</div>
                    </div>

                    <form class="space-y-4" onsubmit="handleBookingSubmit(event)">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Pickup Date</label>
                                <input type="date" id="pickup-date" class="w-full p-3 border border-gray-300 rounded-lg" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Pickup Time</label>
                                <select id="pickup-time" class="w-full p-3 border border-gray-300 rounded-lg" required>
                                    <option value="">Select time</option>
                                    ${Array.from({length: 17}, (_, i) => {
                                        const hour = i + 6;
                                        const time = `${hour.toString().padStart(2, '0')}:00`;
                                        return `<option value="${time}">${time}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Return Date</label>
                                <input type="date" id="return-date" class="w-full p-3 border border-gray-300 rounded-lg" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Return Time</label>
                                <select id="return-time" class="w-full p-3 border border-gray-300 rounded-lg" required>
                                    <option value="">Select time</option>
                                    ${Array.from({length: 17}, (_, i) => {
                                        const hour = i + 6;
                                        const time = `${hour.toString().padStart(2, '0')}:00`;
                                        return `<option value="${time}">${time}</option>`;
                                    }).join('')}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-2">Pickup Location</label>
                            <select id="pickup-location" class="w-full p-3 border border-gray-300 rounded-lg" required>
                                <option value="">Select location</option>
                                <option value="manila-bgc">Manila - BGC</option>
                                <option value="manila-makati">Manila - Makati</option>
                                <option value="manila-ortigas">Manila - Ortigas</option>
                                <option value="manila-alabang">Manila - Alabang</option>
                                <option value="cebu-city">Cebu City</option>
                                <option value="davao-city">Davao City</option>
                            </select>
                        </div>

                        <!-- Pricing Breakdown -->
                        <div class="border-t border-gray-200 pt-4">
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Base price</span>
                                    <span id="base-price">₱${currentCar.price.toLocaleString()}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Duration</span>
                                    <span id="duration">1 day</span>
                                </div>
                                <div class="flex justify-between text-gray-500">
                                    <span>Service fee</span>
                                    <span>₱200</span>
                                </div>
                                <div class="border-t border-gray-200 pt-2">
                                    <div class="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span id="total-price">₱${(currentCar.price + 200).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-lg font-medium transition-colors">
                            Book Now
                        </button>
                    </form>

                    <div class="mt-4 space-y-2 text-center text-sm text-gray-600">
                        <div class="flex items-center justify-center space-x-1">
                            <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Free cancellation up to 24 hours</span>
                        </div>
                        <div class="flex items-center justify-center space-x-1">
                            <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Fully insured & protected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show mobile booking widget
    document.getElementById('booking-widget').classList.remove('hidden');
    
    // Setup date validation
    setupBookingDateValidation();
}

// Get car features list
function getCarFeaturesList() {
    return [
        'Air Conditioning',
        'Bluetooth Connectivity',
        'GPS Navigation',
        'USB Charging Ports',
        'Safety Features (Airbags)',
        'Automatic Transmission',
        'Power Steering',
        'Central Locking',
        'Electric Windows',
        'AM/FM Radio',
        'Spare Tire & Tools',
        '24/7 Roadside Assistance'
    ];
}

// Get car reviews
function getCarReviews() {
    return [
        {
            name: 'Maria Santos',
            rating: 5,
            date: '2 weeks ago',
            comment: 'Excellent car! Very clean and reliable. Perfect for our family trip to Tagaytay. The pickup process was smooth and the staff was very helpful.'
        },
        {
            name: 'John Cruz',
            rating: 4,
            date: '1 month ago',
            comment: 'Good experience overall. The car was in great condition and fuel efficient. Only minor issue was the pickup location was a bit hard to find initially.'
        },
        {
            name: 'Anna Reyes',
            rating: 5,
            date: '1 month ago',
            comment: 'Highly recommend! Used this car for a business trip and it was perfect. Professional service and competitive pricing. Will definitely book again.'
        }
    ];
}

// Setup booking date validation
function setupBookingDateValidation() {
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    pickupDate.min = today;
    
    pickupDate.addEventListener('change', function() {
        returnDate.min = this.value || today;
        if (returnDate.value && returnDate.value < this.value) {
            returnDate.value = this.value;
        }
        updatePricing();
    });
    
    returnDate.addEventListener('change', updatePricing);
}

// Update pricing based on selected dates
function updatePricing() {
    const pickupDate = document.getElementById('pickup-date').value;
    const returnDate = document.getElementById('return-date').value;
    
    if (!pickupDate || !returnDate) return;
    
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD - pickup);
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const basePrice = currentCar.price * diffDays;
    const serviceFee = 200;
    const totalPrice = basePrice + serviceFee;
    
    document.getElementById('base-price').textContent = `₱${basePrice.toLocaleString()}`;
    document.getElementById('duration').textContent = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    document.getElementById('total-price').textContent = `₱${totalPrice.toLocaleString()}`;
}

// Update mobile booking widget
function updateBookingWidget() {
    document.getElementById('widget-car-name').textContent = currentCar.name;
    document.getElementById('widget-price').textContent = `₱${currentCar.price.toLocaleString()}/day`;
}

// Handle booking form submission
function handleBookingSubmit(event) {
    event.preventDefault();

    // Check if user is signed in
    const user = window.rideflex.loadFromStorage('rideflex_user');
    if (!user) {
        window.rideflex.showToast('You must be signed in to book a car.', 'warning');
        if (typeof window.rideflex.openAuthModal === 'function') {
            window.rideflex.openAuthModal();
        }
        return;
    }

    const formData = new FormData(event.target);
    const bookingData = {
        carId: currentCar.id,
        pickupDate: document.getElementById('pickup-date').value,
        pickupTime: document.getElementById('pickup-time').value,
        returnDate: document.getElementById('return-date').value,
        returnTime: document.getElementById('return-time').value,
        pickupLocation: document.getElementById('pickup-location').value
    };

    // Validate required fields
    if (!bookingData.pickupDate || !bookingData.pickupTime || 
        !bookingData.returnDate || !bookingData.returnTime || 
        !bookingData.pickupLocation) {
        window.rideflex.showToast('Please fill in all booking details', 'error');
        return;
    }

    // Save booking data and redirect to checkout
    window.rideflex.saveToStorage('pending_booking', bookingData);
    window.location.href = `booking-checkout.html?id=${currentCar.id}`;
}

// Proceed to booking from mobile widget
function proceedToBooking() {
    // Scroll to booking form on desktop, or show modal on mobile
    if (window.innerWidth < 768) {
        window.rideflex.showToast('Please fill in the booking details above', 'info');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        document.querySelector('.sticky').scrollIntoView({ behavior: 'smooth' });
    }
}

// Export functions for global access
window.initializeCarDetails = initializeCarDetails;
window.handleBookingSubmit = handleBookingSubmit;
window.proceedToBooking = proceedToBooking;