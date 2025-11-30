// **FIX**: Wrap all code in a DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {

    // --- GLOBAL VARIABLES ---
    let myP5Sketch; // Reference to the p5.js sketch instance

    // --- DATA OBJECTS ---
    const specimenData = {
        'AML-2847': { genetic: 47.3, survival: 0.012, adaptation: 87, stability: -34.2 },
        'ALGO-NVDA': { genetic: 88.1, survival: 0.240, adaptation: 94, stability: -75.8 },
        'ALGO-SENT': { genetic: 22.4, survival: 0.001, adaptation: 61, stability: -12.1 },
        'ALGO-GOOG': { genetic: 61.4, survival: 0.004, adaptation: 77, stability: -22.7 }
    };

    const specimenNotes = {
        'AML-2847': {
            header: 'Field Notes - Dr. K. Yamamoto - 2157.02.18 (CONTROL)',
            content: "Specimen AML-2847 (Control Group) serves as our baseline for 'natural' adaptation. All incoming algorithmic data is cross-referenced against this specimen's stable genome to measure deviation. Recommend Protocol Seven containment."
        },
        'ALGO-NVDA': {
            header: 'Algorithmic Log - Specimen ALGO-NVDA (Volatility Crab)',
            content: "Specimen's carapace density and agitation levels show a 0.94 correlation with NVDA market volatility. Rapid price fluctuations appear to trigger a defensive hardening of the exoskeleton, suggesting a direct link between market speculation and 'biologically' generated evidence."
        },
        'ALGO-SENT': {
            header: 'Algorithmic Log - Specimen ALGO-SENT (Sentiment Jellyfish)',
            content: "This organism's population density is directly tied to real-time Twitter/X sentiment analysis regarding 'AI'. Positive sentiment spikes (+0.8) correlate with massive, rapid blooms, while negative sentiment troughs cause mass 'die-offs'. A clear example of constructed reality."
        },
        'ALGO-GOOG': {
            header: 'Algorithmic Log - Specimen ALGO-GOOG (Query Worm)',
            content: "Bioluminescent patterns in this colony map directly to Google Search query volume for terms like 'AGI' and 'OpenAI'. The organism's 'communication' is a literal visualization of public curiosity and fear. We are not observing a creature; we are observing a data-driven echo."
        }
    };

    // --- CORE FUNCTIONS ---

    // Load Specimen (Global function)
    window.loadSpecimen = function(id) {
        document.querySelectorAll('.specimen-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedItem = event.target.closest('.specimen-item');
        if (clickedItem) {
            clickedItem.classList.add('active');
        }
        
        const specimenContent = document.getElementById('specimen-content');
        const systemLogContent = document.getElementById('system-log-content');

        if (id === 'SYS-LOG') {
            if (specimenContent) specimenContent.style.display = 'none';
            if (systemLogContent) systemLogContent.style.display = 'block';
        } else {
            if (specimenContent) specimenContent.style.display = 'block';
            if (systemLogContent) systemLogContent.style.display = 'none';

            if (specimenData[id] && specimenNotes[id]) {
                updateDataDisplay(specimenData[id], id);
            }
            if (myP5Sketch) {
                myP5Sketch.setVisMode(id);
            }
        }
        console.log('Loading section:', id);
    }

    // Update Data Display
    function updateDataDisplay(data, id) {
        const dataBoxes = document.querySelectorAll('#specimen-content .data-box');
        const notes = specimenNotes[id];

        if (dataBoxes.length > 3) {
            dataBoxes[0].querySelector('.data-box-label').textContent = 'Algorithmic Drift';
            dataBoxes[0].querySelector('.data-box-value').textContent = data.genetic + '%';
            dataBoxes[0].querySelector('.data-box-bar-fill').style.width = data.genetic + '%';
            
            dataBoxes[1].querySelector('.data-box-label').textContent = 'Survival Rate (Sim)';
            dataBoxes[1].querySelector('.data-box-value').textContent = data.survival + '%';
            dataBoxes[1].querySelector('.data-box-bar-fill').style.width = (data.survival * 100) + '%';
            
            dataBoxes[2].querySelector('.data-box-label').textContent = 'Adaptation Index';
            dataBoxes[2].querySelector('.data-box-value').textContent = (data.adaptation / 10).toFixed(1) + '/10';
            dataBoxes[2].querySelector('.data-box-bar-fill').style.width = data.adaptation + '%';
            
            dataBoxes[3].querySelector('.data-box-label').textContent = 'Epistemic Stability';
            dataBoxes[3].querySelector('.data-box-value').textContent = data.stability + '%';
            const barFill = dataBoxes[3].querySelector('.data-box-bar-fill');
            barFill.style.width = Math.abs(data.stability) + '%';
            if (data.stability < 0) barFill.classList.add('decline');
            else barFill.classList.remove('decline');
        }

        const notesHeader = document.querySelector('#specimen-content .notes-header');
        const notesContent = document.querySelector('#specimen-content .notes-content');
        if (notesHeader && notesContent && notes) {
            notesHeader.textContent = notes.header;
            notesContent.innerHTML = notes.content.replace(/\n/g, '<br>');
        }
    }

    // --- HELPER FUNCTIONS ---

    // Slider Updates (Global functions)
    window.updateDepth = function(value) {
        document.getElementById('depth-value').textContent = value;
        console.log('Algorithmic Bias:', value);
    }
    window.updatePH = function(value) {
        document.getElementById('ph-value').textContent = value;
        console.log('Truth Threshold:', value);
    }
    window.updateTime = function(value) {
        document.getElementById('time-value').textContent = value;
        console.log('Market Correlation:', value);
    }

    // Clock Update
    function updateClock() {
        const now = new Date();
        const year = 2157, month = '03', day = '24';
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        const dateTimeString = `${year}.${month}.${day} ${timeString} UTC`;
        
        const currentTimeEl = document.getElementById('current-time');
        if (currentTimeEl) currentTimeEl.textContent = dateTimeString;
        
        const updateTimeEl = document.getElementById('update-time');
        if (updateTimeEl) updateTimeEl.textContent = timeString;
        
        const logClock = document.getElementById('update-time-log');
        if (logClock && logClock.offsetParent !== null) {
            logClock.textContent = timeString;
        }
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '5') {
            const sections = ['AML-2847', 'ALGO-NVDA', 'ALGO-SENT', 'ALGO-GOOG', 'SYS-LOG'];
            const index = parseInt(e.key) - 1;
            if (sections[index]) {
                const item = document.querySelector(`[onclick="loadSpecimen('${sections[index]}')"]`);
                if (item) item.click();
            }
        }
        
        if (e.key === 'r' || e.key === 'R') {
            const depthSlider = document.getElementById('depth-slider');
            const phSlider = document.getElementById('ph-slider');
            const timeSlider = document.getElementById('time-slider');
            
            if (depthSlider) { depthSlider.value = 50; updateDepth(50); }
            if (phSlider) { phSlider.value = 0.75; updatePH(0.75); }
            if (timeSlider) { timeSlider.value = 80; updateTime(80); }
        }

        if (e.key === 'a' || e.key === 'A') {
            if (myP5Sketch) myP5Sketch.toggleAudio();
        }
    });

    console.log('Digital Abyss Archive System Initialized');
    console.log('Keyboard shortcuts: 1-5 to switch sections, R to reset sliders, A to toggle audio');

    // =========================================================================
    // --- P5.JS SKETCH (PORTED FROM SPECTROGRAM.HTML) ---
    // =========================================================================

    const p5_sketch = ( p ) => {
        let mic;
        let audioEnabled = false;
        let audioLevel = 0;
        let acousticField = [];
        let pg; // Graphics buffer
        let detectionRipples = [];
        let parameterBoxes = [];
        let time = 0;
        let currentVisMode = 'AML-2847';
        let container, canvas;
        const FIELD_RESOLUTION = 60, MAX_RIPPLES = 15, MAX_PARAM_BOXES = 30;
        let mouseX_el, mouseY_el, inputStatus_el, fps_el, audioStatus_el;

        p.setup = () => {
            container = document.getElementById('p5-container');
            canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent('p5-container'); // **FIX**: Explicitly parent the canvas
            
            pg = p.createGraphics(p.width, p.height);
            p.pixelDensity(1);
            
            for (let i = 0; i < FIELD_RESOLUTION * FIELD_RESOLUTION; i++) acousticField[i] = 0;
            for (let i = 0; i < 12; i++) parameterBoxes.push(new ParameterBox(p));

            mouseX_el = document.getElementById('mouse-x');
            mouseY_el = document.getElementById('mouse-y');
            inputStatus_el = document.getElementById('p5-input-status');
            fps_el = document.getElementById('p5-fps');
            audioStatus_el = document.getElementById('p5-audio-status');

            if (inputStatus_el) inputStatus_el.textContent = "MOUSE";
            p.textFont('Trebuchet MS, Lucida Grande, sans-serif');
        };

        p.draw = () => {
            if (p.frameCount % 30 === 0) {
                if(fps_el) fps_el.textContent = p.frameRate().toFixed(0);
            }
            if(mouseX_el) mouseX_el.textContent = p.mouseX.toFixed(0);
            if(mouseY_el) mouseY_el.textContent = p.mouseY.toFixed(0);

            switch(currentVisMode) {
                case 'AML-2847': p.drawModeDefault(); break;
                case 'ALGO-NVDA': p.drawModeNVDA(); break;
                case 'ALGO-SENT': p.drawModeSentiment(); break;
                case 'ALGO-GOOG': p.drawModeGoogle(); break;
                default: p.drawModeDefault();
            }
        };

        p.windowResized = () => {
            container = document.getElementById('p5-container');
            if (container && container.offsetWidth > 0) {
                p.resizeCanvas(container.offsetWidth, container.offsetHeight);
                pg = p.createGraphics(p.width, p.height);
                console.log("p5 canvas resized.");
            }
        };

        p.setVisMode = (mode) => {
            if (currentVisMode === mode) return; 
            currentVisMode = mode;
            detectionRipples = [];
            parameterBoxes = [];
            if(pg) pg.background(0);
            p.background(0);
            let count = (mode === 'ALGO-GOOG') ? 25 : (mode === 'ALGO-NVDA') ? 5 : 12;
            for (let i = 0; i < count; i++) parameterBoxes.push(new ParameterBox(p));
        };

        p.toggleAudio = () => {
            if (p.getAudioContext().state !== 'running') {
                p.getAudioContext().resume().catch(e => console.error("Audio resume failed:", e));
            }
            audioEnabled = !audioEnabled;
            if (audioEnabled) {
                if (!mic) { 
                    mic = new p5.AudioIn();
                    mic.start(() => {
                        console.log("Mic started");
                        if(audioStatus_el) audioStatus_el.textContent = "ENABLED";
                        if(inputStatus_el) inputStatus_el.textContent = "AUDIO";
                    }, (e) => {
                        console.error("Mic failed to start:", e);
                        if(audioStatus_el) audioStatus_el.textContent = "ERROR";
                        audioEnabled = false;
                    });
                } else {
                    mic.start(); 
                    if(audioStatus_el) audioStatus_el.textContent = "ENABLED";
                    if(inputStatus_el) inputStatus_el.textContent = "AUDIO";
                }
            } else if (!audioEnabled && mic) {
                mic.stop();
                if(audioStatus_el) audioStatus_el.textContent = "DISABLED";
                if(inputStatus_el) inputStatus_el.textContent = "MOUSE";
            }
        };

        // --- VISUALIZATION MODES ---
        p.drawModeDefault = () => {
            p.background(0); time++;
            if (audioEnabled && mic) audioLevel = mic.getLevel();
            p.updateAcousticField(0.01, 0.5); 
            pg.background(0, 20);
            if (p.frameCount % 2 === 0) p.drawAcousticField(0, 255, 65, 30);
            p.updateAndDrawRipples(0, 255, 65);
            p.spawnRipples(0.2, 0.5, 60);
            p.image(pg, 0, 0);
            p.updateAndDrawBoxes();
            p.spawnAndReapBoxes(0.4, 0.7, 45, 90);
            p.drawWaveformBox(0, 255, 65, 0.05, 0.08, 0.02);
        };
        p.drawModeNVDA = () => {
            p.background(0); time++;
            if (audioEnabled && mic) audioLevel = mic.getLevel();
            p.updateAcousticField(0.05, 1.5); 
            pg.background(0, 10);
            if (p.frameCount % 2 === 0) p.drawAcousticField(255, 0, 0, 50); 
            p.updateAndDrawRipples(255, 50, 50);
            p.spawnRipples(0.4, 0.1, 120); 
            p.image(pg, 0, 0);
            p.updateAndDrawBoxes();
            p.spawnAndReapBoxes(0.1, 0.2, 200, 300); 
            p.drawWaveformBox(255, 50, 50, 0.1, 0.15, 0.08); 
        };
        p.drawModeSentiment = () => {
            p.background(0); time++;
            if (audioEnabled && mic) audioLevel = mic.getLevel();
            p.updateAcousticField(0.005, 0.2); 
            pg.background(0, 30);
            if (p.frameCount % 2 === 0) p.drawAcousticField(107, 163, 212, 20); 
            p.updateAndDrawRipples(107, 163, 212);
            p.spawnRipples(0.1, 0.8, 30); 
            p.image(pg, 0, 0);
            p.updateAndDrawBoxes();
            p.spawnAndReapBoxes(0.8, 0.8, 20, 40);
            p.drawWaveformBox(107, 163, 212, 0.02, 0.03, 0.01); 
        };
        p.drawModeGoogle = () => {
            p.background(0); time++;
            if (audioEnabled && mic) audioLevel = mic.getLevel();
            pg.background(0, 15);
            p.spawnRipples(1.0, 0.0, 9999);
            p.updateAndDrawRipples(255, 255, 255);
            p.image(pg, 0, 0);
            p.updateAndDrawBoxes();
            p.spawnAndReapBoxes(0.9, 0.5, 10, 60);
            p.drawWaveformBox(200, 255, 200, 0.08, 0.05, 0.05);
        };

        // --- CORE LOGIC ---
        p.updateAcousticField = (timeFactor, audioFactor) => {
            for (let y = 0; y < FIELD_RESOLUTION; y++) {
                for (let x = 0; x < FIELD_RESOLUTION; x++) {
                    let n = p.noise(x * 0.1, y * 0.1, time * timeFactor);
                    if (audioEnabled && audioLevel > 0.05) n += audioLevel * audioFactor;
                    acousticField[y * FIELD_RESOLUTION + x] = n;
                }
            }
        };
        p.drawAcousticField = (r, g, b, alphaMax) => {
            let cellW = p.width / FIELD_RESOLUTION, cellH = p.height / FIELD_RESOLUTION;
            for (let y = 0; y < FIELD_RESOLUTION; y++) {
                for (let x = 0; x < FIELD_RESOLUTION; x++) {
                    let value = acousticField[y * FIELD_RESOLUTION + x];
                    if (value > 0.5) {
                        let alpha = p.map(value, 0.5, 1, 0, alphaMax);
                        pg.noStroke(); pg.fill(r, g, b, alpha);
                        pg.rect(x * cellW, y * cellH, cellW, cellH);
                    }
                }
            }
        };
        p.updateAndDrawRipples = (r, g, b) => {
            for (let i = detectionRipples.length - 1; i >= 0; i--) {
                detectionRipples[i].update();
                detectionRipples[i].display(r, g, b);
                if (detectionRipples[i].isDead()) detectionRipples.splice(i, 1);
            }
        };
        p.spawnRipples = (audioThreshold, randomChance, randomFrame) => {
            if (audioEnabled && audioLevel > audioThreshold && p.frameCount % 5 === 0 && detectionRipples.length < MAX_RIPPLES) {
                detectionRipples.push(new AcousticRipple(p, pg, p.random(p.width * 0.2, p.width * 0.8), p.random(p.height * 0.2, p.height * 0.65), audioLevel));
            }
            if (!audioEnabled && p.frameCount % randomFrame === 0 && p.random() > (1.0 - randomChance) && detectionRipples.length < MAX_RIPPLES) {
                detectionRipples.push(new AcousticRipple(p, pg, p.random(p.width), p.random(p.height * 0.1, p.height * 0.65), p.random(0.3, 0.8)));
            }
        };
        p.updateAndDrawBoxes = () => {
            for (let i = parameterBoxes.length - 1; i >= 0; i--) {
                parameterBoxes[i].update();
                parameterBoxes[i].display();
                if (parameterBoxes[i].isDead()) parameterBoxes.splice(i, 1);
            }
        };
        p.spawnAndReapBoxes = (spawnChance, reapChance, spawnFrame, reapFrame) => {
            if (parameterBoxes.length < MAX_PARAM_BOXES && p.frameCount % spawnFrame === 0 && p.random() < spawnChance) {
                parameterBoxes.push(new ParameterBox(p));
            }
            if (parameterBoxes.length > 5 && p.frameCount % reapFrame === 0 && p.random() < reapChance) {
                parameterBoxes.splice(p.floor(p.random(parameterBoxes.length)), 1);
            }
        };
        p.drawWaveformBox = (r, g, b, tf1, tf2, nf) => {
            if (p.height < 200) return;
            let boxX = 20, boxY = p.height - 120, boxW = p.width - 40, boxH = 60;
            p.push();
            p.noFill(); p.stroke(r, g, b, 150); p.strokeWeight(1); p.rect(boxX, boxY, boxW, boxH);
            p.stroke(r, g, b, 200); p.strokeWeight(2); let cs = 8;
            p.line(boxX, boxY, boxX + cs, boxY); p.line(boxX, boxY, boxX, boxY + cs);
            p.line(boxX + boxW, boxY, boxX + boxW - cs, boxY); p.line(boxX + boxW, boxY, boxX + boxW, boxY + cs);
            p.line(boxX, boxY + boxH, boxX + cs, boxY + boxH); p.line(boxX, boxY + boxH, boxX, boxY + boxH - cs);
            p.line(boxX + boxW, boxY + boxH, boxX + boxW - cs, boxY + boxH); p.line(boxX + boxW, boxY + boxH, boxX + boxW, boxY + boxH - cs);
            p.stroke(r, g, b, 50); p.strokeWeight(1); p.line(boxX, boxY + boxH / 2, boxX + boxW, boxY + boxH / 2);
            for (let i = 1; i <= 3; i++) { p.stroke(r, g, b, 20); p.line(boxX, boxY + (boxH / 4) * i, boxX + boxW, boxY + (boxH / 4) * i); }
            p.noFill(); p.stroke(r, g, b, 200); p.strokeWeight(2);
            p.beginShape();
            for (let x = 0; x < boxW; x += 2) {
                let t = x / boxW, waveX = boxX + x, wave = 0;
                wave += p.sin(t * p.TWO_PI * 3 + time * tf1) * (boxH * 0.15);
                wave += p.sin(t * p.TWO_PI * 7 + time * tf2) * (boxH * 0.08);
                wave += p.noise(x * 0.02, time * nf) * (boxH * 0.12);
                if (audioEnabled && audioLevel > 0.05) wave += p.sin(t * p.TWO_PI * 12 + time * 0.1) * audioLevel * (boxH * 0.2);
                p.vertex(waveX, boxY + boxH / 2 + wave);
            }
            p.endShape();
            p.stroke(r, g, b, 150); p.strokeWeight(1);
            for (let i = 0; i < 8; i++) {
                if (p.noise(i * 10, time * 0.05) > 0.7) {
                    let spikeX = boxX + p.noise(i * 100, time * 0.02) * boxW;
                    let spikeHeight = p.noise(i * 50, time * 0.03) * boxH * 0.25;
                    p.line(spikeX, boxY + boxH / 2, spikeX, boxY + boxH / 2 + spikeHeight);
                    p.line(spikeX, boxY + boxH / 2, spikeX, boxY + boxH / 2 - spikeHeight);
                }
            }
            p.fill(r, g, b, 150); p.noStroke(); p.textSize(8); p.textAlign(p.LEFT, p.TOP);
            p.text('SIGNAL WAVEFORM', boxX + 5, boxY + 5);
            p.pop();
        };

        // --- EVENT HANDLERS ---
        p.mousePressed = (event) => {
            if (p.getAudioContext().state !== 'running') {
                 p.getAudioContext().resume().catch(e => console.error("Audio resume failed:", e));
            }
            if (event.target !== canvas.elt) return;
            if (detectionRipples.length < MAX_RIPPLES) {
                detectionRipples.push(new AcousticRipple(p, pg, p.mouseX, p.mouseY, p.random(0.5, 1)));
            }
            if (parameterBoxes.length < MAX_PARAM_BOXES && p.random() > 0.3) {
                let box = new ParameterBox(p);
                box.x = p.mouseX + p.random(-80, 80); box.y = p.mouseY + p.random(-80, 80);
                box.x = p.constrain(box.x, 20, p.width - box.w - 20);
                box.y = p.constrain(box.y, 20, p.height - 200);
                parameterBoxes.push(box);
            }
        };
        p.mouseDragged = () => {
            if (p.mouseX < 0 || p.mouseY < 0 || p.mouseX > p.width || p.mouseY > p.height) return;
            if (p.frameCount % 5 === 0 && detectionRipples.length < MAX_RIPPLES) {
                detectionRipples.push(new AcousticRipple(p, pg, p.mouseX, p.mouseY, p.random(0.3, 0.7)));
            }
        };
    };

    // --- P5.JS CLASSES ---
    class AcousticRipple {
        constructor(p, pg, x, y, intensity) {
            this.p = p; this.pg = pg; this.x = x; this.y = y;
            this.radius = 0; this.maxRadius = p.random(100, 300);
            this.intensity = intensity; this.age = 0; this.maxAge = 120;
        }
        update() {
            this.age++; this.radius += this.maxRadius / this.maxAge; this.intensity *= 0.97;
        }
        display(r, g, b) {
            let alpha = this.p.map(this.age, 0, this.maxAge, 255, 0);
            this.pg.noFill();
            this.pg.stroke(r, g, b, alpha * this.intensity); this.pg.strokeWeight(2);
            this.pg.circle(this.x, this.y, this.radius * 2);
            this.pg.stroke(r, g, b, alpha * 0.5 * this.intensity); this.pg.strokeWeight(1);
            this.pg.circle(this.x, this.y, this.radius * 1.5);
        }
        isDead() { return this.age >= this.maxAge; }
    }
    class ParameterBox {
        constructor(p) {
            this.p = p;
            this.x = p.random(p.width * 0.05, p.width * 0.95);
            this.y = p.random(p.height * 0.05, p.height * 0.65);
            this.w = p.random(70, 140); this.h = p.random(35, 60);
            this.numbers = this.generateNumbers();
            this.age = 0; this.maxAge = p.random(120, 240);
            this.blinkPhase = p.random(p.TWO_PI);
            this.updateInterval = p.floor(p.random(40, 80));
        }
        generateNumbers() {
            const p = this.p;
            const formats = [
                () => p.floor(p.random(0, 9999)).toString(),
                () => p.random(0, 999).toFixed(p.random([1, 2, 3])),
                () => { let h = p.floor(p.random(0, 65535)).toString(16).toUpperCase(); return '0x' + h.padStart(4, '0'); }
            ];
            let numCount = p.floor(p.random(1, 4));
            let nums = [];
            for (let i = 0; i < numCount; i++) nums.push(p.random(formats)());
            return nums;
        }
        update() {
            this.age++;
            if (this.age % this.updateInterval === 0 && this.p.random() > 0.5) {
                this.numbers[this.p.floor(this.p.random(this.numbers.length))] = this.generateNumbers()[0];
            }
            this.blinkPhase += 0.08;
        }
        display() {
            const p = this.p;
            let blink = p.sin(this.blinkPhase) * 0.4 + 0.6;
            p.push();
            p.noFill(); p.stroke(0, 255, 65, 150); p.strokeWeight(1);
            p.rect(this.x, this.y, this.w, this.h);
            p.stroke(0, 255, 65, 200); p.strokeWeight(2); let cs = 5;
            p.line(this.x, this.y, this.x + cs, this.y); p.line(this.x, this.y, this.x, this.y + cs);
            p.line(this.x + this.w, this.y, this.x + this.w - cs, this.y); p.line(this.x + this.w, this.y, this.x + this.w, this.y + cs);
            p.drawingContext.save();
            p.drawingContext.rect(this.x + 2, this.y + 2, this.w - 4, this.h - 4);
            p.drawingContext.clip();
            p.noStroke(); p.fill(0, 255, 65, 200 * blink); p.textAlign(p.CENTER, p.CENTER);
            let totalHeight = (this.numbers.length - 1) * 15;
            let startY = this.y + this.h / 2 - totalHeight / 2;
            for (let i = 0; i < this.numbers.length; i++) {
                p.textSize(this.numbers.length === 1 ? 15 : 12);
                p.text(this.numbers[i], this.x + this.w / 2, startY + i * 15);
            }
            p.drawingContext.restore();
            if (p.random() > 0.95) {
                p.stroke(0, 255, 65, p.random(100, 200)); p.strokeWeight(1);
                p.line(this.x, this.y + p.random(this.h), this.x + this.w, this.y + p.random(this.h));
            }
            p.pop();
        }
        isDead() { return this.age >= this.maxAge; }
    }

    // --- INITIALIZATION ---
    // All functions and classes are defined. Now, create the sketch.
    // **FIX**: The 'p5-container' ID is passed as the second argument.
    myP5Sketch = new p5(p5_sketch, 'p5-container');
    
    // Load the default specimen and start the clock
    loadSpecimen('AML-2847');
    updateClock();
    setInterval(updateClock, 1000);

}); // End of DOMContentLoaded listener