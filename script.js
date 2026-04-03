document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const mobileInput = document.getElementById('mobileNumber');

    // 1. Password Visibility Toggle functionality
    togglePasswordBtn.addEventListener('click', () => {
        // Toggle input type
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update label text
        togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
        
        // Add subtle pop animation to the button
        togglePasswordBtn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0.9)' },
            { transform: 'scale(1)' }
        ], {
            duration: 150,
            easing: 'ease-in-out'
        });
    });

    // 2. Ripple Effect for Submit Button
    submitBtn.addEventListener('click', function(e) {
        // Simple validation check before animation if desired 
        // We let it animate either way for better feedback
        this.classList.remove('animating');
        void this.offsetWidth; // trigger reflow
        this.classList.add('animating');
    });

    // 3. Form Submission Handling (Mock behavior)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent traditional form submit causing page refresh
        
        const mobileNumber = mobileInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (mobileNumber && password) {
            // Save initial innerHTML so we can restore it later
            const originalHTML = submitBtn.innerHTML;
            
            // Inject Loading State
            submitBtn.innerHTML = `
                <span>VERIFYING...</span>
                <svg class="btn-icon animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;
            
            // Disable button
            submitBtn.style.opacity = '0.9';
            submitBtn.style.pointerEvents = 'none';

            // Simulate Network Request Delay
            setTimeout(() => {
                // Success State Transformation
                submitBtn.style.backgroundColor = '#10B981'; // Green
                submitBtn.innerHTML = `
                    <span>LOGIN SUCCESSFUL</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="btn-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                `;
                
                // Show Alert and Reset
                setTimeout(() => {
                    alert(`Login Successful!\nWelcome back to the FIR Tracking System, mobile format verified: ${mobileNumber}.`);
                    
                    // Reset styling and form
                    submitBtn.style.backgroundColor = '';
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'all';
                    loginForm.reset();
                    // Reset password text
                    passwordInput.setAttribute('type', 'password');
                    togglePasswordBtn.textContent = 'Show';
                }, 600);

            }, 1800); // 1.8 seconds loading screen
        }
    });

    // 4. Mobile Number Filtering Configuration
    // Only allows digits to be written into the mobile input field
    mobileInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); 
    });
});
