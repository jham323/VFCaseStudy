// Create an Intersection Observer to handle element animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Get all elements that need animation
        const animatedElements = document.querySelectorAll('.dev-subsection, .learning-item, .cta-card');
        
        if (animatedElements.length > 0) {
            // Observe each element
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Add parallax effect to sections
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    // Parallax for development section
                    const devSection = document.querySelector('.development');
                    const devCards = devSection?.querySelectorAll('.dev-subsection');
                    if (devCards?.length) {
                        devCards.forEach((card, index) => {
                            const speed = 1 + (index * 0.1);
                            const yPos = -(scrolled * speed * 0.02);
                            card.style.transform = `translateY(${yPos}px) translateZ(${yPos * 2}px)`;
                        });
                    }

                    // Parallax for learning section
                    const learningSection = document.querySelector('.learnings');
                    const learningCards = learningSection?.querySelectorAll('.learning-item');
                    if (learningCards?.length) {
                        learningCards.forEach((card, index) => {
                            const speed = 1 + (index * 0.15);
                            const yPos = -(scrolled * speed * 0.015);
                            card.style.transform = `translateY(${yPos}px)`;
                        });
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}); 