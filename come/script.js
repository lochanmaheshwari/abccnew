
const nicheData = {
    'AI': {
        color: '#6366f1',
        brands: [
            { id: 'saasflash',  name: 'SaasFlash' },
            { id: 'wisprflow',  name: 'WisprFlow' },
            { id: 'perplexity', name: 'Perplexity' },
            { id: 'evolving',   name: 'Evolving AI' },
            { id: 'playerzero', name: 'PlayerZero' },
            { id: 'emergent',   name: 'Emergent' },
        ]
    },
    'EdTech': {
        color: '#10b981',
        brands: [
            { id: 'pw',        name: 'Physics Wallah' },
            { id: 'gfg',       name: 'GeeksforGeeks' },
            { id: 'codninjas', name: 'Coding Ninjas' },
            { id: 'koidnest',  name: 'KoidNest' },
            { id: 'marwadi',   name: 'Marwadi Univ.' },
            { id: 'masai',     name: 'Masai School' },
        ]
    },
    'Fintech': {
        color: '#f59e0b',
        brands: [
            { id: 'zerodha',  name: 'Zerodha' },
            { id: 'mobikwik', name: 'MobiKwik' },
            { id: 'ionic',    name: 'Ionic Wealth' },
        ]
    },
    'Real Estate': {
        color: '#ef4444',
        brands: [
            { id: 'den',    name: 'Den Donovan' },
            { id: 'godrej', name: 'Godrej Properties' },
        ]
    },
    'Personal Brands': {
        color: '#ec4899',
        brands: [
            { id: 'greg',    name: 'Greg Isenberg' },
            { id: 'sahil',   name: 'Sahil Gokna' },
            { id: 'keshav',  name: 'Keshav Grover' },
            { id: 'harman',  name: 'Harman Singh' },
            { id: 'ayush',   name: 'Ayush Wadhwa' },
            { id: 'monica', name: 'Monica Malik' },
            { id: 'nishant', name: 'Nishant Chahar' },
            { id: 'jay', name: 'Jay Kapoor' },
            { id: 'vedant', name: 'Vedant Rusty' },
            { id: 'ayushman', name: 'Ayushman Pandita' },
            { id: 'megha', name: 'Megha' },
            { id: 'abhijith', name: 'Abhijith V Nair' },
            { id: 'naman', name: 'Naman Pal' },
            { id: 'mohit', name: 'Mohit Singh' },
            { id: 'varsha', name: 'Varsha DR' },
            { id: 'techwithus', name: 'Tech With Us' },
            { id: 'sandra', name: 'Sandra Robinson' },
            { id: 'meenal', name: 'Meenal Goel' },
            { id: 'madhav', name: 'Madhav Bhatia' },
            { id: 'palak', name: 'Palak Rathi' },
            { id: 'sahilv', name: 'Sahil Verma' },
            { id: 'imran', name: 'Imran Hussain' },
            { id: 'aniket', name: 'Aniket' },
            { id: 'deepak', name: 'Deepak' },
            { id: 'deepansh', name: 'Deepansh' },
            { id: 'sortedgirl', name: 'Sorted Girl' }
        ]
    },
    'Others': {
        color: '#8b5cf6',
        brands: [
            { id: 'personal',  name: 'JuneAndLochan' },
            { id: 'renee',     name: 'Renee' },
            { id: 'statiq',    name: 'Statiq' },
            { id: 'andhooked', name: 'AndHooked' },
        ]
    }
};

function initNicheGraph() {
    let activeNiche = 'AI';

    function getInfo(id) {
        return window.projectData[id] || { name: id, role: '', growth: '', description: '', metrics: [], videos: [] };
    }

    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }

    const brandLogos = {
        'saasflash':  'assets/saasflash1.png',
        'wisprflow':  'assets/wisprflow.png',
        'perplexity': 'assets/perplexity.png',
        'greg':       'assets/greg1.png',
        'evolving':   'assets/evolving.png',
        'playerzero': 'assets/playerzero.png',
        'emergent':   'assets/emergent.png',
        'pw':         'assets/physicswallah.png',
        'gfg':        'assets/geeks.png',
        'codninjas':  'assets/codingninjas.png',
        'koidnest':   'assets/koidnest.png',
        'marwadi':    'assets/marwadi.png',
        'masai':      'assets/masai.png',
        'zerodha':    'assets/zerodha.png',
        'mobikwik':   'assets/mobikwik.png',
        'ionic':      'assets/ionicwealth.png',
        'den':        'assets/dendonovan.png',
        'godrej':     'assets/godrej.png',
        'personal':   'assets/june.png',
        'renee':      'assets/renee.png',
        'statiq':     'assets/statiq.png',
        'andhooked':  'assets/hook.png',
        'sahil':      'assets/sahil.png',
        'keshav':     'assets/keshav.png',
    };

    function renderGraph(niche) {
        const data = nicheData[niche];
        const brands = data.brands;
        const n = brands.length;
        const graphEl = document.getElementById('nicheGraph');
        const size = graphEl.offsetWidth;
        const cx = size / 2;
        const cy = size / 2;
        const radius = size * 0.36;
        const isMobile = window.innerWidth <= 768;
        const nodeHalf = isMobile ? 40 : 70; // half of 80px / 140px node

        // Update center label + color
        document.getElementById('centerLabel').textContent = niche;
        document.getElementById('centerNode').style.background =
            `linear-gradient(135deg, ${data.color}, ${data.color}99)`;
        document.getElementById('centerNode').style.boxShadow =
            `0 0 50px ${data.color}66`;

        // Clear
        document.getElementById('graphSvg').innerHTML = '';
        document.getElementById('brandNodesContainer').innerHTML = '';

        brands.forEach((brand, i) => {
            const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);

            // SVG dashed line
            const svg = document.getElementById('graphSvg');
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('id', `line-${brand.id}`);
            line.setAttribute('x1', cx); line.setAttribute('y1', cy);
            line.setAttribute('x2', x);  line.setAttribute('y2', y);
            line.setAttribute('stroke', '#2a2a2a');
            line.setAttribute('stroke-width', '1.5');
            line.setAttribute('stroke-dasharray', '5 5');
            line.style.transition = 'stroke 0.3s, stroke-width 0.3s';
            svg.appendChild(line);

            // Logo or initials
            const logoUrl = brandLogos[brand.id];
            const logoHtml = logoUrl
                ? `<div class="brand-node-logo"><img src="${logoUrl}" alt="${brand.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="brand-fallback" style="display:none">${getInitials(brand.name)}</span></div>`
                : `<div class="brand-node-logo no-logo"><span class="brand-fallback">${getInitials(brand.name)}</span></div>`;

            // Brand node
            const node = document.createElement('div');
            node.className = 'brand-node';
            node.dataset.name = brand.name;
            node.style.left = `${x - nodeHalf}px`;
            node.style.top  = `${y - nodeHalf}px`;
            node.style.animationDelay = `${i * 0.12}s`;
            node.classList.add('brand-node-float');
            node.innerHTML = `${logoHtml}<span class="brand-node-label">${brand.name}</span>`;
            node.addEventListener('click', () => selectBrand(brand.id, node, niche));
            document.getElementById('brandNodesContainer').appendChild(node);
        });
    }

    function selectBrand(id, clickedNode, niche) {
        const activeColor = nicheData[niche || activeNiche].color;

        document.querySelectorAll('.brand-node').forEach(n => {
            n.classList.remove('active', 'inactive');
            n.classList.add(n === clickedNode ? 'active' : 'inactive');
        });

        // Reset all lines, highlight active
        document.querySelectorAll('#graphSvg line').forEach(l => {
            l.setAttribute('stroke', '#2a2a2a');
            l.setAttribute('stroke-width', '1.5');
            l.setAttribute('stroke-dasharray', '5 5');
        });
        const activeLine = document.getElementById(`line-${id}`);
        if (activeLine) {
            activeLine.setAttribute('stroke', activeColor);
            activeLine.setAttribute('stroke-width', '2.5');
            activeLine.removeAttribute('stroke-dasharray');
        }

        showDetail(id);
    }

    function showDetail(id) {
        const info = getInfo(id);
        if (info && info.link) {
            window.open(info.link, '_blank');
        } else {
            window.open('case-study.html?id=' + id, '_blank');
        }
    }

    // Tab switching
    document.querySelectorAll('.niche-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.niche-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeNiche = tab.dataset.niche;
            renderGraph(activeNiche);
            document.getElementById('brandDetailInner').innerHTML = '<p class="brand-detail-placeholder">← Click any brand to see what we built for them.</p>';
        });
    });

    // Re-render on resize
    window.addEventListener('resize', () => renderGraph(activeNiche));

    renderGraph(activeNiche);
}

document.addEventListener('DOMContentLoaded', () => {

    // Video: start at 47s, loop between 47s–107s
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        const seekTo47 = () => { if (heroVideo.currentTime < 47) heroVideo.currentTime = 47; };
        heroVideo.addEventListener('loadedmetadata', () => { heroVideo.currentTime = 47; });
        heroVideo.addEventListener('canplay', seekTo47);
        heroVideo.addEventListener('canplaythrough', seekTo47);
        heroVideo.addEventListener('timeupdate', () => {
            if (heroVideo.currentTime >= 107) heroVideo.currentTime = 47;
        });
    }

    // Init niche graph
    initNicheGraph();

    // 3D Word Drum — slot machine style circular rotation
    const drumInner = document.querySelector('.word-slider-inner');
    const drumContainer = document.querySelector('.word-slider');
    if (drumInner && drumContainer) {
        const words = ['BODY', 'BRAND', 'BUILDER', 'BEGINNER'];
        const n = words.length;
        const angleStep = 360 / n; // 90° per word

        // Compute radius so adjacent words are 1em apart on the cylinder
        const emPx = parseFloat(getComputedStyle(drumInner).fontSize);
        const radius = emPx / (2 * Math.tan(Math.PI / n));

        // Build cylinder faces
        drumInner.innerHTML = '';
        words.forEach((word, i) => {
            const li = document.createElement('li');
            li.textContent = word;
            // Place each word on the cylinder face
            li.style.transform = `rotateX(${-i * angleStep}deg) translateZ(${radius}px)`;
            drumInner.appendChild(li);
        });

        // Animate: pause 1.2s, then smoothly rotate to next word over 0.5s
        let currentAngle = 0;
        let targetAngle = 0;
        let animating = false;
        let rafId = null;

        function easeInOut(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function rotateTo(newTarget, duration) {
            if (animating) return;
            animating = true;
            const startAngle = currentAngle;
            const diff = newTarget - startAngle;
            const start = performance.now();

            function step(now) {
                const elapsed = now - start;
                const t = Math.min(elapsed / duration, 1);
                currentAngle = startAngle + diff * easeInOut(t);
                drumInner.style.transform = `rotateX(${currentAngle}deg)`;

                if (t < 1) {
                    rafId = requestAnimationFrame(step);
                } else {
                    currentAngle = newTarget;
                    animating = false;
                }
            }
            rafId = requestAnimationFrame(step);
        }

        function nextWord() {
            targetAngle += angleStep;
            rotateTo(targetAngle, 500); // 500ms smooth spin
            setTimeout(nextWord, 1800); // 1.2s pause + 0.5s spin = 1.8s per word
        }

        setTimeout(nextWord, 1800); // initial pause before first spin
    }

    // Accordion Logic
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.maxHeight;
            
            // Close all other accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.style.maxHeight = null;
                item.previousElementSibling.querySelector('.icon').textContent = '+';
            });
            
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                header.querySelector('.icon').textContent = '+'; // Reset other icons
                header.querySelector('.icon').textContent = '-';
            }
        });
    });

    // Mobile Menu Toggle
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = toggleBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = toggleBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Modal Logic for Case Studies
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                let videosHTML = '';
                if (data.videos && data.videos.length > 0) {
                    videosHTML = `
                        <div class="modal-section">
                            <h4>Work Samples</h4>
                            <div class="video-grid">
                                ${data.videos.map(url => `
                                    <div class="video-item">
                                        <iframe src="${url}" allowfullscreen loading="lazy"></iframe>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                modalBody.innerHTML = `
                    <div class="modal-header">
                        <h3 class="modal-title">${data.name}</h3>
                        <p class="modal-subtitle">${data.role}</p>
                        <div class="modal-growth">${data.growth}</div>
                    </div>
                    <div class="modal-section">
                        <h4>Overview</h4>
                        <div>${data.description}</div>
                    </div>
                    <div class="modal-section">
                        <h4>Impact</h4>
                        <ul>
                            ${data.metrics.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>
                    ${videosHTML}
                `;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    // Close Modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modalBody.innerHTML = ''; // Clear content
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            modalBody.innerHTML = '';
        }
    });

});
