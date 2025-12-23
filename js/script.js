document.addEventListener("DOMContentLoaded", () => {
    
    // =================  STAGGERED REVEAL  =================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const children = entry.target.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

            if (entry.isIntersecting) {
                if (children.length > 0) {
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
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
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
    });

    const targetSelectors = "#home, #about, #skills, #projects, #blog, #contact, .projects-grid, .blog-grid, .about-container, .contact-container";
    document.querySelectorAll(targetSelectors).forEach(el => revealObserver.observe(el));


    // ================= TYPING EFFECT =================
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


    // ================= 3D SKILLS ANIMATION =================
    var radius = window.innerWidth < 768 ? 160 : 270; 
    var rotateSpeed = -20; 
    var tX = 0, tY = 10; 
    var odrag = document.getElementById('drag-container');
    var ospin = document.getElementById('spin-container');
    var aEle = ospin ? ospin.getElementsByClassName('skill-card') : [];

    if (ospin && odrag) {
        var style = document.createElement('style');
        style.innerHTML = `
        @keyframes spin { from{ transform: rotateY(0deg); } to{ transform: rotateY(360deg); } }
        @keyframes spinRevert { from{ transform: rotateY(360deg); } to{ transform: rotateY(0deg); } }
        #spin-container { animation: ${rotateSpeed > 0 ? 'spin' : 'spinRevert'} ${Math.abs(rotateSpeed)}s infinite linear; }
        `;
        document.head.appendChild(style);

        function init(delayTime) {
            for (var k = 0; k < aEle.length; k++) {
                aEle[k].style.transform = "rotateY(" + (k * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
                aEle[k].style.transition = "transform 1s"; 
                aEle[k].style.transitionDelay = delayTime || (aEle.length - k) / 10 + "s"; 
            }
            setTimeout(() => { ospin.style.opacity = "1"; }, 300);
        }

        function applyTransform(obj) {
            if (tY > 180) tY = 180; if (tY < 0) tY = 0;
            obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
        }

        document.onpointerdown = function (e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            ospin.style.animationPlayState = 'paused'; 
            var sX = e.clientX, sY = e.clientY;
            this.onpointermove = function (e) {
                var nX = e.clientX, nY = e.clientY;
                tX += (nX - sX) * 0.1; tY += (nY - sY) * 0.1;
                applyTransform(odrag);
                sX = nX; sY = nY;
            };
            this.onpointerup = function () {
                this.onpointermove = null; this.onpointerup = null;
                ospin.style.animationPlayState = 'running'; 
            };
            return false; 
        };
        setTimeout(init, 600);
    }
});

// =================  MODAL LOGIC =================
const projectData = {
    'post-book': { title: "Post Book - Full Stack", desc: "A social media manager built with Node.js and MySQL.", tech: "Node.js, MySQL, Express", live: "#", github: "#" },
    'mobile-store': { title: "The Mobile Market", desc: "E-commerce frontend fetching data from dummyjson.com.", tech: "JavaScript, Fetch API", live: "#", github: "#" },
    'reg-form': { title: "Secure Auth System", desc: "Professional registration and login module.", tech: "HTML5, CSS, JS", live: "#", github: "#" }
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
            <div style="margin-top:25px; display:flex; gap:15px;">
                <a href="${data.live}" target="_blank" class="btn fill">Live Demo</a>
                <a href="${data.github}" target="_blank" class="btn outline">GitHub Code</a>
            </div>`;
        modal.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) closeBtn.onclick = () => document.getElementById('projectModal').style.display = "none";
    window.onclick = (event) => {
        const modal = document.getElementById('projectModal');
        if (event.target == modal) modal.style.display = "none";
    };            
});


// ================= MODERN FORM HANDLING (FETCH API) =================
const form = document.getElementById("my-form");
const status = document.getElementById("status");
const btnText = document.getElementById("btn-text");

async function handleSubmit(event) {
  event.preventDefault(); 
  
  const data = new FormData(event.target);
  
  btnText.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Success! I'll get back to you soon.";
      status.style.color = "#38bdf8"; 
      form.reset(); 
      btnText.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem.";
        }
        status.style.color = "red";
      })
    }
  }).catch(error => {
    status.innerHTML = "Network error. Please try again.";
    status.style.color = "red";
  }).finally(() => {
    setTimeout(() => {
        btnText.innerHTML = 'Send Message <i class="fa-solid fa-envelope-open-text"></i>';
    }, 3000);
  });
}

form.addEventListener("submit", handleSubmit);