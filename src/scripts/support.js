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
// Support Page JavaScript

// FAQ data
const faqItems = [
    {
        question: "How do I book a car?",
        answer: "You can book a car through our website or mobile app. Simply search for available cars in your area, select your preferred vehicle, choose your rental period, and complete the booking with payment."
    },
    {
        question: "What documents do I need to rent a car?",
        answer: "You need a valid Philippine driver's license, a government-issued ID, and a credit card or debit card for payment. International visitors need an International Driving Permit along with their home country license."
    },
    {
        question: "Can I cancel or modify my booking?",
        answer: "Yes, you can cancel or modify your booking up to 24 hours before your pickup time without any cancellation fee. Changes made within 24 hours may incur additional charges."
    },
    {
        question: "What happens if the car breaks down?",
        answer: "Call our emergency roadside assistance at +63 917 123 4567 immediately. We'll provide immediate support and arrange for a replacement vehicle if needed. You won't be charged for mechanical failures."
    },
    {
        question: "How is the rental fee calculated?",
        answer: "Rental fees are calculated based on the duration (hourly or daily), car category, and any additional services you select. All fees are displayed upfront with no hidden charges."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards (Visa, Mastercard), debit cards, GCash, PayMaya, and bank transfers. Payment is required at the time of booking."
    },
    {
        question: "Is insurance included?",
        answer: "Yes, all our vehicles come with comprehensive insurance coverage. This includes third-party liability and vehicle damage protection. Additional coverage options are available."
    },
    {
        question: "Can I extend my rental period?",
        answer: "Yes, you can extend your rental through the app or by calling our support team, subject to vehicle availability. Extension rates will apply for the additional time."
    },
    {
        question: "What if I return the car late?",
        answer: "Late returns incur additional charges based on our hourly rates. We recommend contacting us if you anticipate being late to avoid any surprises."
    },
    {
        question: "Are there age restrictions for renting?",
        answer: "Yes, you must be at least 21 years old to rent a car. Drivers under 25 may be subject to additional fees and restrictions on certain vehicle categories."
    },
    {
        question: "Can I add additional drivers?",
        answer: "Yes, additional drivers can be added to your booking. Each additional driver must meet our driver requirements and will be subject to additional fees."
    },
    {
        question: "What fuel policy do you have?",
        answer: "Our vehicles are provided with a full tank of fuel. You can return the vehicle with any fuel level, and we'll charge you for the fuel used at competitive market rates."
    }
];

// Office locations data
const officeLocations = [
    {
        name: "BGC Head Office",
        address: "26th Street, Bonifacio Global City, Taguig",
        hours: "7:00 AM - 10:00 PM",
        phone: "+63 2 8123 4567"
    },
    {
        name: "Makati Branch",
        address: "Ayala Avenue, Makati City",
        hours: "7:00 AM - 9:00 PM",
        phone: "+63 2 8234 5678"
    },
    {
        name: "Ortigas Center",
        address: "EDSA, Ortigas Center, Pasig City",
        hours: "8:00 AM - 8:00 PM",
        phone: "+63 2 8345 6789"
    },
    {
        name: "Cebu Office",
        address: "IT Park, Lahug, Cebu City",
        hours: "8:00 AM - 7:00 PM",
        phone: "+63 32 123 4567"
    }
];

let currentFAQItems = [...faqItems];

// Initialize support page
function initializeSupport() {
    renderFAQ();
    renderLocations();
    setupTabStyles();
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
    
    // Add active class to selected tab
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Setup tab styles
function setupTabStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tab-button {
            padding: 1rem 1.5rem;
            border-bottom: 2px solid transparent;
            font-medium;
            color: #6B7280;
            transition: all 0.2s ease;
            background: none;
            border-top: none;
            border-left: none;
            border-right: none;
            cursor: pointer;
        }
        
        .tab-button:hover {
            color: #FF9900;
            border-bottom-color: #FED7AA;
        }
        
        .tab-button.active {
            color: #FF9900;
            border-bottom-color: #FF9900;
        }
    `;
    document.head.appendChild(style);
}

// Render FAQ items
function renderFAQ() {
    const faqList = document.getElementById('faq-list');
    
    if (currentFAQItems.length === 0) {
        faqList.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-500">No FAQ items match your search.</p>
            </div>
        `;
        return;
    }
    
    faqList.innerHTML = currentFAQItems.map((item, index) => `
        <div class="border border-gray-200 rounded-lg">
            <button class="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                    onclick="toggleFAQ(${index})">
                <span class="font-medium text-gray-900">${item.question}</span>
                <svg id="faq-icon-${index}" class="h-5 w-5 text-gray-500 transform transition-transform" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="faq-answer-${index}" class="hidden px-4 pb-4">
                <div class="text-gray-600 border-t border-gray-100 pt-4">
                    ${item.answer}
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle FAQ item
function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    
    const isHidden = answer.classList.contains('hidden');
    
    // Close all other FAQ items
    document.querySelectorAll('[id^="faq-answer-"]').forEach(el => {
        el.classList.add('hidden');
    });
    document.querySelectorAll('[id^="faq-icon-"]').forEach(el => {
        el.classList.remove('rotate-180');
    });
    
    if (isHidden) {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-180');
    }
}

// Search FAQ
function searchFAQ() {
    const query = document.getElementById('faq-search').value.toLowerCase();
    
    if (query === '') {
        currentFAQItems = [...faqItems];
    } else {
        currentFAQItems = faqItems.filter(item =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        );
    }
    
    renderFAQ();
}

// Render office locations
function renderLocations() {
    const locationsList = document.getElementById('locations-list');
    
    locationsList.innerHTML = officeLocations.map(location => `
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center space-x-2 mb-4">
                <svg class="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="text-xl font-semibold text-gray-900">${location.name}</h3>
            </div>
            <div class="space-y-3">
                <div>
                    <div class="text-sm text-gray-600 font-medium">Address</div>
                    <div class="text-gray-900">${location.address}</div>
                </div>
                <div>
                    <div class="text-sm text-gray-600 font-medium">Operating Hours</div>
                    <div class="flex items-center space-x-2">
                        <svg class="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-gray-900">${location.hours}</span>
                    </div>
                </div>
                <div>
                    <div class="text-sm text-gray-600 font-medium">Phone</div>
                    <div class="flex items-center space-x-2">
                        <svg class="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:${location.phone}" class="text-orange-500 hover:text-orange-600 font-medium">
                            ${location.phone}
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100">
                <button class="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Get Directions
                </button>
            </div>
        </div>
    `).join('');
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!data.name || !data.email || !data.subject || !data.message) {
        window.rideflex.showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!window.rideflex.validateEmail || !window.rideflex.validateEmail(data.email)) {
        window.rideflex.showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = `
        <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
    `;
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        event.target.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        window.rideflex.showToast('Message sent successfully! We\'ll get back to you within 2 hours.', 'success');
        
        // Save to localStorage for demo purposes
        const messages = JSON.parse(localStorage.getItem('rideflex_messages') || '[]');
        messages.push({
            ...data,
            timestamp: new Date().toISOString(),
            status: 'received'
        });
        localStorage.setItem('rideflex_messages', JSON.stringify(messages));
        
    }, 2000);
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .rotate-180 {
            transform: rotate(180deg);
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
});

// Export functions for global access
window.initializeSupport = initializeSupport;
window.showTab = showTab;
window.toggleFAQ = toggleFAQ;
window.searchFAQ = searchFAQ;
window.handleContactSubmit = handleContactSubmit;