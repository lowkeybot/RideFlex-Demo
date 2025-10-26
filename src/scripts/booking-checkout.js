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
// Booking Checkout Page JavaScript

let currentCar = null;
let bookingData = null;
let currentStep = 'details';

// Initialize booking checkout page
function initializeBookingCheckout() {
    const carId = window.rideflex.getUrlParameter('id');
    if (!carId) {
        showBookingError('Invalid booking session');
        return;
    }
    
    currentCar = window.rideflex.getCarById(parseInt(carId));
    if (!currentCar) {
        showBookingError('Car not found');
        return;
    }
    
    // Load booking data from storage or URL parameters
    bookingData = window.rideflex.loadFromStorage('pending_booking');
    if (!bookingData || bookingData.carId !== currentCar.id) {
        // Create booking data from URL parameters if not found in storage
        bookingData = {
            carId: currentCar.id,
            pickupDate: window.rideflex.getUrlParameter('pickupDate'),
            pickupTime: window.rideflex.getUrlParameter('pickupTime'),
            returnDate: window.rideflex.getUrlParameter('returnDate'),
            returnTime: window.rideflex.getUrlParameter('returnTime'),
            pickupLocation: window.rideflex.getUrlParameter('pickupLocation')
        };
    }
    
    // Update breadcrumb
    document.getElementById('car-name-breadcrumb').textContent = currentCar.name;
    
    renderCheckout();
}

// Show booking error
function showBookingError(message) {
    const container = document.getElementById('checkout-container');
    container.innerHTML = `
        <div class="text-center py-12">
            <div class="text-6xl mb-4">⚠️</div>
            <h2 class="text-2xl font-bold text-white mb-2">Booking Error</h2>
            <p class="text-orange-200 mb-6">${message}</p>
            <a href="cars.html" class="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors inline-block">
                Browse Cars
            </a>
        </div>
    `;
}

// Render checkout
function renderCheckout() {
    const container = document.getElementById('checkout-container');
    const categoryEmoji = {
        'Sedan': '🚗',
        'SUV': '🚙',
        'Van': '🚐'
    };
    
    container.innerHTML = `
        <div class="grid lg:grid-cols-3 gap-8">
            <!-- Main Checkout Form -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Car Summary -->
                <div class="bg-white rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Your Selected Car</h3>
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                            <span class="text-2xl">${categoryEmoji[currentCar.category] || '🚗'}</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-semibold text-gray-900">${currentCar.name}</h4>
                            <p class="text-gray-600">${currentCar.category} • ${currentCar.location}</p>
                            <div class="flex items-center space-x-1 mt-1">
                                <svg class="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                <span class="text-sm text-gray-600">${currentCar.rating} rating</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-orange-500">₱${currentCar.price.toLocaleString()}</div>
                            <div class="text-sm text-gray-600">/day</div>
                        </div>
                    </div>
                </div>

                <!-- Booking Details Form -->
                <div class="bg-white rounded-lg p-6">
                    <h3 class="text-lg font-semibold mb-4">Booking Details</h3>
                    <form class="space-y-4" onsubmit="proceedToPayment(event)">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Pickup Date</label>
                                <div class="w-full p-3 border border-gray-100 rounded-lg bg-gray-50 text-gray-700">${bookingData.pickupDate || '-'}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Pickup Time</label>
                                <div class="w-full p-3 border border-gray-100 rounded-lg bg-gray-50 text-gray-700">${bookingData.pickupTime || '-'}</div>
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Return Date</label>
                                <div class="w-full p-3 border border-gray-100 rounded-lg bg-gray-50 text-gray-700">${bookingData.returnDate || '-'}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Return Time</label>
                                <div class="w-full p-3 border border-gray-100 rounded-lg bg-gray-50 text-gray-700">${bookingData.returnTime || '-'}</div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Pickup Location</label>
                            <div class="w-full p-3 border border-gray-100 rounded-lg bg-gray-50 text-gray-700">${bookingData.pickupLocation || '-'}</div>
                        </div>

                        <!-- Optional Services -->
                        <div>
                            <h4 class="text-base font-medium mb-3">Optional Services</h4>
                            <div class="space-y-3">
                                <label class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div class="flex items-center space-x-3">
                                        <input type="checkbox" name="services" value="driver" class="rounded border-gray-300" onchange="updatePricing()">
                                        <div>
                                            <div class="font-medium">Professional Driver</div>
                                            <div class="text-sm text-gray-600">Experienced driver included for your trip</div>
                                        </div>
                                    </div>
                                    <span class="font-medium text-orange-500">₱800/day</span>
                                </label>
                                
                                <label class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div class="flex items-center space-x-3">
                                        <input type="checkbox" name="services" value="gps" class="rounded border-gray-300" onchange="updatePricing()">
                                        <div>
                                            <div class="font-medium">GPS Navigation</div>
                                            <div class="text-sm text-gray-600">Built-in GPS device for easy navigation</div>
                                        </div>
                                    </div>
                                    <span class="font-medium text-orange-500">₱150/day</span>
                                </label>
                                
                                <label class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div class="flex items-center space-x-3">
                                        <input type="checkbox" name="services" value="child-seat" class="rounded border-gray-300" onchange="updatePricing()">
                                        <div>
                                            <div class="font-medium">Child Safety Seat</div>
                                            <div class="text-sm text-gray-600">Safety seat for children (specify age)</div>
                                        </div>
                                    </div>
                                    <span class="font-medium text-orange-500">₱200/day</span>
                                </label>
                            </div>
                        </div>

                        <!-- Customer Information -->
                        <div>
                            <h4 class="text-base font-medium mb-3">Contact Information</h4>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Full Name</label>
                                    <input type="text" id="customer-name" class="w-full p-3 border border-gray-300 rounded-lg" 
                                           placeholder="Your full name" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Email Address</label>
                                    <input type="email" id="customer-email" class="w-full p-3 border border-gray-300 rounded-lg" 
                                           placeholder="your.email@example.com" required>
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">Phone Number</label>
                                    <input type="tel" id="customer-phone" class="w-full p-3 border border-gray-300 rounded-lg" 
                                           placeholder="+63 9XX XXX XXXX" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">Driver's License</label>
                                    <input type="text" id="license-number" class="w-full p-3 border border-gray-300 rounded-lg" 
                                           placeholder="License number" required>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors">
                            Continue to Payment
                        </button>
                    </form>
                </div>

                <!-- Payment Methods -->
                <div id="payment-section" class="bg-white rounded-lg p-6 hidden">
                    <h3 class="text-lg font-semibold mb-4">Payment Method</h3>
                    <div class="space-y-3">
                        <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="payment" value="gcash" class="mr-3">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
                                <span class="font-medium">GCash</span>
                            </div>
                        </label>
                        
                        <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="payment" value="paymaya" class="mr-3">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">PM</div>
                                <span class="font-medium">PayMaya</span>
                            </div>
                        </label>
                        
                        <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="payment" value="credit-card" class="mr-3">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">CC</div>
                                <span class="font-medium">Credit/Debit Card</span>
                            </div>
                        </label>
                        
                        <label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="radio" name="payment" value="bank-transfer" class="mr-3">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-gray-500 rounded flex items-center justify-center text-white text-xs font-bold">BT</div>
                                <span class="font-medium">Bank Transfer</span>
                            </div>
                        </label>
                    </div>
                    
                    <div class="mt-6 space-y-4">
                        <button onclick="completeBooking()" class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors">
                            Complete Booking
                        </button>
                        <button onclick="backToDetails()" class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            Back to Details
                        </button>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg p-6 sticky top-24">
                    <h3 class="text-lg font-semibold mb-4">Booking Summary</h3>
                    
                    <div class="space-y-3 text-sm">
                        <div class="flex justify-between">
                            <span>Car rental</span>
                            <span id="car-rental-cost">₱${currentCar.price.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Duration</span>
                            <span id="rental-duration">1 day</span>
                        </div>
                        <div id="services-cost" class="hidden">
                            <div class="flex justify-between">
                                <span>Additional services</span>
                                <span id="services-total">₱0</span>
                            </div>
                        </div>
                        <div class="flex justify-between text-gray-600">
                            <span>Service fee</span>
                            <span>₱200</span>
                        </div>
                        <div class="flex justify-between text-gray-600">
                            <span>Insurance</span>
                            <span>Included</span>
                        </div>
                        <div class="border-t border-gray-200 pt-3">
                            <div class="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span id="total-cost" class="text-orange-500">₱${(currentCar.price + 200).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 space-y-2 text-xs text-gray-600">
                        <div class="flex items-center space-x-2">
                            <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Free cancellation up to 24 hours</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Fully insured & protected</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>24/7 customer support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupPricingCalculation();
}

// Setup pricing calculation
function setupPricingCalculation() {
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');
    
    pickupDate.addEventListener('change', updatePricing);
    returnDate.addEventListener('change', updatePricing);
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    pickupDate.min = today;
    
    pickupDate.addEventListener('change', function() {
        returnDate.min = this.value || today;
        if (returnDate.value && returnDate.value < this.value) {
            returnDate.value = this.value;
        }
    });
    
    updatePricing();
}

// Update pricing based on selections
function updatePricing() {
    const pickupDate = document.getElementById('pickup-date')?.value;
    const returnDate = document.getElementById('return-date')?.value;
    const selectedServices = document.querySelectorAll('input[name="services"]:checked');
    
    let days = 1;
    if (pickupDate && returnDate) {
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const diffTime = Math.abs(returnD - pickup);
        days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    
    const carCost = currentCar.price * days;
    let servicesCost = 0;
    
    selectedServices.forEach(service => {
        switch(service.value) {
            case 'driver':
                servicesCost += 800 * days;
                break;
            case 'gps':
                servicesCost += 150 * days;
                break;
            case 'child-seat':
                servicesCost += 200 * days;
                break;
        }
    });
    
    const serviceFee = 200;
    const total = carCost + servicesCost + serviceFee;
    
    // Update UI
    document.getElementById('car-rental-cost').textContent = `₱${carCost.toLocaleString()}`;
    document.getElementById('rental-duration').textContent = `${days} day${days > 1 ? 's' : ''}`;
    
    const servicesCostElement = document.getElementById('services-cost');
    if (servicesCost > 0) {
        servicesCostElement.classList.remove('hidden');
        document.getElementById('services-total').textContent = `₱${servicesCost.toLocaleString()}`;
    } else {
        servicesCostElement.classList.add('hidden');
    }
    
    document.getElementById('total-cost').textContent = `₱${total.toLocaleString()}`;
}

// Proceed to payment step
function proceedToPayment(event) {
    event.preventDefault();
    
    // Validate form
    const form = event.target;
    if (!form.checkValidity()) {
        window.rideflex.showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Hide booking form, show payment form
    form.parentElement.style.display = 'none';
    document.getElementById('payment-section').classList.remove('hidden');
    
    // Update progress
    updateProgress(3);
    
    currentStep = 'payment';
    window.rideflex.showToast('Please select a payment method', 'info');
}

// Back to details step
function backToDetails() {
    document.getElementById('payment-section').classList.add('hidden');
    document.getElementById('payment-section').previousElementSibling.style.display = 'block';
    
    // Update progress
    updateProgress(2);
    
    currentStep = 'details';
}

// Update progress indicators
function updateProgress(step) {
    const steps = document.querySelectorAll('.w-8.h-8');
    const connectors = document.querySelectorAll('.w-8.h-0\\.5');
    
    steps.forEach((stepEl, index) => {
        if (index < step - 1) {
            stepEl.className = stepEl.className.replace(/bg-\w+-\d+/, 'bg-green-500');
        } else if (index === step - 1) {
            stepEl.className = stepEl.className.replace(/bg-\w+-\d+/, 'bg-orange-300');
        } else {
            stepEl.className = stepEl.className.replace(/bg-\w+-\d+/, 'bg-gray-300');
        }
    });
    
    connectors.forEach((conn, index) => {
        if (index < step - 1) {
            conn.className = conn.className.replace(/bg-\w+-\d+/, 'bg-green-500');
        } else {
            conn.className = conn.className.replace(/bg-\w+-\d+/, 'bg-gray-300');
        }
    });
}

// Complete booking
function completeBooking() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    
    if (!selectedPayment) {
        window.rideflex.showToast('Please select a payment method', 'error');
        return;
    }
    
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Save booking to localStorage
        const finalBooking = {
            id: Date.now(),
            carId: currentCar.id,
            carName: currentCar.name,
            customerName: document.getElementById('customer-name').value,
            customerEmail: document.getElementById('customer-email').value,
            customerPhone: document.getElementById('customer-phone').value,
            licenseNumber: document.getElementById('license-number').value,
            pickupDate: document.getElementById('pickup-date').value,
            pickupTime: document.getElementById('pickup-time').value,
            returnDate: document.getElementById('return-date').value,
            returnTime: document.getElementById('return-time').value,
            pickupLocation: document.getElementById('pickup-location').value,
            services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(s => s.value),
            paymentMethod: selectedPayment.value,
            totalCost: document.getElementById('total-cost').textContent,
            status: 'confirmed',
            bookingDate: new Date().toISOString()
        };
        
        // Save to localStorage
        const bookings = JSON.parse(localStorage.getItem('rideflex_bookings') || '[]');
        bookings.push(finalBooking);
        localStorage.setItem('rideflex_bookings', JSON.stringify(bookings));
        
        // Clear pending booking
        localStorage.removeItem('pending_booking');
        
        // Show success modal
        document.getElementById('success-modal').classList.remove('hidden');
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
    }, 3000);
}

// Close success modal and redirect
function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
    // In a real app, this would redirect to booking details page
    window.location.href = 'index.html';
}

// Go to homepage
function goToHomepage() {
    window.location.href = 'index.html';
}

// Export functions for global access
window.initializeBookingCheckout = initializeBookingCheckout;
window.proceedToPayment = proceedToPayment;
window.backToDetails = backToDetails;
window.completeBooking = completeBooking;
window.closeSuccessModal = closeSuccessModal;
window.goToHomepage = goToHomepage;
window.updatePricing = updatePricing;