document.addEventListener("DOMContentLoaded", () => {

    // ================= START SCROLL REVEAL LOGIC =================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const children = entry.target.querySelectorAll(
                '.reveal-up, .reveal-left, .reveal-right, .gem-item'
            );

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
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px"
    });

    const targetSelectors = "#home, #about, #skills, #projects, #resources, #contact, .projects-grid, .blog-grid, .about-container, .contact-container";
    document.querySelectorAll(targetSelectors).forEach(el => revealObserver.observe(el));


    // ================= START TYPING EFFECT =================
    const words = [
        "Full-Stack Developer",
        "MERN Stack Expert",
        "Software Engineer",
        "Next.js Developer",
        "UI/UX Specialist"
    ];

    let i = 0, j = 0, deleting = false;
    const typing = document.getElementById("typing");

    function typeEffect() {
        if (!typing) return;

        const currentWord = words[i];

        if (!deleting) {
            typing.textContent = currentWord.slice(0, j + 1);
            j++;

            if (j === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        } else {
            typing.textContent = currentWord.slice(0, j - 1);
            j--;

            if (j === 0) {
                deleting = false;
                i = (i + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 100);
    }

    setTimeout(typeEffect, 800);


    // ================= PROJECT DATA (MODAL) =================
    // PROJECT GRID ITEMS
    const projectData = {
        "bloodflow": {
            title: "BloodFlow",
            desc: "A full-stack MERN application connecting blood donors with recipients. Features role-based dashboards, secure JWT authentication, and Stripe payment integration.",
            tech: "React.js, Node.js, Express.js, MongoDB, Tailwind CSS, Stripe API, JWT, Firebase, ImgBB TanStack Query",
            live: "https://flourishing-stardust-3c763a.netlify.app/",
            github: "https://github.com/mehedi-hasan-arif2/blood-donation-client"
        },
        "postbook": {
            title: "PostBook",
            desc: "A full-stack social media web application where users can register, login, create posts, comment, manage profiles, and interact with content through a dynamic and responsive interface.",
            tech: "HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, Mongoose, CORS, dotenv, multer, Cloudinary",
            live: "https://resplendent-paprenjak-58ed84.netlify.app/",
            github: "https://github.com/mehedi-hasan-arif2/PostBook"
        },
        "dress-store": {
            title: "Dress Store",
            desc: "A responsive fashion e-commerce website where users can browse clothing collections with a clean and modern shopping experience.",
            tech: "HTML, CSS, JavaScript",
            live: "https://dress-store-theta.vercel.app/",
            github: "https://github.com/mehedi-hasan-arif2/Dress-Store"
        },
        "doc-appoint": {
            title: "Doc Appoint",
            desc: "A full-stack doctor appointment booking platform with authentication, appointment management, and secure user experience.",
            tech: "Next.js, React, Tailwind CSS, Node.js, Express.js, MongoDB, Axios, JWT, React Hook Form",
            live: "https://doc-appoint-client-ten.vercel.app",
            github: "https://github.com/mehedi-hasan-arif2/doc-appoint-client"
        },
        "skillsphere": {
            title: "SkillSphere",
            desc: "A modern skill-sharing and learning platform featuring smooth animations, authentication, and an engaging UI.",
            tech: "Next.js, React, Tailwind CSS, DaisyUI, Framer Motion, Better-auth, Lucide React, Swiper",
            live: "https://skillsphere23.netlify.app/",
            github: "https://github.com/mehedi-hasan-arif2/SkillSphere"
        },
        "space-jet": {
            title: "Space Jet",
            desc: "An action-packed 2D mission engine featuring smooth animations and collision logic.",
            tech: "Node.js, Express.js, Axios, dotenv",
            live: "https://stat-verse-api-gamma.vercel.app/play?username=mehedi-hasan-arif2",
            github: "https://github.com/mehedi-hasan-arif2/StatVerse-API"
        },
        "mobile-store": {
            title: "The Mobile Market",
            desc: "Modern E-commerce frontend fetching real-time data from dummyjson API.",
            tech: "HTML, CSS, JavaScript, Fetch API",
            live: "https://front-end-project-1-ten.vercel.app/",
            github: "https://github.com/mehedi-hasan-arif2/front-end-project-1"
        },
        "github-issues": {
            title: "GitHub Issues Tracker",
            desc: "A lightweight issue tracking tool that helps developers explore and manage GitHub repository issues efficiently.",
            tech: "HTML, CSS, JavaScript",
            live: "https://github-issues-tracker33.netlify.app/",
            github: "https://github.com/mehedi-hasan-arif2/GitHub-Issues-Tracker"
        },
        "digitools": {
            title: "DigiTools Platform",
            desc: "A collection of useful digital tools built with React, offering a clean interface and improved productivity.",
            tech: "Vite, React, Tailwind CSS, DaisyUI, React Icons, React Toastify",
            live: "https://digitaltoolsplat.netlify.app/",
            github: "https://github.com/mehedi-hasan-arif2/digitools-platform"
        },
        "keenkeeper": {
            title: "KeenKeeper",
            desc: "A productivity and tracking platform with interactive charts, analytics, and a user-friendly dashboard experience.",
            tech: "Vite, React, Tailwind CSS, React Router, Recharts, Lucide React, React Hot Toast",
            live: "https://kinkeeper1.netlify.app/",
            github: "https://github.com/mehedi-hasan-arif2/KeenKeeper"
        },
        "job-tracker": {
            title: "Job Application Tracker",
            desc: "A productivity tool to manage and track job applications with status updates, dashboard analytics, and CRUD operations.",
            tech: "HTML, CSS, JavaScript",
            live: "https://job-application-tracker-three-ivory.vercel.app/",
            github: "https://github.com/mehedi-hasan-arif2/Job-Application-Tracker"
        },
    };

    // PROJECT MODAL DETAILS
    const projects = [
        { id: "bloodflow", image: "./assets/blood donation.PNG", title: "BloodDonation App", subtitle: "Community Blood Donation Platform" },
        { id: "postbook", image: "./assets/Postbook.png", title: "PostBook", subtitle: "Full Stack Social Media Web App" },
        { id: "dress-store", image: "./assets/dress store.PNG", title: "Dress Store", subtitle: "Fashion E-commerce Website" },
        { id: "doc-appoint", image: "./assets/docappointment.PNG", title: "Doc Appoint", subtitle: "Doctor Appointment Platform" },
        { id: "skillsphere", image: "./assets/skillsphere.PNG", title: "SkillSphere", subtitle: "Skill Sharing & Learning Platform" },
        { id: "space-jet", image: "./assets/Space Jet.PNG", title: "Space Jet", subtitle: "2D Action Game Engine" },
        { id: "mobile-store", image: "./assets/Mobile store.png", title: "Mobile Store", subtitle: "E-commerce with Fetch API" },
        { id: "github-issues", image: "./assets/githubissusetracker.PNG", title: "GitHub Issues Tracker", subtitle: "Repository Issue Management Tool" },
        { id: "digitools", image: "./assets/digitools.PNG", title: "DigiTools Platform", subtitle: "Digital Productivity Toolkit" },
        { id: "keenkeeper", image: "./assets/keenkeeper.PNG", title: "KeenKeeper", subtitle: "Analytics & Productivity Dashboard" },
        { id: "job-tracker", image: "./assets/job application tracker.PNG", title: "Job Application Tracker", subtitle: "Job Search Management Tool" }
    ];

    const grid = document.querySelector(".projects-grid");

    if (grid) {
        grid.innerHTML = projects.map(p => `
            <div class="project-card reveal-up" onclick="openModal('${p.id}')">
               <img src="${p.image}" alt="${p.title}" loading="lazy">
                <div class="project-overlay">
                    <h4>${p.title}</h4>
                    <p>${p.subtitle}</p>
                    <div class="project-links">
                        <button class="modal-open">See Details</button>
                    </div>
                </div>
            </div>
        `).join("");
    }


    // ================= MODAL FUNCTION =================
    window.openModal = function (id) {
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
                </div>
            `;

            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    };


    // ================= MODAL CLOSE LOGIC =================
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


    // ================= FORM HANDLING =================
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
        })
            .then(response => {
                if (response.ok) {
                    statusDiv.innerHTML = "Success! Message sent.";
                    statusDiv.style.color = "#38bdf8";
                    contactForm.reset();
                    submitBtnText.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
                } else {
                    statusDiv.innerHTML = "Error sending message.";
                    statusDiv.style.color = "red";
                }
            })
            .catch(() => {
                statusDiv.innerHTML = "Network error.";
                statusDiv.style.color = "red";
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtnText.innerHTML = 'Send Message <i class="fa-solid fa-envelope-open-text"></i>';
                }, 3000);
            });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }

});