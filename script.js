document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const gameFrame = document.getElementById('game-frame');
    const fullscreenButton = document.getElementById('play-fullscreen');
    const newsletterForm = document.getElementById('newsletter-form');
    const learningItems = document.querySelectorAll('.learning-item');
    const devSubsections = document.querySelectorAll('.dev-subsection');
    
    // Handle fullscreen functionality
    fullscreenButton.addEventListener('click', function() {
        if (gameFrame.requestFullscreen) {
            gameFrame.requestFullscreen();
        } else if (gameFrame.webkitRequestFullscreen) { // Safari
            gameFrame.webkitRequestFullscreen();
        } else if (gameFrame.msRequestFullscreen) { // IE11
            gameFrame.msRequestFullscreen();
        }
    });
    
    // Enhanced parallax effect for grid background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const gridBackground = document.querySelector('.grid-background');
        
        // Move the grid as user scrolls with a subtle wave effect
        gridBackground.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrollPosition * 0.1}px) translateX(${Math.sin(scrollPosition * 0.003) * 10}px)`;
        
        // Add subtle color shift based on scroll position
        const hue = 260 + (scrollPosition * 0.02 % 20); // Subtle hue shift around purple
        gridBackground.style.filter = `hue-rotate(${hue}deg)`;
    });
    
    // Handle newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would typically send this to a backend service
            console.log('Email submitted:', email);
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.backgroundColor = 'var(--neon-green)';
            button.style.borderColor = 'var(--neon-green)';
            
            // Reset form
            emailInput.value = '';
            
            // Reset button after 3 seconds
            setTimeout(function() {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                button.style.borderColor = '';
            }, 3000);
        });
    }
    
    // Enhanced animations for learning items on scroll
    const animateLearningItems = function() {
        learningItems.forEach(function(item, index) {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                // Add staggered delay for each item
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
        
        devSubsections.forEach(function(item, index) {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                // Add staggered delay for each item
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
    };
    
    // Initially check if items are in view
    animateLearningItems();
    
    // Check again on scroll
    window.addEventListener('scroll', animateLearningItems);
    
    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create dynamic star background
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const starCount = 150; // Increased star count
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size with more variety
            const size = Math.random() * 3 + 0.5;
            
            // Random opacity
            const opacity = Math.random() * 0.8 + 0.2;
            
            // Random color (occasional colored stars)
            const colors = ['#fff', '#fff', '#fff', '#fff', '#01cdfe', '#ff71ce', '#fffb96'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random twinkle animation
            const animationDuration = 3 + Math.random() * 7;
            
            // Apply styles
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = opacity;
            star.style.backgroundColor = color;
            star.style.animation = `twinkle ${animationDuration}s infinite alternate`;
            
            // Add to container
            starsContainer.appendChild(star);
        }
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
        }
        
        .dev-subsection, .learning-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .dev-subsection.animate, .learning-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        
        /* Add a subtle pulse effect to the game container */
        .game-container {
            animation: pulse-border 4s infinite;
        }
        
        @keyframes pulse-border {
            0%, 100% { border-color: var(--neon-purple); }
            50% { border-color: var(--neon-blue); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize stars
    createStars();
    
    // Create "trails" effect on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.9) { // Only create a trail particle 10% of the time to avoid too many particles
            const trail = document.createElement('div');
            trail.classList.add('mouse-trail');
            document.body.appendChild(trail);
            
            // Position at mouse
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            
            // Random size
            const size = Math.random() * 10 + 5;
            trail.style.width = `${size}px`;
            trail.style.height = `${size}px`;
            
            // Random color from our theme
            const colors = ['var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-pink)'];
            trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Animate and remove
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
                setTimeout(() => {
                    trail.remove();
                }, 500);
            }, 10);
        }
    });
    
    // Add mouse trail style
    const mouseTrailStyle = document.createElement('style');
    mouseTrailStyle.textContent = `
        .mouse-trail {
            position: fixed;
            pointer-events: none;
            border-radius: 50%;
            opacity: 0.7;
            z-index: 10000;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(mouseTrailStyle);
}); 