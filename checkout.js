// Mucoki Payment Information
const MUCOKI_PAYMENT = {
    cardNumber: "4890010100591001",
    displayNumber: "1001",
    cardName: "M Ú C O K I Card",
    cardType: "M Ú C O K I Card",
    contactEmail: "contactmucoki@gmail.com"
};

// Display Payment Information in Checkout
function displayPaymentInfo() {
    document.getElementById('displayCardNumber').textContent = MUCOKI_PAYMENT.displayNumber;
}

// Handle Checkout Form Submission
const checkoutForm = document.getElementById('checkoutForm');

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate cart
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Get form values
    const formData = new FormData(checkoutForm);
    const customerInfo = {
        name: checkoutForm.elements[0].value,
        email: checkoutForm.elements[1].value,
        phone: checkoutForm.elements[2].value,
        address: checkoutForm.elements[3].value,
        city: checkoutForm.elements[4].value,
        postalCode: checkoutForm.elements[5].value,
        agreedToTerms: checkoutForm.elements[6].checked
    };

    // Validate required fields
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || 
        !customerInfo.address || !customerInfo.city || !customerInfo.postalCode) {
        alert('Please fill in all required fields');
        return;
    }

    if (!customerInfo.agreedToTerms) {
        alert('Please agree to the terms and conditions');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Process payment
    processPayment(customerInfo);
});

// Process Payment with M Ú C O K I Card
function processPayment(customerInfo) {
    // Show loading state
    const payBtn = checkoutForm.querySelector('.pay-btn');
    const originalText = payBtn.textContent;
    payBtn.disabled = true;
    payBtn.textContent = 'Processing...';

    // Simulate payment processing
    setTimeout(() => {
        // Calculate totals
        const { subtotal, tax, total } = calculateTotals();

        // Create order summary
        const order = {
            orderId: generateOrderId(),
            timestamp: new Date().toLocaleString(),
            customer: customerInfo,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            })),
            subtotal: subtotal,
            tax: tax,
            total: total,
            paymentMethod: MUCOKI_PAYMENT,
            status: 'Completed'
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('mucoki_orders')) || [];
        orders.push(order);
        localStorage.setItem('mucoki_orders', JSON.stringify(orders));

        // Send email notification
        sendOrderConfirmation(order);

        // Show success message
        showPaymentSuccess(order);

        // Reset form
        checkoutForm.reset();
        payBtn.disabled = false;
        payBtn.textContent = originalText;

        // Close checkout modal
        document.getElementById('checkoutModal').classList.remove('show');

        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
    }, 2000);
}

// Send Order Confirmation Email
function sendOrderConfirmation(order) {
    // Create email content
    const emailContent = {
        to: order.customer.email,
        cc: MUCOKI_PAYMENT.contactEmail,
        subject: `M Ú C O K I - Order Confirmation #${order.orderId}`,
        message: `
Thank you for your order!

Order ID: ${order.orderId}
Order Date: ${order.timestamp}

Customer Information:
Name: ${order.customer.name}
Email: ${order.customer.email}
Phone: ${order.customer.phone}
Address: ${order.customer.address}, ${order.customer.city} ${order.customer.postalCode}

Items Ordered:
${order.items.map(item => `- ${item.name} x${item.quantity}: $${item.subtotal.toFixed(2)}`).join('\n')}

Order Summary:
Subtotal: $${order.subtotal.toFixed(2)}
Tax (10%): $${order.tax.toFixed(2)}
Total: $${order.total.toFixed(2)}

Payment Method: ${order.paymentMethod.cardType}
Card: **** **** **** ${order.paymentMethod.displayNumber}

Status: ${order.status}

For inquiries, please contact us at: ${MUCOKI_PAYMENT.contactEmail}

Thank you for choosing M Ú C O K I!
        `
    };

    // Log email for demo purposes
    console.log('📧 Order Confirmation Email:', emailContent);
    
    // In production, this would send via an email service (SendGrid, Mailgun, etc.)
    // For now, we'll store it in localStorage for reference
    const emailLogs = JSON.parse(localStorage.getItem('mucoki_emails')) || [];
    emailLogs.push(emailContent);
    localStorage.setItem('mucoki_emails', JSON.stringify(emailLogs));
}

// Generate Order ID
function generateOrderId() {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `MK-${timestamp}-${random}`;
}

// Show Payment Success
function showPaymentSuccess(order) {
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage');

    successMessage.innerHTML = `
        <strong>Order ID: ${order.orderId}</strong><br>
        <br>
        Total Amount: <strong>$${order.total.toFixed(2)}</strong><br>
        <br>
        Payment Method: ${order.paymentMethod.cardType} (****${MUCOKI_PAYMENT.displayNumber})<br>
        <br>
        Confirmation sent to:<br>
        <strong>${order.customer.email}</strong><br>
        <br>
        Also notified:<br>
        <strong>${MUCOKI_PAYMENT.contactEmail}</strong>
    `;

    successModal.classList.add('show');
}

// Continue Shopping Button
document.getElementById('continueShoppingBtn').addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize payment display
document.addEventListener('DOMContentLoaded', () => {
    displayPaymentInfo();
});

// Export order data for admin/verification
function getOrders() {
    return JSON.parse(localStorage.getItem('mucoki_orders')) || [];
}

function getEmailLogs() {
    return JSON.parse(localStorage.getItem('mucoki_emails')) || [];
}

// Log payment details for testing
console.log('M Ú C O K I Payment System Initialized');
console.log('Payment Card Number:', MUCOKI_PAYMENT.cardNumber);
console.log('Card Display:', `**** **** **** ${MUCOKI_PAYMENT.displayNumber}`);
console.log('Contact Email:', MUCOKI_PAYMENT.contactEmail);

// Add Payment Information to Window for Testing/Admin Access
window.MUCOKI_ADMIN = {
    paymentCard: MUCOKI_PAYMENT.cardNumber,
    contactEmail: MUCOKI_PAYMENT.contactEmail,
    getAllOrders: getOrders,
    getEmailLogs: getEmailLogs,
    getTotalRevenue: () => {
        const orders = getOrders();
        return orders.reduce((sum, order) => sum + order.total, 0);
    },
    getOrderCount: () => getOrders().length,
    getEmailCount: () => getEmailLogs().length
};

// Verify Payment System
console.log('%cM Ú C O K I Payment System', 'color: #d4af37; font-size: 14px; font-weight: bold;');
console.log('%cPayment Card: ' + MUCOKI_PAYMENT.cardNumber, 'color: #d4af37; font-size: 12px;');
console.log('%cContact Email: ' + MUCOKI_PAYMENT.contactEmail, 'color: #51cf66; font-size: 12px;');
console.log('%cSystem Ready', 'color: #51cf66; font-size: 12px;');
