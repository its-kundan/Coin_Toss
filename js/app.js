// Coin Toss Application
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
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.loadStats();
        this.updateStatsDisplay();
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
        
        // Generate random result
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        
        // Update stats
        this.stats[result]++;
        this.saveStats();
        this.updateStatsDisplay();
        
        // Wait for animation to complete
        setTimeout(() => {
            this.coin.classList.remove('flipping');
            
            // Show result
            setTimeout(() => {
                this.displayResult(result);
                this.isFlipping = false;
                this.tossButton.disabled = false;
                this.shareButton.disabled = false;
            }, 500);
        }, 1500);
    }
    
    displayResult(result) {
        const resultText = result === 'heads' ? 'HEADS' : 'TAILS';
        const resultClass = result === 'heads' ? 'result-heads' : 'result-tails';
        
        this.resultText.textContent = resultText;
        this.resultText.className = `result-text ${resultClass}`;
        
        // Add celebration animation
        this.resultText.style.animation = 'celebrate 0.6s ease-in-out';
        setTimeout(() => {
            this.resultText.style.animation = '';
        }, 600);
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
            this.showNotification('No result to share! Toss the coin first.', 'warning');
            return;
        }
        
        const shareData = {
            title: 'Coin Toss Result',
            text: `I got ${result} on Virtual Coin Toss!`,
            url: window.location.href
        };
        
        if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData)
                .then(() => {
                    this.showNotification('Result shared successfully!', 'success');
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
        const text = `${shareData.text}\n\nTry it yourself: ${shareData.url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    this.showNotification('Result copied to clipboard!', 'success');
                })
                .catch(() => {
                    this.showNotification('Sharing not supported on this browser.', 'warning');
                });
        } else {
            this.showNotification('Sharing not supported on this browser.', 'warning');
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
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#6366f1'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
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
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .result-heads {
        color: #f59e0b;
    }
    
    .result-tails {
        color: #6b7280;
    }
`;
document.head.appendChild(style);
