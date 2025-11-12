// Mouse tracking for TouchDesigner interaction
const canvas = document.getElementById('interaction-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Mouse tracking variables
let mouseX = 0;
let mouseY = 0;
let lastX = 0;
let lastY = 0;
let mouseSpeed = 0;

// Mouse movement handler
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Calculate speed
    const dx = mouseX - lastX;
    const dy = mouseY - lastY;
    mouseSpeed = Math.sqrt(dx*dx + dy*dy).toFixed(1);
    
    lastX = mouseX;
    lastY = mouseY;
    
    // Update display
    document.getElementById('mouse-x').textContent = mouseX.toFixed(0);
    document.getElementById('mouse-y').textContent = mouseY.toFixed(0);
    document.getElementById('mouse-speed').textContent = mouseSpeed;
    
    // Here you would send data to TouchDesigner via OSC/WebSocket
    // Example: sendToTouchDesigner({x: mouseX, y: mouseY, speed: mouseSpeed});
});

// Particle system for visualization fallback
let particles = [];
const particleCount = 40;

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random()
    });
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        // Attraction to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // Apply mouse attraction force
        if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200;
            p.vx += (dx / dist) * force * 0.001;
            p.vy += (dy / dist) * force * 0.001;
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Add damping
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
            p.vx *= -1;
            p.x = Math.max(0, Math.min(canvas.width, p.x));
        }
        if (p.y < 0 || p.y > canvas.height) {
            p.vy *= -1;
            p.y = Math.max(0, Math.min(canvas.height, p.y));
        }
        
        // Pulse opacity
        p.opacity = Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.3 + 0.6;
        
        // Draw particle with gradient - Retro blue colors
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(107, 163, 212, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(107, 163, 212, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 139, 194, ${p.opacity})`;
        ctx.fill();
        
        // Draw connections between nearby particles
        particles.forEach(p2 => {
            const d = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
            if (d < 100 && d > 0) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                const lineOpacity = (1 - d/100) * 0.2 * Math.min(p.opacity, p2.opacity);
                ctx.strokeStyle = `rgba(107, 163, 212, ${lineOpacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Slider update functions
function updateDepth(value) {
    document.getElementById('depth-value').textContent = value;
    // Send to TouchDesigner: depth parameter
    console.log('Depth:', value);
}

function updatePH(value) {
    document.getElementById('ph-value').textContent = value;
    // Send to TouchDesigner: pH parameter
    console.log('pH:', value);
}

function updateTime(value) {
    document.getElementById('time-value').textContent = value;
    // Send to TouchDesigner: time parameter
    console.log('Time:', value);
}

// Specimen loading function
function loadSpecimen(id) {
    // Remove active class from all items
    document.querySelectorAll('.specimen-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    event.target.closest('.specimen-item').classList.add('active');
    
    // Here you would load specimen-specific data
    console.log('Loading specimen:', id);
    
    // Example: Update data display based on specimen
    const specimenData = {
        'AML-2847': {
            genetic: 47.3,
            survival: 0.012,
            adaptation: 87,
            biodiversity: -34.2
        },
        'AML-3491': {
            genetic: 52.1,
            survival: 0.008,
            adaptation: 91,
            biodiversity: -41.5
        },
        'AML-4102': {
            genetic: 38.7,
            survival: 0.025,
            adaptation: 73,
            biodiversity: -28.3
        },
        'AML-5573': {
            genetic: 61.4,
            survival: 0.004,
            adaptation: 94,
            biodiversity: -52.7
        }
    };
    
    if (specimenData[id]) {
        updateDataDisplay(specimenData[id]);
    }
}

// Update data display
function updateDataDisplay(data) {
    const dataBoxes = document.querySelectorAll('.data-box');
    
    if (dataBoxes[0]) {
        dataBoxes[0].querySelector('.data-box-value').textContent = data.genetic + '%';
        dataBoxes[0].querySelector('.data-box-bar-fill').style.width = data.genetic + '%';
    }
    
    if (dataBoxes[1]) {
        dataBoxes[1].querySelector('.data-box-value').textContent = data.survival + '%';
        dataBoxes[1].querySelector('.data-box-bar-fill').style.width = (data.survival * 100) + '%';
    }
    
    if (dataBoxes[2]) {
        dataBoxes[2].querySelector('.data-box-value').textContent = (data.adaptation / 10).toFixed(1) + '/10';
        dataBoxes[2].querySelector('.data-box-bar-fill').style.width = data.adaptation + '%';
    }
    
    if (dataBoxes[3]) {
        dataBoxes[3].querySelector('.data-box-value').textContent = data.biodiversity + '%';
        dataBoxes[3].querySelector('.data-box-bar-fill').style.width = Math.abs(data.biodiversity) + '%';
    }
}

// Clock update function
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById('current-time').textContent = `2157.03.24 ${timeString} UTC`;
    document.getElementById('update-time').textContent = timeString;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initialize clock on load
updateClock();

// TouchDesigner WebSocket connection (placeholder)
// Uncomment and configure when connecting to actual TouchDesigner instance
/*
let ws;

function connectToTouchDesigner() {
    try {
        ws = new WebSocket('ws://localhost:9099');
        
        ws.onopen = function() {
            console.log('Connected to TouchDesigner');
            document.querySelector('.td-placeholder').innerHTML = 
                '<div style="color: #2ecc40;">● CONNECTED TO TOUCHDESIGNER</div>' +
                '<div class="status">Streaming data in real-time</div>';
        };
        
        ws.onclose = function() {
            console.log('Disconnected from TouchDesigner');
            document.querySelector('.td-placeholder').innerHTML = 
                '<div>▲ TOUCHDESIGNER STREAM ▲</div>' +
                '<div class="status">Awaiting connection on localhost:9099</div>' +
                '<div class="status">Move mouse to interact with particle system</div>';
            
            // Attempt to reconnect after 5 seconds
            setTimeout(connectToTouchDesigner, 5000);
        };
        
        ws.onerror = function(error) {
            console.error('WebSocket error:', error);
        };
        
    } catch (error) {
        console.error('Failed to connect to TouchDesigner:', error);
    }
}

function sendToTouchDesigner(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
}

// Attempt initial connection
connectToTouchDesigner();
*/

// Polling and embedding for HTTP stream at http://localhost:9099
const TD_HOST = 'http://localhost:9099';
const TD_POLL_INTERVAL = 2000; // ms
let tdAvailable = false;

function setStatusConnected(connected) {
    const statusEl = document.getElementById('td-status');
    const statusTitle = document.getElementById('td-status-title');
    const indicator = document.querySelector('.status-indicator');
    const img = document.getElementById('td-stream-img');

    if (connected) {
        if (statusEl) statusEl.textContent = 'CONNECTED TO TOUCHDESIGNER (localhost:9099)';
        if (statusTitle) statusTitle.style.color = '#2ecc40';
        if (indicator) {
            indicator.style.background = 'radial-gradient(circle at 30% 30%, #9ff19f, #2ecc40)';
            indicator.style.boxShadow = '0 0 3px #2ecc40, 0 0 8px rgba(46,204,64,0.5), inset 0 1px 1px rgba(255,255,255,0.6)';
        }
        // Show stream image if it exists (MJPEG or single-frame support)
        if (img) {
            img.src = TD_HOST + '/';
            img.style.display = 'block';
            // hide placeholder text behind img (visual only)
            document.querySelector('.td-placeholder').style.display = 'none';
        }
    } else {
        if (statusEl) statusEl.textContent = 'Awaiting connection on localhost:9099';
        if (statusTitle) statusTitle.style.color = '';
        if (indicator) {
            // revert to original green indicator
            indicator.style.background = 'radial-gradient(circle at 30% 30%, #6ef76e, #2ecc40)';
            indicator.style.boxShadow = '0 0 3px #2ecc40, 0 0 8px rgba(46,204,64,0.5), inset 0 1px 1px rgba(255,255,255,0.6)';
        }
        if (img) {
            img.src = '';
            img.style.display = 'none';
        }
        // ensure placeholder is visible
        document.querySelector('.td-placeholder').style.display = 'block';
    }
}

async function checkTouchDesigner() {
    try {
        // Try a HEAD request first to reduce payload. Some servers don't support HEAD; catch and try GET.
        let res = await fetch(TD_HOST, { method: 'HEAD', cache: 'no-store' });
        if (!res.ok) {
            // Try GET as a fallback
            res = await fetch(TD_HOST, { method: 'GET', cache: 'no-store' });
        }

        if (res && res.ok) {
            if (!tdAvailable) {
                tdAvailable = true;
                setStatusConnected(true);
                console.log('TouchDesigner HTTP endpoint is available.');
            }
        } else {
            if (tdAvailable) {
                tdAvailable = false;
                setStatusConnected(false);
                console.log('TouchDesigner HTTP endpoint became unavailable.');
            }
        }
    } catch (err) {
        if (tdAvailable) {
            tdAvailable = false;
            setStatusConnected(false);
            console.log('TouchDesigner HTTP endpoint unreachable.');
        }
    }
}

// Start polling
checkTouchDesigner();
setInterval(checkTouchDesigner, TD_POLL_INTERVAL);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 1-4 to switch specimens
    if (e.key >= '1' && e.key <= '4') {
        const specimens = ['AML-2847', 'AML-3491', 'AML-4102', 'AML-5573'];
        const index = parseInt(e.key) - 1;
        if (specimens[index]) {
            const item = document.querySelector(`[onclick="loadSpecimen('${specimens[index]}')"]`);
            if (item) {
                item.click();
            }
        }
    }
    
    // Press R to reset sliders
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('depth-slider').value = 3847;
        document.getElementById('ph-slider').value = 5.2;
        document.getElementById('time-slider').value = 50;
        updateDepth(3847);
        updatePH(5.2);
        updateTime(50);
    }
});

console.log('Abyssal Memory Laboratory System Initialized');
console.log('Keyboard shortcuts: 1-4 to switch specimens, R to reset sliders');