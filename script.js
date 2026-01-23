document.addEventListener("DOMContentLoaded", () => {
    
 // ================= START SCROLL REVEAL LOGIC =================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
       const children = entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .gem-item');

        if (entry.isIntersecting) {
            if (children.length > 0) {
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.12}s`;
                    child.classList.add("active");
                });
            } 
            entry.target.classList.add("active");
        } else {
            if (children.length > 0) {
                children.forEach((child) => {
                    child.classList.remove("active");
                    child.style.transitionDelay = "0s";
                });
            }
            entry.target.classList.remove("active");
        }
    });
}, { 
    threshold: 0.15, 
    rootMargin: "0px 0px -60px 0px" 
});

const targetSelectors = "#home, #about, #skills, #projects, #resources, #contact, .projects-grid, .blog-grid, .about-container, .contact-container";
document.querySelectorAll(targetSelectors).forEach(el => revealObserver.observe(el));


    // ================= START TYPING EFFECT =================
    const words = ["Full-Stack Developer", "MERN Stack Expert", "Software Engineer", "Next.js Developer", "UI/UX Specialist"];
    let i = 0, j = 0, deleting = false;
    const typing = document.getElementById("typing");

    function typeEffect() {
        if (!typing) return;
        const currentWord = words[i];
        if (!deleting) {
            typing.textContent = currentWord.slice(0, j + 1);
            j++;
            if (j === currentWord.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
        } else {
            typing.textContent = currentWord.slice(0, j - 1);
            j--;
            if (j === 0) { deleting = false; i = (i + 1) % words.length; }
        }
        setTimeout(typeEffect, deleting ? 50 : 100);
    }
    setTimeout(typeEffect, 800);
});


// ================= START MODAL LOGIC =================
const projectData = {
    'post-book': { 
        title: "Post Book - Full Stack", 
        desc: "A social media manager built with Node.js and MySQL for seamless interaction.", 
        tech: "Node.js, MySQL, Express", 
        live: "https://postbook-web.vercel.app/", 
        github: "https://github.com/mehedi-hasan-arif2/postbook-frontend" 
    },
    'mobile-store': { 
        title: "The Mobile Market", 
        desc: "Modern E-commerce frontend fetching real-time data from dummyjson API.", 
        tech: "JavaScript, Fetch API, CSS3", 
        live: "https://mehedi-hasan-arif2.github.io/front-end-project-1/", 
        github: "https://github.com/mehedi-hasan-arif2/front-end-project-1" 
    },
    'space-jet': { 
        title: "Space Jet", 
        desc: "An action-packed 2D mission engine featuring smooth animations and collision logic.", 
        tech: "HTML5 Canvas, CSS, JavaScript", 
        live: "https://stat-verse-api.vercel.app/play?username=mehedi-hasan-arif2", 
        github: "https://github.com/mehedi-hasan-arif2/StatVerse-API" 
    }
};

function openModal(id) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modal-body');
    const data = projectData[id];

    if (data && modal) {
        body.innerHTML = `
            <h2 style="color:#38bdf8; margin-bottom:15px;">${data.title}</h2>
            <p style="margin-bottom:20px; line-height:1.6; color:#cbd5e1;">${data.desc}</p>
            <p><strong>Tech Used:</strong> ${data.tech}</p>
            <div class="modal-btn-group">
                <a href="${data.live}" target="_blank" class="modal-btn btn-fill">Live Demo</a>
                <a href="${data.github}" target="_blank" class="modal-btn btn-outline">GitHub Code</a>
            </div>`;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// Modal closing event listeners
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});


// ================= START FORM HANDLING =================
const contactForm = document.getElementById("my-form");
const statusDiv = document.getElementById("status");
const submitBtnText = document.getElementById("btn-text");

async function handleFormSubmit(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    submitBtnText.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    
    fetch(event.target.action, {
        method: contactForm.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            statusDiv.innerHTML = "Success! Message sent.";
            statusDiv.style.color = "#38bdf8"; 
            contactForm.reset(); 
            submitBtnText.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
        } else {
            statusDiv.innerHTML = "Error sending message.";
            statusDiv.style.color = "red";
        }
    }).catch(() => {
        statusDiv.innerHTML = "Network error.";
        statusDiv.style.color = "red";
    }).finally(() => {
        setTimeout(() => {
            submitBtnText.innerHTML = 'Send Message <i class="fa-solid fa-envelope-open-text"></i>';
        }, 3000);
    });
}

if (contactForm) contactForm.addEventListener("submit", handleFormSubmit);