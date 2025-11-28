// Zenchmark Site Scripts
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const d = new Date().toISOString().slice(0,10);
  const ids = ['pp-date','tc-date','rp-date'];
  ids.forEach(id=>{ const el = document.getElementById(id); if (el) el.textContent = d; });

  // Namespace for contact form
  window.Zenchmark = window.Zenchmark || {};
  window.Zenchmark.submitForm = function(e){
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    status.textContent = 'Submitting...';
    // Demo only – in production integrate with backend or form service
    setTimeout(()=>{
      status.textContent = 'Thanks! We\'ll reach out shortly.';
      form.reset();
    }, 700);
    return false;
  };

  // ========== ANIMATED LAYOUT SCRIPTS ==========
  
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Trigger counter animation if section has counters
        if (entry.target.querySelector('.animate-counters')) {
          animateCounters(entry.target);
        }
        
        // Only observe once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated sections
  document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
  });

  // Counter Animation
  function animateCounters(section) {
    const counters = section.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Duplicate testimonials for infinite scroll effect
  const testimonialTrack = document.querySelector('.testimonial-track');
  if (testimonialTrack) {
    const cards = testimonialTrack.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      testimonialTrack.appendChild(clone);
    });
  }

  // Parallax effect on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        // Parallax for floating shapes
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        shapes.forEach((shape, index) => {
          const speed = 0.2 + (index * 0.1);
          const yPos = -(scrolled * speed);
          shape.style.transform = `translateY(${yPos}px)`;
        });

        // Parallax for timeline markers
        const markers = document.querySelectorAll('.timeline-marker');
        markers.forEach((marker, index) => {
          const rect = marker.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = (window.innerHeight - rect.top) / window.innerHeight;
            marker.style.transform = `scale(${1 + progress * 0.2})`;
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  // Add mouse move effect for glow cards
  document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(90, 227, 255, 0.3), transparent 50%)`;
      }
    });
  });

  // Stagger animation for grid items
  document.querySelectorAll('.stagger-animate').forEach(container => {
    const items = container.querySelectorAll('[data-delay]');
    items.forEach(item => {
      const delay = item.getAttribute('data-delay');
      item.style.animationDelay = `${delay}ms`;
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Smooth reveal for sections on page load
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

})();

// FAQ Toggle Function (global scope for onclick)
function toggleFAQ(button) {
  const faqItem = button.closest('.faq-item');
  const isActive = faqItem.classList.contains('active');
  
  // Close all other FAQ items
  document.querySelectorAll('.faq-item.active').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current item
  if (isActive) {
    faqItem.classList.remove('active');
  } else {
    faqItem.classList.add('active');
  }
}
