// static/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Flash message fade out
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.style.display = 'none';
            }, 500);
        }, 3000);
    });

    // Add current year to footer
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('{{ now.year }}', currentYear);
    }

    // Add smooth scroll for "Get Started" button
    const getStartedBtn = document.querySelector('.primary-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.features').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
});
