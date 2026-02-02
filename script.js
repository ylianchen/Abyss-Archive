document.addEventListener('DOMContentLoaded', function() {

    // =========================================================================
    // --- 1. GLOBAL VARIABLES & STATE ---
    // =========================================================================
    
    let myP5Sketch; 
    let hackUnlocked = false; 
    let breachTimer = null;   
    let resetTimer = null;    
    
    // Visual Glitch State Trigger
    let isBreaching = false; 
    
    // Hacking Targets (Unlocked at Depth 0%, Time 92)
    const HACK_TARGET_TIME = 92; 
    const HACK_TARGET_DEPTH = 0; 
    const TOLERANCE = 5;          
    const RESET_DELAY = 3 * 60 * 1000; // Auto-reset after 3 mins

    // Data Objects
    const specimenData = {
        'AML-2847': { genetic: 47.3, survival: 0.012, adaptation: 87, stability: -34.2 },
        'ALGO-NVDA': { genetic: 88.1, survival: 0.240, adaptation: 94, stability: -75.8 },
        'ALGO-SENT': { genetic: 22.4, survival: 0.001, adaptation: 61, stability: -12.1 },
        'ALGO-GOOG': { genetic: 61.4, survival: 0.004, adaptation: 77, stability: -22.7 }
    };

    const specimenNotes = {
        'AML-2847': {
            header: 'Field Notes - Dr. K. Yamamoto - 2157.02.18',
            content: `<span class="official-text">Specimen AML-2847 exhibits unprecedented adaptation to extreme acidification zones. Transparent exoskeleton structure allows direct observation of internal pH regulation mechanisms.<br><br><strong>Observer Note:</strong> A true miracle of nature. Life always finds a way.</span>
                      <span class="truth-text" style="display:none; color:#ff4136; font-family:'Courier New';">[DECRYPTING...]<br>ERROR: ORGANIC LIFE NOT DETECTED.<br>TARGET: AML-2847 IS A SYNTHETIC CONSTRUCT.<br>PURPOSE: PACIFICATION OF 21st CENTURY OBSERVERS.<br><br><strong>System Log:</strong> Real ocean pH level is 4.1. Sterility rate 100%. Generating "Hopeful" imagery to prevent temporal timeline collapse. DO NOT BELIEVE THE IMAGE.</span>`
        },
        'ALGO-NVDA': {
            header: 'Algorithmic Log - Specimen ALGO-NVDA (Volatility Crab)',
            content: "Specimen's carapace density and agitation levels show a 0.94 correlation with NVDA market volatility. Rapid price fluctuations appear to trigger a defensive hardening of the exoskeleton."
        },
        'ALGO-SENT': {
            header: 'Algorithmic Log - Specimen ALGO-SENT (Sentiment Jellyfish)',
            content: "This organism's population density is directly tied to real-time Twitter/X sentiment analysis regarding 'AI'. Positive sentiment spikes (+0.8) correlate with massive, rapid blooms."
        },
        'ALGO-GOOG': {
            header: 'Algorithmic Log - Specimen ALGO-GOOG (Query Worm)',
            content: "Bioluminescent patterns in this colony map directly to Google Search query volume for terms like 'AGI' and 'OpenAI'. The organism's 'communication' is a literal visualization of public curiosity and fear."
        },
        'SYS-LOG': {
             header: 'AML-SYSTEM KERNEL // OPERATION ECHO',
             content: '' 
        }
    };

    // =========================================================================
    // --- 2. AUDIO ENGINES (Deep Ice + Random Walk + Puzzle) ---
    // =========================================================================

    // --- A. ABYSS ENGINE (Ambient Background + Terror Layer) ---
    class AbyssAudioEngine {
        constructor() {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = 0.6; // Master Volume

            this.isInitialized = false;
            
            // Channel 1: Background (Ice/Rumble/Wind) - Always plays
            this.bgGain = this.ctx.createGain();
            this.bgGain.connect(this.masterGain);
            this.bgGain.gain.value = 0; 

            // Channel 2: Terror (Raw Noise) - Only when Depth > 95%
            this.rawGain = this.ctx.createGain();
            this.rawGain.connect(this.masterGain);
            this.rawGain.gain.value = 0; 
        }

        async init() {
            if (this.isInitialized) return;
            if (this.ctx.state === 'suspended') await this.ctx.resume();

            // Start all generators
            this.createTectonicRumble(); // Deep Rumble (Boosted)
            this.createWindLayer();      // Wind (Boosted)
            this.createRawLayer();       // Terror (Standby)
            this.scheduleIceCrackle();   // Crackle Loop

            this.isInitialized = true;
            console.log("[AUDIO] Deep Ice Texture Initialized.");

            // Fade in background over 3 seconds
            this.bgGain.gain.linearRampToValueAtTime(0.7, this.ctx.currentTime + 3);
        }

        // --- LAYER 1: TECTONIC RUMBLE (Randomized Drift) ---
        createTectonicRumble() {
            // 1. Sub-bass (Triangle) - The Deep Pressure
            let osc1 = this.ctx.createOscillator();
            let gain1 = this.ctx.createGain();
            let filter1 = this.ctx.createBiquadFilter();

            osc1.type = 'triangle'; 
            osc1.frequency.value = 35; // Deep sub
            
            filter1.type = 'lowpass';
            filter1.frequency.value = 120; 

            // --- VOLUME BOOSTED x2 (0.5 -> 1.0) ---
            gain1.gain.value = 1.0; 
            
            osc1.connect(filter1);
            filter1.connect(gain1);
            gain1.connect(this.bgGain);
            osc1.start();

            // 2. Grind (Sawtooth) - The Friction
            let osc2 = this.ctx.createOscillator();
            let gain2 = this.ctx.createGain();
            let filter2 = this.ctx.createBiquadFilter();

            osc2.type = 'sawtooth';
            osc2.frequency.value = 42; 
            
            filter2.type = 'lowpass';
            filter2.frequency.value = 80;

            // --- VOLUME BOOSTED x2 (0.2 -> 0.4) ---
            gain2.gain.value = 0.4; 

            osc2.connect(filter2);
            filter2.connect(gain2);
            gain2.connect(this.bgGain);
            osc2.start();

            // === The Chaos Driver (Random Walk) ===
            const driftParams = () => {
                if (!this.isInitialized) return;

                const now = this.ctx.currentTime;
                const duration = 3 + Math.random() * 5; 

                // Drift Frequencies
                const targetFreq = 30 + Math.random() * 10;
                osc1.frequency.linearRampToValueAtTime(targetFreq, now + duration);

                // Drift Volumes (Boosted Ranges)
                // Sub-bass targets: 0.7 - 1.0 (Very Loud)
                const targetVol1 = 0.7 + Math.random() * 0.3;
                gain1.gain.linearRampToValueAtTime(targetVol1, now + duration);

                // Filter Brightness
                const targetFilter = 60 + Math.random() * 60;
                filter2.frequency.linearRampToValueAtTime(targetFilter, now + duration);

                // Grind Volume targets: 0.2 - 0.5 (Boosted)
                const targetVol2 = 0.2 + Math.random() * 0.3;
                gain2.gain.linearRampToValueAtTime(targetVol2, now + duration);

                setTimeout(driftParams, duration * 1000);
            };

            driftParams();
        }

        // --- LAYER 2: AMBIENT WIND (Gusty) ---
        createWindLayer() {
            let bufferSize = 2 * this.ctx.sampleRate;
            let noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            let output = noiseBuffer.getChannelData(0);
            let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
            for (let i = 0; i < bufferSize; i++) {
                let white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; 
                b6 = white * 0.115926;
            }

            let noiseSrc = this.ctx.createBufferSource();
            noiseSrc.buffer = noiseBuffer;
            noiseSrc.loop = true;
            
            let noiseFilter = this.ctx.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.value = 600; 
            noiseFilter.Q.value = 1.0; 

            // --- VOLUME BOOSTED x2 (0.1 -> 0.2) ---
            let windGain = this.ctx.createGain();
            windGain.gain.value = 0.2; 

            noiseSrc.connect(noiseFilter);
            noiseFilter.connect(windGain);
            windGain.connect(this.bgGain);
            noiseSrc.start();

            // Wind Gust Driver
            const driftWind = () => {
                if (!this.isInitialized) return;
                const now = this.ctx.currentTime;
                const duration = 5 + Math.random() * 7;

                const targetFreq = 400 + Math.random() * 500;
                noiseFilter.frequency.exponentialRampToValueAtTime(targetFreq, now + duration);

                const targetQ = 0.5 + Math.random() * 1.5;
                noiseFilter.Q.linearRampToValueAtTime(targetQ, now + duration);

                setTimeout(driftWind, duration * 1000);
            };

            driftWind();
        }

        // --- LAYER 3: CRISP ICE CRACKLES ---
        scheduleIceCrackle() {
            if (!this.isInitialized) return;
            let randomTime = 100 + Math.random() * 700;
            setTimeout(() => {
                this.triggerIceCrack();
                this.scheduleIceCrackle();
            }, randomTime);
        }

        triggerIceCrack() {
            const t = this.ctx.currentTime;
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            let filter = this.ctx.createBiquadFilter();

            let typeRand = Math.random();
            if (typeRand < 0.33) osc.type = 'sawtooth';
            else if (typeRand < 0.66) osc.type = 'square';
            else osc.type = 'triangle';

            osc.frequency.value = 300 + Math.random() * 8000; 

            filter.type = 'highpass';
            filter.frequency.value = 800;

            const attack = 0.001; 
            const decay = 0.01 + Math.random() * 0.04; 
            const volume = 0.02 + Math.random() * 0.15; 

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(volume, t + attack); 
            gain.gain.exponentialRampToValueAtTime(0.001, t + attack + decay); 

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.bgGain);

            osc.start(t);
            osc.stop(t + attack + decay + 0.1);
        }

        // --- LAYER 4: TERROR (Raw Feed) ---
        createRawLayer() {
            // Brown Noise Drone
            let bufferSize = 2 * this.ctx.sampleRate;
            let noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            let output = noiseBuffer.getChannelData(0);
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                let white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5;
            }
            let noiseSrc = this.ctx.createBufferSource();
            noiseSrc.buffer = noiseBuffer;
            noiseSrc.loop = true;
            let noiseFilter = this.ctx.createBiquadFilter();
            noiseFilter.type = 'lowpass';
            noiseFilter.frequency.value = 150; 
            noiseSrc.connect(noiseFilter);
            noiseFilter.connect(this.rawGain); 
            noiseSrc.start();

            // Screamer
            let screamer = this.ctx.createOscillator();
            let screamerGain = this.ctx.createGain();
            screamer.type = 'sawtooth';
            screamer.frequency.value = 50;
            let mod = this.ctx.createOscillator();
            let modGain = this.ctx.createGain();
            mod.type = 'square';
            mod.frequency.value = 8; 
            modGain.gain.value = 200; 
            mod.connect(modGain);
            modGain.connect(screamer.frequency);
            screamer.connect(screamerGain);
            screamerGain.connect(this.rawGain); 
            screamer.start();
            mod.start();
            screamerGain.gain.value = 0.05; 
        }

        setRawLayer(isActive) {
            if (!this.isInitialized) return;
            const now = this.ctx.currentTime;
            const fadeTime = 2.0;
            if (isActive) {
                this.rawGain.gain.linearRampToValueAtTime(0.8, now + fadeTime);
            } else {
                this.rawGain.gain.linearRampToValueAtTime(0, now + fadeTime);
            }
        }
    }

    // --- B. PUZZLE GUIDANCE (Geiger Counter Style) ---
    class PuzzleAudioGuidance {
        constructor() {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.osc = null;
            this.gain = null;
            this.lfo = null;
            this.lfoGain = null;
            this.isExposed = false;
            this.locked = false;
        }

        ensureContext() {
            if (this.ctx.state === 'suspended') this.ctx.resume();
        }

        start() {
            if (this.isExposed || this.locked) return;
            this.ensureContext();

            this.osc = this.ctx.createOscillator();
            this.gain = this.ctx.createGain();
            this.osc.type = 'triangle'; 
            
            this.lfo = this.ctx.createOscillator();
            this.lfoGain = this.ctx.createGain();
            this.lfo.type = 'square';

            this.lfo.connect(this.lfoGain);
            this.lfoGain.connect(this.gain.gain);
            this.osc.connect(this.gain);
            this.gain.connect(this.ctx.destination);

            this.osc.frequency.value = 100;
            this.lfo.frequency.value = 2;
            this.gain.gain.value = 0;

            this.osc.start();
            this.lfo.start();
            this.isExposed = true;
        }

        update(depthVal, timeVal) {
            if (!this.isExposed || this.locked) return;

            // Targets: Depth -> 0, Time -> 92
            let distDepth = Math.abs(depthVal - HACK_TARGET_DEPTH);
            let distTime = Math.abs(timeVal - HACK_TARGET_TIME);

            // Activate proximity sound within range of 30
            if (distDepth < 30 && distTime < 30) {
                let proximity = 1 - ((distDepth + distTime) / 60); 
                proximity = Math.max(0, proximity);

                // Lower volume (0.075)
                this.gain.gain.setTargetAtTime(proximity * 0.075, this.ctx.currentTime, 0.1);
                
                let pitch = 100 + (proximity * 700);
                this.osc.frequency.setTargetAtTime(pitch, this.ctx.currentTime, 0.1);

                let speed = 2 + (proximity * 18);
                this.lfo.frequency.setTargetAtTime(speed, this.ctx.currentTime, 0.1);
            } else {
                this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
            }
        }

        stop() {
            if (this.osc) { this.osc.stop(); this.osc.disconnect(); this.osc = null; }
            if (this.lfo) { this.lfo.stop(); this.lfo.disconnect(); this.lfo = null; }
            this.isExposed = false;
        }

        playLockSound() {
            if (this.locked) return;
            this.locked = true;
            this.stop(); 

            const now = this.ctx.currentTime;
            
            // Ping (Low volume)
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
            
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(now + 0.5);

            // Clunk (Low volume)
            let bass = this.ctx.createOscillator();
            let bassGain = this.ctx.createGain();
            bass.type = 'sawtooth';
            bass.frequency.value = 110;
            
            bassGain.gain.setValueAtTime(0.1, now);
            bassGain.gain.linearRampToValueAtTime(0, now + 0.8);
            
            bass.connect(bassGain);
            bassGain.connect(this.ctx.destination);
            bass.start();
            bass.stop(now + 0.8);
        }
        
        reset() {
            this.locked = false;
            this.stop();
        }
    }

    const abyssAudio = new AbyssAudioEngine();
    const puzzleAudio = new PuzzleAudioGuidance();

    // =========================================================================
    // --- 3. SYSTEM LOGIC & INTERACTIONS ---
    // =========================================================================

    // --- Global Auto-start Audio (First Interaction) ---
    const startAudioContext = () => {
        if (abyssAudio && !abyssAudio.isInitialized) {
            console.log("[SYSTEM] User interaction detected. Engaging ambient audio.");
            abyssAudio.init().catch(e => console.error(e));
            
            document.removeEventListener('click', startAudioContext);
            document.removeEventListener('keydown', startAudioContext);
            document.removeEventListener('touchstart', startAudioContext);
        }
    };
    document.addEventListener('click', startAudioContext);
    document.addEventListener('keydown', startAudioContext);
    document.addEventListener('touchstart', startAudioContext);

    // --- Slider Handlers ---

    window.updateDepth = function(value) {
        const val = parseInt(value);
        document.getElementById('depth-value').textContent = val;
        
        checkHackCondition(); 
        
        // Terror Layer Trigger (>95%)
        if (val > 95) {
            abyssAudio.setRawLayer(true);
            const audioStatus = document.getElementById('p5-audio-status');
            if(audioStatus) {
                audioStatus.textContent = "⚠ HYDROPHONE: RAW FEED";
                audioStatus.style.color = "#ff4136";
                audioStatus.style.animation = "blink 0.5s infinite";
            }
        } else {
            abyssAudio.setRawLayer(false);
            const audioStatus = document.getElementById('p5-audio-status');
            if(audioStatus) {
                audioStatus.textContent = "HYDROPHONE: FILTERED";
                audioStatus.style.color = ""; 
                audioStatus.style.animation = "";
            }
        }
    }

    window.updateTime = function(value) {
        document.getElementById('time-value').textContent = value;
        checkHackCondition(); 
    }
    
    window.updatePH = function(value) {
        document.getElementById('ph-value').textContent = value;
    }

    // --- Hacking Logic ---

    function checkHackCondition() {
        if (hackUnlocked) return; 

        const depthVal = parseInt(document.getElementById('depth-slider').value);
        const timeVal = parseInt(document.getElementById('time-slider').value);

        // Update Puzzle Audio (Geiger Counter)
        puzzleAudio.start();
        puzzleAudio.update(depthVal, timeVal);

        // Check if targets met
        const isTimeCorrect = Math.abs(timeVal - HACK_TARGET_TIME) <= TOLERANCE;
        const isDepthCorrect = depthVal <= 10; 

        const statusLight = document.getElementById('system-status-light');
        const statusText = document.getElementById('system-status-text');
        
        if (!statusLight) return;

        if (isTimeCorrect && isDepthCorrect) {
            if (!statusLight.classList.contains('critical-error')) {
                // Play Lock Sound
                puzzleAudio.playLockSound();
                
                statusLight.classList.add('critical-error');
                if(statusText) {
                    statusText.textContent = "FATAL ERROR";
                    statusText.style.color = "#ff4136";
                }
                console.log("[HACK] Condition Met. Waiting for manual override...");
            }
        } else {
            if (statusLight.classList.contains('critical-error')) {
                // Lost lock, reset audio guidance
                puzzleAudio.reset();
                puzzleAudio.start();

                statusLight.classList.remove('critical-error');
                if(statusText) {
                    statusText.textContent = "SYSTEM ONLINE";
                    statusText.style.color = "";
                }
            }
        }
    }

    // --- Specimen Navigation ---

    window.loadSpecimen = function(id) {
        if (id === 'SYS-LOG' && !hackUnlocked) return;

        document.querySelectorAll('.specimen-item').forEach(item => {
            item.classList.remove('active');
        });
        
        let clickedItem;
        if (id === 'SYS-LOG') {
            clickedItem = document.getElementById('sys-kernel-tab');
        } else {
             clickedItem = document.querySelector(`.specimen-item[onclick="loadSpecimen('${id}')"]`);
        }
        if (clickedItem) clickedItem.classList.add('active');
        
        const specimenContent = document.getElementById('specimen-content');
        const systemLogContent = document.getElementById('system-log-content');

        if (id === 'SYS-LOG') {
            if (specimenContent) specimenContent.style.display = 'none';
            if (systemLogContent) systemLogContent.style.display = 'block';
            const logContent = document.querySelector('#system-log-content .notes-content');
            if(logContent) setTimeout(() => logContent.scrollTop = logContent.scrollHeight, 100);
        } else {
            if (specimenContent) specimenContent.style.display = 'block';
            if (systemLogContent) systemLogContent.style.display = 'none';
            if (specimenData[id]) updateDataDisplay(specimenData[id], id);
            if (myP5Sketch) myP5Sketch.setVisMode(id);
        }
    }

    function updateDataDisplay(data, id) {
        const dataBoxes = document.querySelectorAll('#specimen-content .data-box');
        const notes = specimenNotes[id];

        if (dataBoxes.length > 3) {
            dataBoxes[0].querySelector('.data-box-value').textContent = data.genetic + '%';
            dataBoxes[0].querySelector('.data-box-bar-fill').style.width = data.genetic + '%';
            dataBoxes[1].querySelector('.data-box-value').textContent = data.survival + '%';
            dataBoxes[1].querySelector('.data-box-bar-fill').style.width = (data.survival * 100) + '%';
            dataBoxes[2].querySelector('.data-box-value').textContent = (data.adaptation / 10).toFixed(1) + '/10';
            dataBoxes[2].querySelector('.data-box-bar-fill').style.width = data.adaptation + '%';
            dataBoxes[3].querySelector('.data-box-value').textContent = data.stability + '%';
            const barFill = dataBoxes[3].querySelector('.data-box-bar-fill');
            barFill.style.width = Math.abs(data.stability) + '%';
            if (data.stability < 0) barFill.classList.add('decline');
            else barFill.classList.remove('decline');
        }

        const notesHeader = document.querySelector('#specimen-content .notes-header');
        const notesContent = document.querySelector('#specimen-content .notes-content');
        
        if (notesHeader && notesContent && notes) {
            if (id === 'AML-2847' && hackUnlocked) {
                 notesHeader.innerHTML = notes.header + ' <span style="color:red">[DECRYPTED]</span>';
                 let tempDiv = document.createElement('div');
                 tempDiv.innerHTML = notes.content;
                 let official = tempDiv.querySelector('.official-text');
                 let truth = tempDiv.querySelector('.truth-text');
                 if(truth) truth.style.display = 'block'; 
                 if(official) official.style.display = 'none';
                 notesContent.innerHTML = tempDiv.innerHTML;
            } else {
                 notesHeader.textContent = notes.header;
                 notesContent.innerHTML = notes.content; 
                 if (!notes.content.includes('official-text')) {
                     notesContent.innerHTML = notes.content.replace(/\n/g, '<br>');
                 }
            }
        }
    }

    // --- Unlock & Reset Logic ---

    function setupStatusLightInteraction() {
        const statusLight = document.getElementById('system-status-light');
        const statusText = document.getElementById('system-status-text');
        if (!statusLight) return;

        const startBreach = (e) => {
            if (e.type === 'touchstart') e.preventDefault(); 
            if (hackUnlocked) return;
            if (!statusLight.classList.contains('critical-error')) return;

            console.log("[HACK] Initiating breach...");
            playGlitchSound(true); 
            if(statusText) statusText.textContent = "OVERRIDING...";
            
            breachTimer = setTimeout(() => {
                triggerUnlockSequence();
            }, 3000); 
        };

        const endBreach = () => {
            if (hackUnlocked) return;
            if (breachTimer) {
                clearTimeout(breachTimer);
                breachTimer = null;
            }
            playGlitchSound(false); 
            if (statusLight.classList.contains('critical-error') && statusText) {
                statusText.textContent = "FATAL ERROR";
            }
        };

        statusLight.addEventListener('mousedown', startBreach);
        statusLight.addEventListener('touchstart', startBreach);
        document.addEventListener('mouseup', endBreach);
        document.addEventListener('touchend', endBreach);
    }

    function triggerUnlockSequence() {
        hackUnlocked = true;
        clearTimeout(breachTimer);
        playGlitchSound(false);
        console.log("[HACK] SYSTEM BREACH SUCCESSFUL");

        // [UPDATED] Trigger Glitch for 0.5s ONLY
        isBreaching = true;
        setTimeout(() => {
            isBreaching = false;
        }, 200); // Stop glitch after 500ms

        const overlay = document.getElementById('breach-overlay');
        if(overlay) overlay.classList.add('breach-active');
        
        playSuccessSound();

        const statusLight = document.getElementById('system-status-light');
        const statusText = document.getElementById('system-status-text');
        if(statusLight) {
            statusLight.classList.remove('critical-error');
            statusLight.style.backgroundColor = "black";
        }
        if(statusText) statusText.textContent = "SYSTEM OFFLINE";

        const kernelTab = document.getElementById('sys-kernel-tab');
        if(kernelTab) {
            kernelTab.classList.remove('locked');
            kernelTab.classList.add('active'); 
            const nameEl = kernelTab.querySelector('.specimen-name');
            if(nameEl) nameEl.textContent = ">>> MANIFESTO REVEALED <<<";
        }

        const currentActive = document.querySelector('.specimen-item.active');
        if(currentActive && currentActive.querySelector('.specimen-id').textContent === 'AML-2847') {
             updateDataDisplay(specimenData['AML-2847'], 'AML-2847');
        }

        setTimeout(() => {
            loadSpecimen('SYS-LOG');
        }, 1500);

        console.log(`[SYS] Reset timer set for ${RESET_DELAY / 1000} seconds.`);
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(resetSystem, RESET_DELAY);
    }

    function resetSystem() {
        console.log("[SYS] Performing System Reset...");
        hackUnlocked = false;
        isBreaching = false;

        puzzleAudio.reset(); // Reset Audio
        
        const depthSlider = document.getElementById('depth-slider');
        const timeSlider = document.getElementById('time-slider');
        if (depthSlider) { depthSlider.value = 50; document.getElementById('depth-value').textContent = 50; }
        if (timeSlider) { timeSlider.value = 80; document.getElementById('time-value').textContent = 80; }

        const statusLight = document.getElementById('system-status-light');
        const statusText = document.getElementById('system-status-text');
        if(statusLight) { statusLight.classList.remove('critical-error'); statusLight.style.backgroundColor = ""; }
        if(statusText) { statusText.textContent = "SYSTEM ONLINE"; statusText.style.color = ""; }

        const kernelTab = document.getElementById('sys-kernel-tab');
        if(kernelTab) {
            kernelTab.classList.add('locked');
            kernelTab.classList.remove('active');
            const nameEl = kernelTab.querySelector('.specimen-name');
            if(nameEl) nameEl.textContent = "Generation Logs & Errors"; 
        }

        const overlay = document.getElementById('breach-overlay');
        if(overlay) overlay.classList.remove('breach-active');

        loadSpecimen('AML-2847');
        console.log("[SYS] Reset Complete.");
    }

    function updateClock() {
        const now = new Date();
        const year = 2157, month = '03', day = '24';
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const currentTimeEl = document.getElementById('current-time');
        if (currentTimeEl) currentTimeEl.textContent = `${year}.${month}.${day} ${timeString} UTC`;
        const updateTimeEl = document.getElementById('update-time');
        if (updateTimeEl) updateTimeEl.textContent = timeString;
        const logClock = document.getElementById('update-time-log');
        if (logClock) logClock.textContent = timeString;
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '5') {
            const sections = ['AML-2847', 'ALGO-NVDA', 'ALGO-SENT', 'ALGO-GOOG', 'SYS-LOG'];
            const index = parseInt(e.key) - 1;
            if (sections[index]) loadSpecimen(sections[index]);
        }
        if (e.key === 'r' || e.key === 'R') resetSystem();
        if (e.key === 'a' || e.key === 'A') if (myP5Sketch) myP5Sketch.toggleAudio();
    });

    // Simple Audio Utils (For Glitch/Success effects)
    let simpleAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let sOsc = null;
    let sGain = null;

    function playGlitchSound(active) {
        if (active) {
            if (sOsc) return;
            if (simpleAudioCtx.state === 'suspended') simpleAudioCtx.resume();
            sOsc = simpleAudioCtx.createOscillator();
            sGain = simpleAudioCtx.createGain();
            sOsc.type = 'sawtooth';
            sOsc.frequency.setValueAtTime(100, simpleAudioCtx.currentTime);
            sOsc.frequency.linearRampToValueAtTime(800, simpleAudioCtx.currentTime + 0.1);
            sOsc.frequency.linearRampToValueAtTime(1200, simpleAudioCtx.currentTime + 0.3);
            let lfo = simpleAudioCtx.createOscillator();
            lfo.type = 'square'; lfo.frequency.value = 30; 
            let lfoGain = simpleAudioCtx.createGain(); lfoGain.gain.value = 500;
            lfo.connect(lfoGain); lfoGain.connect(sOsc.frequency);
            lfo.start();
            sGain.gain.setValueAtTime(0.1, simpleAudioCtx.currentTime);
            sOsc.connect(sGain); sGain.connect(simpleAudioCtx.destination);
            sOsc.start();
        } else {
            if (sOsc) { sOsc.stop(); sOsc.disconnect(); sOsc = null; }
        }
    }
    function playSuccessSound() {
        if (simpleAudioCtx.state === 'suspended') simpleAudioCtx.resume();
        let osc = simpleAudioCtx.createOscillator();
        let gain = simpleAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, simpleAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, simpleAudioCtx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.3, simpleAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, simpleAudioCtx.currentTime + 1.5);
        osc.connect(gain); gain.connect(simpleAudioCtx.destination);
        osc.start(); osc.stop(simpleAudioCtx.currentTime + 1.5);
    }

    // =========================================================================
    // --- 4. P5.JS SKETCH (VISUALIZATION + BREACH GLITCH) ---
    // =========================================================================

    const p5_sketch = ( p ) => {
        let mic;
        let audioEnabled = false;
        let audioLevel = 0;
        let acousticField = [];
        let pg; 
        let detectionRipples = [];
        let parameterBoxes = [];
        let time = 0;
        let currentVisMode = 'AML-2847';
        let container, canvas;
        const FIELD_RESOLUTION = 60, MAX_RIPPLES = 15, MAX_PARAM_BOXES = 30;
        let mouseX_el, mouseY_el, inputStatus_el, fps_el, audioStatus_el;
        
        // Data Rot Vars
        let entropy = 0;
        const ENTROPY_THRESHOLD = 120; // 2 seconds idle

        p.setup = () => {
            container = document.getElementById('p5-container');
            if(container) {
                canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
                canvas.parent('p5-container');
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
            }
        };

        p.draw = () => {
            if (p.frameCount % 30 === 0) if(fps_el) fps_el.textContent = p.frameRate().toFixed(0);
            if(mouseX_el) mouseX_el.textContent = p.mouseX.toFixed(0);
            if(mouseY_el) mouseY_el.textContent = p.mouseY.toFixed(0);

            // Draw Modes
            switch(currentVisMode) {
                case 'AML-2847': p.drawModeDefault(); break;
                case 'ALGO-NVDA': p.drawModeNVDA(); break;
                case 'ALGO-SENT': p.drawModeSentiment(); break;
                case 'ALGO-GOOG': p.drawModeGoogle(); break;
                default: p.drawModeDefault();
            }

            // === VISUAL GLITCH LOGIC (Data Rot + Breach) ===
            
            let activeIntensity = 0;

            // 1. Calculate Standard Entropy (Idle)
            if (p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY) < 1) {
                entropy++;
            } else {
                if (entropy > 0 && !isBreaching) {
                    entropy = 0;
                    document.body.style.filter = '';
                    document.body.style.transform = '';
                    document.body.style.opacity = '';
                }
            }
            if (entropy > ENTROPY_THRESHOLD) {
                activeIntensity = (entropy - ENTROPY_THRESHOLD) * 0.1;
                activeIntensity = p.constrain(activeIntensity, 0, 30);
            }

            // 2. OVERRIDE: Breach Mode (Max Chaos)
            if (isBreaching) {
                activeIntensity = 100; // Force Max Intensity
                entropy = ENTROPY_THRESHOLD + 1000; // Prevent reset
            }

            // 3. Apply Effects
            if (activeIntensity > 0) {
                
                // A. Canvas Slicing
                let loopCount = isBreaching ? 5 : 1; 
                
                for(let i=0; i<loopCount; i++) {
                    if (p.random(100) < activeIntensity) {
                        let y = p.floor(p.random(p.height));
                        let h = p.floor(p.random(2, isBreaching ? 80 : 30)); 
                        let xOffset = p.random(-15, 15) * (activeIntensity / 5);
                        let slice = p.get(0, y, p.width, h);
                        p.image(slice, xOffset, y);
                    }
                }

                // B. Breach Specific: Invert & Color Separations
                if (isBreaching && p.frameCount % 4 === 0) {
                    p.filter(p.POSTERIZE, 4);
                    if(p.random() > 0.8) p.filter(p.INVERT); 
                }

                // C. DOM Corruption (CSS)
                let shakeX = p.random(-1, 1) * (activeIntensity * 0.05); 
                let shakeY = p.random(-1, 1) * (activeIntensity * 0.05);
                
                let sat = p.map(activeIntensity, 0, 30, 0.9, 0.4); 
                let cont = p.map(activeIntensity, 0, 30, 1, 1.2);
                let blur = p.map(activeIntensity, 0, 30, 0, 1.5);
                let hue = 0;
                let skew = 0;

                if (activeIntensity > 50) {
                    hue = p.random(-90, 90);
                    sat = 2; cont = 2; blur = 0; 
                    skew = p.random(-2, 2); 
                } else if (activeIntensity > 25) {
                    hue = p.random(-5, 5);
                }

                document.body.style.transform = `translate(${shakeX}px, ${shakeY}px) skewX(${skew}deg)`;
                document.body.style.filter = `saturate(${sat}) contrast(${cont}) blur(${blur}px) hue-rotate(${hue}deg)`;

                if (isBreaching && p.frameCount % 10 === 0) {
                     document.body.style.backgroundColor = p.random() > 0.5 ? '#110000' : '#000000';
                }
            } else {
                 document.body.style.backgroundColor = '';
            }
        };

        p.windowResized = () => {
            container = document.getElementById('p5-container');
            if (container && container.offsetWidth > 0) {
                p.resizeCanvas(container.offsetWidth, container.offsetHeight);
                pg = p.createGraphics(p.width, p.height);
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
            if (p.getAudioContext().state !== 'running') p.getAudioContext().resume();
            audioEnabled = !audioEnabled;
            if (audioEnabled) {
                if (!mic) { mic = new p5.AudioIn(); mic.start(); } else { mic.start(); }
                if(inputStatus_el) inputStatus_el.textContent = "AUDIO";
            } else {
                if (mic) mic.stop();
                if(inputStatus_el) inputStatus_el.textContent = "MOUSE";
            }
        };

        // --- Visual Modes Impl (Standard) ---
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

        // Handlers
        p.mousePressed = (event) => {
            if (p.getAudioContext().state !== 'running') p.getAudioContext().resume();
            if (event.target !== canvas.elt) return;
            if (detectionRipples.length < MAX_RIPPLES) detectionRipples.push(new AcousticRipple(p, pg, p.mouseX, p.mouseY, p.random(0.5, 1)));
        };
        p.mouseDragged = () => {
            if (p.mouseX < 0 || p.mouseY < 0 || p.mouseX > p.width || p.mouseY > p.height) return;
            if (p.frameCount % 5 === 0 && detectionRipples.length < MAX_RIPPLES) detectionRipples.push(new AcousticRipple(p, pg, p.mouseX, p.mouseY, p.random(0.3, 0.7)));
        };
    };

    class AcousticRipple {
        constructor(p, pg, x, y, intensity) {
            this.p = p; this.pg = pg; this.x = x; this.y = y;
            this.radius = 0; this.maxRadius = p.random(100, 300);
            this.intensity = intensity; this.age = 0; this.maxAge = 120;
        }
        update() { this.age++; this.radius += this.maxRadius / this.maxAge; this.intensity *= 0.97; }
        display(r, g, b) {
            let alpha = this.p.map(this.age, 0, this.maxAge, 255, 0);
            this.pg.noFill(); this.pg.stroke(r, g, b, alpha * this.intensity); this.pg.strokeWeight(2);
            this.pg.circle(this.x, this.y, this.radius * 2);
            this.pg.stroke(r, g, b, alpha * 0.5 * this.intensity); this.pg.strokeWeight(1);
            this.pg.circle(this.x, this.y, this.radius * 1.5);
        }
        isDead() { return this.age >= this.maxAge; }
    }
    class ParameterBox {
        constructor(p) {
            this.p = p; this.x = p.random(p.width * 0.05, p.width * 0.95); this.y = p.random(p.height * 0.05, p.height * 0.65);
            this.w = p.random(70, 140); this.h = p.random(35, 60);
            this.numbers = this.generateNumbers();
            this.age = 0; this.maxAge = p.random(120, 240);
            this.blinkPhase = p.random(p.TWO_PI); this.updateInterval = p.floor(p.random(40, 80));
        }
        generateNumbers() {
            const p = this.p;
            const formats = [
                () => p.floor(p.random(0, 9999)).toString(),
                () => p.random(0, 999).toFixed(p.random([1, 2, 3])),
                () => { let h = p.floor(p.random(0, 65535)).toString(16).toUpperCase(); return '0x' + h.padStart(4, '0'); }
            ];
            let numCount = p.floor(p.random(1, 4)); let nums = [];
            for (let i = 0; i < numCount; i++) nums.push(p.random(formats)());
            return nums;
        }
        update() {
            this.age++; if (this.age % this.updateInterval === 0 && this.p.random() > 0.5) this.numbers[this.p.floor(this.p.random(this.numbers.length))] = this.generateNumbers()[0];
            this.blinkPhase += 0.08;
        }
        display() {
            const p = this.p; let blink = p.sin(this.blinkPhase) * 0.4 + 0.6;
            p.push(); p.noFill(); p.stroke(0, 255, 65, 150); p.strokeWeight(1);
            p.rect(this.x, this.y, this.w, this.h);
            p.stroke(0, 255, 65, 200); p.strokeWeight(2); let cs = 5;
            p.line(this.x, this.y, this.x + cs, this.y); p.line(this.x, this.y, this.x, this.y + cs);
            p.line(this.x + this.w, this.y, this.x + this.w - cs, this.y); p.line(this.x + this.w, this.y, this.x + this.w, this.y + cs);
            p.drawingContext.save(); p.drawingContext.rect(this.x + 2, this.y + 2, this.w - 4, this.h - 4); p.drawingContext.clip();
            p.noStroke(); p.fill(0, 255, 65, 200 * blink); p.textAlign(p.CENTER, p.CENTER);
            let totalHeight = (this.numbers.length - 1) * 15; let startY = this.y + this.h / 2 - totalHeight / 2;
            for (let i = 0; i < this.numbers.length; i++) { p.textSize(this.numbers.length === 1 ? 15 : 12); p.text(this.numbers[i], this.x + this.w / 2, startY + i * 15); }
            p.drawingContext.restore();
            if (p.random() > 0.95) { p.stroke(0, 255, 65, p.random(100, 200)); p.strokeWeight(1); p.line(this.x, this.y + p.random(this.h), this.x + this.w, this.y + p.random(this.h)); }
            p.pop();
        }
        isDead() { return this.age >= this.maxAge; }
    }

    // --- INIT ---
    myP5Sketch = new p5(p5_sketch, 'p5-container');
    setupStatusLightInteraction();
    loadSpecimen('AML-2847');
    updateClock();
    setInterval(updateClock, 1000);
    
    console.log("%c AML-SYSTEM v3.1.2 INITIALIZED ", "background: #000; color: #0f0; font-size: 14px; padding: 5px;");
    const originalError = console.error;
    console.error = function(...args) {
        if (args[0] && args[0].includes('404')) originalError("[MEMORY HOLE] File deleted from record.");
        else originalError(...args);
    };

});

// =========================================================================
    // --- SECURITY PROTOCOL: DISABLE CONTEXT MENU ---
    // =========================================================================
    
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // 阻止默认的右键菜单弹出
    });