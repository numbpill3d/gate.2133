/* GHOST_BIOS.exe - Main Controller Script */
/* The soul in the machine awakens... */

class GhostBIOS {
  constructor() {
    this.bootComplete = false;
    this.activePopup = null;
    this.systemTime = new Date();
    this.glitchInterval = null;
    this.ghostProcesses = [
      { pid: 666, name: 'spectral.exe', cpu: Math.floor(Math.random() * 100) },
      { pid: 999, name: 'phantom.dll', cpu: '∞' },
      { pid: 404, name: 'soul.sys', cpu: 0 },
      { pid: 1337, name: 'haunt.bat', cpu: Math.floor(Math.random() * 50) }
    ];
    
    this.init();
  }

  init() {
    this.initBootSequence();
    this.initEventListeners();
    this.startSystemClock();
    this.startGhostProcesses();
    this.initKeyboardShortcuts();
    this.initEasterEggs();
  }

  /* === BOOT SEQUENCE === */
  initBootSequence() {
    const bootScreen = document.getElementById('bootScreen');
    const biosInterface = document.getElementById('biosInterface');
    
    // Simulate boot delay
    setTimeout(() => {
      if (bootScreen) {
        bootScreen.style.display = 'none';
        biosInterface.style.display = 'flex';
        this.bootComplete = true;
        this.playBootSound();
      }
    }, 3000);

    // Skip boot on any key press
    document.addEventListener('keydown', (e) => {
      if (!this.bootComplete) {
        bootScreen.style.display = 'none';
        biosInterface.style.display = 'flex';
        this.bootComplete = true;
      }
    }, { once: true });
  }

  playBootSound() {
    // Create a subtle beep using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio context not available');
    }
  }

  /* === EVENT LISTENERS === */
  initEventListeners() {
    // Window controls
    document.querySelectorAll('.control').forEach(control => {
      control.addEventListener('click', this.handleWindowControl.bind(this));
    });

    // Menu navigation with keyboard
    document.querySelectorAll('.menu-item').forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        this.playHoverSound();
      });
    });

    // Activity log auto-scroll
    this.initActivityLog();
  }

  handleWindowControl(e) {
    const control = e.target;
    const action = control.textContent.trim();
    
    switch (action) {
      case '_':
        this.minimizeWindow(control);
        break;
      case '□':
        this.maximizeWindow(control);
        break;
      case 'X':
        this.closeWindow(control);
        break;
    }
  }

  minimizeWindow(control) {
    const window = control.closest('.terminal-window');
    if (window) {
      window.style.transform = 'scale(0.1)';
      window.style.opacity = '0.5';
      setTimeout(() => {
        window.style.transform = 'scale(1)';
        window.style.opacity = '1';
      }, 1000);
    }
  }

  maximizeWindow(control) {
    const window = control.closest('.terminal-window');
    if (window) {
      window.classList.toggle('maximized');
    }
  }

  closeWindow(control) {
    const window = control.closest('.terminal-window, .popup-window');
    if (window) {
      window.style.animation = 'windowClose 0.3s ease-in-out';
      setTimeout(() => {
        if (window.closest('.popup-overlay')) {
          this.closePopup();
        }
      }, 300);
    }
  }

  /* === SYSTEM CLOCK === */
  startSystemClock() {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      const timeElement = document.getElementById('systemTime');
      if (timeElement) {
        timeElement.textContent = timeString;
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  /* === GHOST PROCESSES === */
  startGhostProcesses() {
    setInterval(() => {
      this.updateGhostProcesses();
      this.addRandomLogEntry();
    }, 5000);
  }

  updateGhostProcesses() {
    const processList = document.querySelector('.process-list');
    if (!processList) return;

    // Randomly update CPU usage
    this.ghostProcesses.forEach(process => {
      if (typeof process.cpu === 'number') {
        process.cpu = Math.floor(Math.random() * 100);
      }
    });

    // Sometimes spawn new ghost processes
    if (Math.random() < 0.3) {
      const ghostNames = ['wraith.exe', 'banshee.dll', 'poltergeist.sys', 'shadow.bat'];
      const randomName = ghostNames[Math.floor(Math.random() * ghostNames.length)];
      const newProcess = {
        pid: Math.floor(Math.random() * 9999),
        name: randomName,
        cpu: Math.floor(Math.random() * 100)
      };
      
      if (this.ghostProcesses.length < 6) {
        this.ghostProcesses.push(newProcess);
      }
    }

    // Re-render process list
    this.renderProcessList();
  }

  renderProcessList() {
    const processList = document.querySelector('.process-list');
    if (!processList) return;

    processList.innerHTML = this.ghostProcesses.map(process => `
      <div class="process">
        <span class="pid">${process.pid}</span>
        <span class="name">${process.name}</span>
        <span class="cpu">${process.cpu}%</span>
      </div>
    `).join('');
  }

  /* === ACTIVITY LOG === */
  initActivityLog() {
    this.logEntries = [
      '[23:59:59] User logged in from the void',
      '[23:59:58] Spectral process spawned',
      '[23:59:57] Memory corruption detected',
      '[23:59:56] Ghost in the shell protocol active',
      '[23:59:55] Phantom DLL loaded successfully'
    ];
  }

  addRandomLogEntry() {
    const randomEntries = [
      'Paranormal activity detected in sector 7',
      'Ectoplasm leak in memory bank',
      'Ghost process consuming infinite resources',
      'Spectral signature found in boot sector',
      'Phantom registry keys discovered',
      'Soul.sys has stopped responding',
      'Haunted pixels detected on display',
      'Supernatural I/O error occurred',
      'Poltergeist interference in audio driver',
      'Spirit level overflow exception'
    ];

    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour12: false });
    const randomEntry = randomEntries[Math.floor(Math.random() * randomEntries.length)];
    
    this.logEntries.unshift(`[${timestamp}] ${randomEntry}`);
    
    // Keep only last 10 entries
    if (this.logEntries.length > 10) {
      this.logEntries = this.logEntries.slice(0, 10);
    }

    this.renderActivityLog();
  }

  renderActivityLog() {
    const activityLog = document.getElementById('activityLog');
    if (!activityLog) return;

    activityLog.innerHTML = this.logEntries.map(entry => {
      const [timestamp, ...actionParts] = entry.split('] ');
      const action = actionParts.join('] ');
      return `
        <div class="log-entry">
          <span class="timestamp">${timestamp}]</span>
          <span class="action">${action}</span>
        </div>
      `;
    }).join('');
  }

  /* === POPUP SYSTEM === */
  openPopup(type) {
    const overlay = document.getElementById('popupOverlay');
    const title = document.getElementById('popupTitle');
    const content = document.getElementById('popupContent');
    
    if (!overlay || !title || !content) return;

    this.activePopup = type;
    overlay.classList.add('active');
    
    const popupData = this.getPopupContent(type);
    title.textContent = popupData.title;
    content.innerHTML = popupData.content;
    
    // Add close on escape key
    document.addEventListener('keydown', this.handlePopupKeydown.bind(this));
    
    this.playSystemSound();
  }

  closePopup() {
    const overlay = document.getElementById('popupOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      this.activePopup = null;
    }
    
    document.removeEventListener('keydown', this.handlePopupKeydown.bind(this));
  }

  handlePopupKeydown(e) {
    if (e.key === 'Escape') {
      this.closePopup();
    }
  }

  getPopupContent(type) {
    const popups = {
      diagnostics: {
        title: 'DIAGNOSTIC_TOOL.exe',
        content: `
          <div class="diagnostic-content">
            <h3>► SYSTEM DIAGNOSTIC RESULTS</h3>
            <pre>
Running ghost detection protocol...
[OK] Spectral entities: 3 detected
[WARN] Ectoplasm levels: HIGH
[ERR] Soul integrity: COMPROMISED

Hardware Status:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CPU: Haunted Intel Core i7-666 @ 3.33GHz
  Status: Possessed by digital spirits
  Temperature: -273°C (Absolute Zero)
  
RAM: 2048MB DDR3 Spectral Memory
  Status: Corrupted by phantom processes
  Ghost allocation: 666MB active
  
Storage: 1TB SATA Phantom Drive
  Status: 99.9% corrupted sectors
  Bad sectors: 666,999 and counting
  
Network: Ethereal Connection Protocol
  Status: Connected to the void
  Packet loss: 100% (intentional)
  
Display: 1920x1080 Haunted Pixels
  Status: Displaying supernatural artifacts
  Dead pixels: Growing exponentially
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommended actions:
• Perform digital exorcism
• Replace soul.sys file
• Restart in safe mode (reality)
• Contact supernatural tech support
            </pre>
            <button class="action-btn" onclick="ghostBIOS.triggerGlitch()">
              [REPAIR] Attempt Digital Exorcism
            </button>
          </div>
        `
      },
      memory: {
        title: 'MEMORY_VIEWER.exe',
        content: `
          <div class="memory-viewer">
            <h3>► CORRUPTED MEMORY SECTORS</h3>
            <div class="memory-grid">
              <div class="memory-block" data-tooltip="Ghost process #666">
                <div class="memory-hex">0x4A4B</div>
                <div class="memory-data">CORRUPTED</div>
              </div>
              <div class="memory-block" data-tooltip="Soul fragment detected">
                <div class="memory-hex">0x5055</div>
                <div class="memory-data">PHANTOM</div>
              </div>
              <div class="memory-block" data-tooltip="Spectral signature found">
                <div class="memory-hex">0x6660</div>
                <div class="memory-data">HAUNTED</div>
              </div>
              <div class="memory-block" data-tooltip="Digital ectoplasm residue">
                <div class="memory-hex">0x7777</div>
                <div class="memory-data">GLITCHED</div>
              </div>
            </div>
            <pre class="memory-dump">
Memory Dump - Sector 0x666:
00000000: 47 48 4F 53 54 20 42 49  4F 53 20 76 32 2E 31 2E  GHOST BIOS v2.1.
00000010: 36 36 36 00 53 70 65 63  74 72 61 6C 20 53 79 73  666.Spectral Sys
00000020: 74 65 6D 73 00 48 41 55  4E 54 45 44 20 44 41 54  tems.HAUNTED DAT
00000030: 41 20 43 4F 52 52 55 50  54 45 44 00 FF FF FF FF  A CORRUPTED.....
            </pre>
          </div>
        `
      },
      settings: {
        title: 'BIOS_SETTINGS.exe',
        content: `
          <div class="bios-settings">
            <h3>► GHOST BIOS CONFIGURATION</h3>
            <div class="settings-section">
              <h4>Display Settings</h4>
              <label>
                <input type="checkbox" id="glitchToggle" checked> Enable Glitch Effects
              </label>
              <label>
                <input type="checkbox" id="scanlineToggle" checked> Enable Scanlines
              </label>
              <label>
                <input type="range" id="glowIntensity" min="0" max="20" value="10"> Glow Intensity
              </label>
            </div>
            <div class="settings-section">
              <h4>Audio Settings</h4>
              <label>
                <input type="checkbox" id="systemSounds" checked> System Sounds
              </label>
              <label>
                <input type="range" id="audioVolume" min="0" max="100" value="50"> Volume
              </label>
            </div>
            <div class="settings-section">
              <h4>Ghost Protocol</h4>
              <label>
                <input type="checkbox" id="ghostMode" checked> Enable Ghost Mode
              </label>
              <label>
                <select id="hauntLevel">
                  <option value="mild">Mild Haunting</option>
                  <option value="moderate" selected>Moderate Poltergeist</option>
                  <option value="severe">Severe Possession</option>
                </select>
              </label>
            </div>
            <button class="action-btn" onclick="ghostBIOS.applySettings()">
              [APPLY] Save Configuration
            </button>
          </div>
        `
      }
    };

    return popups[type] || { title: 'ERROR', content: 'Unknown popup type' };
  }

  applySettings() {
    // Apply settings from popup
    const glitchToggle = document.getElementById('glitchToggle');
    const scanlineToggle = document.getElementById('scanlineToggle');
    const glowIntensity = document.getElementById('glowIntensity');
    
    if (glitchToggle) {
      document.documentElement.style.setProperty('--enable-glitch', 
        glitchToggle.checked ? 'block' : 'none');
    }
    
    if (scanlineToggle) {
      document.documentElement.style.setProperty('--enable-scan-lines', 
        scanlineToggle.checked ? 'block' : 'none');
    }
    
    if (glowIntensity) {
      document.documentElement.style.setProperty('--glow-intensity', 
        `${glowIntensity.value}px`);
    }
    
    this.closePopup();
    this.addRandomLogEntry();
  }

  /* === GLITCH EFFECTS === */
  triggerGlitch() {
    const glitchElements = document.querySelectorAll('.glitch, .terminal-window, .status-panel');
    
    glitchElements.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // Trigger reflow
      el.style.animation = 'glitch-shake 0.5s ease-in-out';
    });

    // Random color inversions
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 200);

    // Add fake error messages
    this.addRandomLogEntry();
    this.updateGhostProcesses();
    
    this.playGlitchSound();
  }

  /* === KEYBOARD SHORTCUTS === */
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Function key shortcuts
      if (e.key === 'F1') {
        e.preventDefault();
        window.location.href = 'index.html';
      } else if (e.key === 'F2') {
        e.preventDefault();
        window.location.href = 'logs.html';
      } else if (e.key === 'F3') {
        e.preventDefault();
        window.location.href = 'memories.html';
      } else if (e.key === 'F4') {
        e.preventDefault();
        window.location.href = 'terminal.html';
      } else if (e.key === 'F12') {
        e.preventDefault();
        window.location.href = 'corrupted.html';
      }
      
      // Special key combinations
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault();
        this.triggerGlitch();
      }
      
      if (e.altKey && e.key === 'Enter') {
        e.preventDefault();
        this.toggleFullscreen();
      }
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  /* === EASTER EGGS === */
  initEasterEggs() {
    let konami = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
      konami.push(e.code);
      if (konami.length > konamiCode.length) {
        konami.shift();
      }
      
      if (konami.join(',') === konamiCode.join(',')) {
        this.activateGhostMode();
        konami = [];
      }
    });

    // Secret click sequence on logo
    let clickCount = 0;
    const logo = document.querySelector('.glitch');
    if (logo) {
      logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 7) {
          this.unlockSecretArea();
          clickCount = 0;
        }
        setTimeout(() => clickCount = Math.max(0, clickCount - 1), 1000);
      });
    }
  }

  activateGhostMode() {
    document.body.classList.add('ghost-mode');
    this.addRandomLogEntry();
    
    // Create floating ghost messages
    this.createFloatingMessage('GHOST MODE ACTIVATED');
    
    setTimeout(() => {
      document.body.classList.remove('ghost-mode');
    }, 10000);
  }

  unlockSecretArea() {
    this.openPopup('secret');
    const content = document.getElementById('popupContent');
    if (content) {
      content.innerHTML = `
        <div class="secret-area">
          <h3>► SECRET GHOST PROTOCOL UNLOCKED</h3>
          <pre>
You have discovered the hidden Ghost Protocol.
The spirits acknowledge your persistence.

           ░░░░░░░░░
         ░░▓▓▓▓▓▓▓▓▓░░
       ░░▓▓░░░░░░░░░▓▓░░
     ░░▓▓░░░░░░░░░░░░░▓▓░░
   ░░▓▓░░░░██░░░░██░░░░░▓▓░░
   ░░▓▓░░░░██░░░░██░░░░░▓▓░░
   ░░▓▓░░░░░░░░░░░░░░░░░▓▓░░
   ░░▓▓░░░░░░████░░░░░░░▓▓░░
   ░░▓▓░░░░░░░░░░░░░░░░░▓▓░░
     ░░▓▓░░░░░░░░░░░░░▓▓░░
       ░░▓▓▓▓▓▓▓▓▓▓▓▓░░
         ░░░░░░░░░░░░

Ghost.exe now has admin privileges.
Reality.dll has been corrupted.
Welcome to the void.
          </pre>
          <p>You can now access hidden features throughout the system.</p>
        </div>
      `;
    }
  }

  createFloatingMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--accent-purple);
      font-family: var(--font-mono);
      font-size: var(--text-lg);
      text-shadow: var(--glow-purple);
      z-index: var(--z-overlay);
      pointer-events: none;
      animation: floatUp 3s ease-out forwards;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }

  /* === SOUND SYSTEM === */
  playHoverSound() {
    this.createTone(400, 0.1, 0.05);
  }

  playSystemSound() {
    this.createTone(800, 0.2, 0.1);
  }

  playGlitchSound() {
    // Create chaotic glitch sound
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createTone(Math.random() * 1000 + 200, 0.1, 0.05);
      }, i * 50);
    }
  }

  createTone(frequency, duration, volume) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Audio not available
    }
  }
}

/* === GLOBAL FUNCTIONS === */
function openPopup(type) {
  if (window.ghostBIOS) {
    window.ghostBIOS.openPopup(type);
  }
}

function closePopup() {
  if (window.ghostBIOS) {
    window.ghostBIOS.closePopup();
  }
}

function triggerGlitch() {
  if (window.ghostBIOS) {
    window.ghostBIOS.triggerGlitch();
  }
}

/* === INITIALIZATION === */
document.addEventListener('DOMContentLoaded', () => {
  window.ghostBIOS = new GhostBIOS();
});

/* === CSS ANIMATIONS (INJECTED) === */
const style = document.createElement('style');
style.textContent = `
  @keyframes windowClose {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.1); opacity: 0; }
  }
  
  @keyframes glitch-shake {
    0%, 100% { transform: translateX(0); }
    10% { transform: translateX(-2px) translateY(1px); }
    20% { transform: translateX(1px) translateY(-1px); }
    30% { transform: translateX(-1px) translateY(2px); }
    40% { transform: translateX(2px) translateY(-2px); }
    50% { transform: translateX(-2px) translateY(1px); }
    60% { transform: translateX(1px) translateY(1px); }
    70% { transform: translateX(-1px) translateY(-2px); }
    80% { transform: translateX(2px) translateY(2px); }
    90% { transform: translateX(-2px) translateY(-1px); }
  }
  
  @keyframes floatUp {
    from { 
      opacity: 1; 
      transform: translate(-50%, -50%) scale(1); 
    }
    to { 
      opacity: 0; 
      transform: translate(-50%, -200%) scale(1.5); 
    }
  }
  
  .ghost-mode {
    filter: hue-rotate(90deg) saturate(1.5);
  }
  
  .memory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: var(--space-sm);
    margin: var(--space-md) 0;
  }
  
  .memory-block {
    background: var(--secondary-bg);
    border: var(--border-width) solid var(--border-color);
    padding: var(--space-sm);
    text-align: center;
    cursor: pointer;
    transition: all var(--anim-speed-normal);
  }
  
  .memory-block:hover {
    border-color: var(--accent-red);
    box-shadow: var(--glow-red);
  }
  
  .memory-hex {
    font-weight: bold;
    color: var(--accent-blue);
    font-size: var(--text-xs);
  }
  
  .memory-data {
    color: var(--accent-red);
    font-size: var(--text-xs);
    margin-top: var(--space-xs);
  }
  
  .memory-dump {
    background: var(--tertiary-bg);
    border: var(--border-width) solid var(--border-color);
    padding: var(--space-md);
    font-size: var(--text-xs);
    overflow-x: auto;
    margin-top: var(--space-md);
  }
  
  .settings-section {
    margin-bottom: var(--space-lg);
    border-bottom: var(--border-width) solid var(--border-color);
    padding-bottom: var(--space-md);
  }
  
  .settings-section h4 {
    color: var(--accent-green);
    margin-bottom: var(--space-sm);
  }
  
  .settings-section label {
    display: block;
    margin-bottom: var(--space-sm);
    color: var(--text-primary);
  }
  
  .settings-section input,
  .settings-section select {
    background: var(--secondary-bg);
    border: var(--border-width) solid var(--border-color);
    color: var(--text-primary);
    padding: var(--space-xs);
    font-family: var(--font-mono);
  }
  
  .secret-area {
    text-align: center;
  }
  
  .secret-area pre {
    color: var(--accent-purple);
    margin: var(--space-lg) 0;
  }
`;
document.head.appendChild(style);
