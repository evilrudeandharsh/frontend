const tabs = document.querySelectorAll('.tab');
    const progressBars = document.querySelectorAll('.progress');
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');

    const delay = 4000;
    let index = 0;
    let timer;

    const contentData = [
      {
        title: 'Real-Time Convergent Billing',
        desc: 'Instantaneous, accurate billing across all services and payment methods.'
      },
      {
        title: 'Charging Analytics',
        desc: 'Monitor and optimize usage patterns and rates.'
      },
      {
        title: 'Catalog Management',
        desc: 'Organize your services and offerings easily.'
      },
      {
        title: 'Event Monitoring',
        desc: 'Track system activities and triggers in real-time.'
      }
    ];

    function activateTab(i) {
      tabs.forEach((tab, idx) => {
        tab.classList.toggle('active', idx === i);
        progressBars[idx].style.transition = 'none';
        progressBars[idx].style.width = '0%';
      });

      setTimeout(() => {
        progressBars[i].style.transition = `width ${delay - 500}ms linear`;
        progressBars[i].style.width = '100%';
      }, 50);

      title.innerText = contentData[i].title;
      desc.innerText = contentData[i].desc;
      index = i;
    }

    function startLoop() {
      timer = setInterval(() => {
        index = (index + 1) % tabs.length;
        activateTab(index);
      }, delay);
    }

    function resetLoop() {
      clearInterval(timer);
      startLoop();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        activateTab(i);
        resetLoop();
      });
    });

    activateTab(index);
    startLoop();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations - text moves up and image shrinks
    const heroText = document.getElementById('hero-text');
    const imageSection = document.getElementById('image-section');

    // Text moves upward as we scroll
    gsap.to(heroText, {
      y: -200,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageSection,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Image section scales down and fades
    gsap.to(imageSection, {
      scale: 0.8
      ,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageSection,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Horizontal scroll animation
    const horizontalContainer = document.getElementById('horizontal-container');
    const horizontalSection = document.getElementById('horizontal-section');
    const progressDots = document.querySelectorAll('.progress-dot');

    gsap.to(horizontalContainer, {
      x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection,
        start: "top top",
        end: () => `+=${horizontalContainer.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update progress dots
          const progress = self.progress;
          const currentPanel = Math.floor(progress * 4);
          
          progressDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentPanel);
          });
        }
      }
    });

    // Animate panels as they come into view
    gsap.utils.toArray('.horizontal-panel').forEach((panel, i) => {
      gsap.fromTo(panel.querySelector('.panel-content'), 
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "left center",
            end: "right center",
            containerAnimation: gsap.getById('horizontal-scroll'),
            scrub: 1,
          }
        }
      );
    });

    // Tabs section entrance animation
    gsap.fromTo('#tabs-section .tabs-container', 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '#tabs-section',
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        }
      }
    );

    gsap.fromTo('#tabs-section .content', 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '#tabs-section',
          start: "top 70%",
          end: "top 10%",
          scrub: 1,
        }
      }
    );
const words = document.querySelectorAll('.word');
const popups = document.querySelectorAll('.popup-box');
words.forEach(word => {
  word.addEventListener('mouseenter', () => {
    const popupId = `popup-${word.dataset.word.toLowerCase()}`;
    const popup = document.getElementById(popupId);
    popup.classList.add('show'); // Show the popup
  });
  word.addEventListener('mouseleave', () => {
    const popupId = `popup-${word.dataset.word.toLowerCase()}`;
    const popup = document.getElementById(popupId);
    popup.classList.remove('show'); // Hide the popup
  });
});