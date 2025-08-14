// Magical Coin Toss Application
class CoinTossApp {
    constructor() {
        this.coin = document.getElementById('coin');
        this.tossButton = document.getElementById('tossButton');
        this.shareButton = document.getElementById('shareButton');
        this.resultText = document.getElementById('resultText');
        this.headsCount = document.getElementById('headsCount');
        this.tailsCount = document.getElementById('tailsCount');
        this.themeIcon = document.querySelector('.theme-icon');
        
        this.stats = {
            heads: 0,
            tails: 0
        };
        
        this.isFlipping = false;
        this.currentTheme = this.getStoredTheme() || 'light';
        
        // Fun messages for results
        this.funMessages = {
            heads: [
                "🎉 HEADS! You're a winner!",
                "🌟 HEADS! The stars are shining on you!",
                "✨ HEADS! Magic is on your side!",
                "🎪 HEADS! The circus is in town!",
                "🌈 HEADS! Rainbow luck for you!"
            ],
            tails: [
                "🎭 TAILS! The show must go on!",
                "🎨 TAILS! Time to paint your luck!",
                "🎪 TAILS! The adventure continues!",
                "🌟 TAILS! New stars are waiting!",
                "🎈 TAILS! Balloons of joy for you!"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadStats();
        this.updateStatsDisplay();
        this.addFunEffects();
    }
    
    setupEventListeners() {
        this.tossButton.addEventListener('click', () => this.tossCoin());
        this.shareButton.addEventListener('click', () => this.shareResult());
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isFlipping) {
                e.preventDefault();
                this.tossCoin();
            }
        });
        
        // Add fun hover effects
        this.tossButton.addEventListener('mouseenter', () => this.playHoverSound());
    }
    
    addFunEffects() {
        // Add confetti effect to the page
        this.createConfetti();
        
        // Add floating elements
        this.createFloatingElements();
    }
    
    createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(confettiContainer);
    }
    
    createFloatingElements() {
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-container';
        floatingContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        const emojis = ['⭐', '🌟', '✨', '🎈', '🎪', '🎨', '🎭', '🎲'];
        
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.textContent = emojis[i];
            element.style.cssText = `
                position: absolute;
                font-size: 24px;
                opacity: 0.3;
                animation: float ${3 + i * 0.5}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            floatingContainer.appendChild(element);
        }
        
        document.body.appendChild(floatingContainer);
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    tossCoin() {
        if (this.isFlipping) return;
        
        this.isFlipping = true;
        this.tossButton.disabled = true;
        this.shareButton.disabled = true;
        
        // Clear previous result
        this.resultText.textContent = '';
        
        // Add flipping animation
        this.coin.classList.add('flipping');
        
        // Play flip sound
        this.playFlipSound();
        
        // Generate random result
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        
        // Update stats
        this.stats[result]++;
        this.saveStats();
        this.updateStatsDisplay();
        
        // Wait for animation to complete
        setTimeout(() => {
            this.coin.classList.remove('flipping');
            
            // Show result with confetti
            setTimeout(() => {
                this.displayResult(result);
                this.triggerConfetti();
                this.playResultSound(result);
                this.isFlipping = false;
                this.tossButton.disabled = false;
                this.shareButton.disabled = false;
            }, 500);
        }, 1500);
    }
    
    displayResult(result) {
        const messages = this.funMessages[result];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const resultClass = result === 'heads' ? 'result-heads' : 'result-tails';
        
        this.resultText.textContent = randomMessage;
        this.resultText.className = `result-text ${resultClass}`;
        
        // Add celebration animation
        this.resultText.style.animation = 'celebrate 0.8s ease-in-out';
        setTimeout(() => {
            this.resultText.style.animation = '';
        }, 800);
    }
    
    triggerConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        if (!confettiContainer) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9ff3', '#54a0ff'];
        const emojis = ['⭐', '🌟', '✨', '🎈', '🎪', '🎨', '🎭', '🎲'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.cssText = `
                    position: absolute;
                    left: ${Math.random() * 100}%;
                    top: -20px;
                    font-size: 20px;
                    color: ${colors[Math.floor(Math.random() * colors.length)]};
                    animation: confettiFall 3s linear forwards;
                    z-index: 1001;
                `;
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 100);
        }
        
        // Add confetti animation
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    playFlipSound() {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    playResultSound(result) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different sounds for heads and tails
        if (result === 'heads') {
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G
        } else {
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A
            oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1); // C#
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2); // E
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    playHoverSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    }
    
    updateStatsDisplay() {
        this.headsCount.textContent = this.stats.heads;
        this.tailsCount.textContent = this.stats.tails;
    }
    
    saveStats() {
        try {
            localStorage.setItem('coinTossStats', JSON.stringify(this.stats));
        } catch (error) {
            console.warn('Could not save stats to localStorage:', error);
        }
    }
    
    loadStats() {
        try {
            const savedStats = localStorage.getItem('coinTossStats');
            if (savedStats) {
                this.stats = JSON.parse(savedStats);
            }
        } catch (error) {
            console.warn('Could not load stats from localStorage:', error);
        }
    }
    
    shareResult() {
        const result = this.resultText.textContent;
        if (!result) {
            this.showNotification('🎪 No magic to share yet! Flip the coin first!', 'warning');
            return;
        }
        
        const shareData = {
            title: '🎮 Magical Coin Toss Result',
            text: `I got ${result} on the Magical Coin Toss! 🪙✨`,
            url: window.location.href
        };
        
        if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => {
                    this.showNotification('🎉 Magic shared successfully! ✨', 'success');
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                    this.fallbackShare(shareData);
                });
        } else {
            this.fallbackShare(shareData);
        }
    }
    
    fallbackShare(shareData) {
        const text = `${shareData.text}\n\nTry the magic yourself: ${shareData.url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    this.showNotification('🎪 Magic copied to clipboard! ✨', 'success');
                })
                .catch(() => {
                    this.showNotification('🎭 Sharing not supported on this browser.', 'warning');
                });
        } else {
            this.showNotification('🎭 Sharing not supported on this browser.', 'warning');
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #95e1d3, #4ecdc4)' : 
                        type === 'warning' ? 'linear-gradient(135deg, #ffe66d, #feca57)' : 
                        'linear-gradient(135deg, #ff9ff3, #ff6b6b)'};
            color: ${type === 'success' || type === 'warning' ? '#2c3e50' : 'white'};
            padding: 15px 25px;
            border-radius: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.4s ease;
            max-width: 350px;
            word-wrap: break-word;
            font-family: var(--font-family-display);
            font-weight: 600;
            border: 2px solid ${type === 'success' ? '#4ecdc4' : type === 'warning' ? '#feca57' : '#ff6b6b'};
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 4000);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
        
        // Play theme change sound
        this.playHoverSound();
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
    
    saveTheme() {
        try {
            localStorage.setItem('coinTossTheme', this.currentTheme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }
    
    getStoredTheme() {
        try {
            return localStorage.getItem('coinTossTheme');
        } catch (error) {
            console.warn('Could not load theme from localStorage:', error);
            return null;
        }
    }
}

// Global functions for HTML onclick handlers
function toggleTheme() {
    app.toggleTheme();
}

function shareResult() {
    app.shareResult();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CoinTossApp();
});

// Add celebration animation
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(0deg); }
        75% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    .result-heads {
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 2px 2px 4px rgba(255, 215, 0, 0.3);
    }
    
    .result-tails {
        background: linear-gradient(135deg, #c0c0c0, #e5e5e5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 2px 2px 4px rgba(192, 192, 192, 0.3);
    }
`;
document.head.appendChild(style);
