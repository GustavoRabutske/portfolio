document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA PARA ANIMAÇÃO DE SCROLL (Fade-in)
    const sections = document.querySelectorAll('.content-section');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // LÓGICA DO SELETOR DE TEMA
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const iconMoon = document.querySelector('.icon-moon');
    const iconSun = document.querySelector('.icon-sun');

    if (themeSwitcher && body && iconMoon && iconSun) {
        themeSwitcher.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            body.classList.toggle('dark-theme');

            const isLightTheme = body.classList.contains('light-theme');
            iconSun.style.display = isLightTheme ? 'inline' : 'none';
            iconMoon.style.display = isLightTheme ? 'none' : 'inline';
        });
    }

    // --- NOVA LÓGICA: MODAL DE IMAGEM ---
    const modal = document.getElementById('image-modal');
    if (modal) {
        const modalImg = document.getElementById("modal-image-content");
        const images = document.querySelectorAll('.project-image-zoomable');
        const closeModal = document.querySelector(".close-modal");

        images.forEach(img => {
            img.onclick = function(){
                modal.style.display = "flex";
                modalImg.src = this.src;
            }
        });

        // Fecha o modal ao clicar no 'X'
        if(closeModal) {
            closeModal.onclick = function() {
                modal.style.display = "none";
            }
        }
        
        // Fecha o modal ao clicar fora da imagem
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    
    // --- NOVA LÓGICA: COPIAR E-MAIL ---
    const copyButton = document.getElementById('copy-email-button');
    if (copyButton) {
        const emailAddress = document.getElementById('email-address').innerText;
        const copyTextSpan = copyButton.querySelector('.copy-text');

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Feedback visual para o usuário
                copyTextSpan.textContent = 'Copiado!';
                copyButton.style.backgroundColor = '#22c55e'; // Verde sucesso

                // Retorna ao estado original após 2 segundos
                setTimeout(() => {
                    copyTextSpan.textContent = 'Copiar';
                     // Retorna a cor para a variável CSS do tema
                    const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
                    copyButton.style.backgroundColor = primaryColor.trim();
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar e-mail: ', err);
                copyTextSpan.textContent = 'Erro!';
            });
        });
    }


    // LÓGICA DO EFEITO DE CHUVA/NEVE SUTIL
    const canvas = document.getElementById('rain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let flakes = [];
        const maxFlakes = 100;

        function addFlake() {
            flakes.push({
                x: Math.random() * canvas.width,
                y: 0,
                speed: Math.random() * 1.5 + 0.5,
                size: Math.random() * 1.5 + 0.8,
            });
        }

        function drawFlakes() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const currentThemeColor = getComputedStyle(body).getPropertyValue('--flake-color');
            ctx.fillStyle = currentThemeColor.trim();
            
            ctx.beginPath();
            flakes.forEach(flake => {
                ctx.moveTo(flake.x, flake.y);
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            });
            ctx.fill();
            
            updateFlakes();
        }

        function updateFlakes() {
            for (let i = 0; i < flakes.length; i++) {
                const flake = flakes[i];
                flake.y += flake.speed;
                if (flake.y > canvas.height) {
                    flake.y = 0;
                    flake.x = Math.random() * canvas.width;
                }
            }
        }

        const addFlakeInterval = setInterval(() => {
            if (flakes.length < maxFlakes) {
                addFlake();
            } else {
                clearInterval(addFlakeInterval);
            }
        }, 100);

        function animate() {
            drawFlakes();
            requestAnimationFrame(animate);
        }
        
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            flakes = []; 
        });
    }
});