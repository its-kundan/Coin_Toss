// Existing coin toss functionality
const coinIcon = document.getElementById('coin');
const tossBtn = document.getElementById('toss-button');
const result = document.querySelector('.result');
coinIcon.insertAdjacentElement('afterend', result);
tossBtn.addEventListener('click', () => {
    tossBtn.disabled = true;
    tossCoinFunction();
});

function tossCoinFunction() {
    const randomVal = Math.random();
    const faceCoin = randomVal < 0.5 ? 'Heads' : 'Tails';
    const imageUrl = faceCoin === 'Heads' ? 
        'https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png' : 
        'https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png';
    
    coinIcon.classList.add('flip');
    
    setTimeout(() => {
        coinIcon.innerHTML = `<img src="${imageUrl}" alt="${faceCoin}">`; 
        coinIcon.classList.remove('flip');

        setTimeout(() => {
            result.textContent = `Result: ${faceCoin}`;
            result.style.opacity = 1;
            tossBtn.disabled = false;
        }, 500);
    }, 1000);
}

// Dark/Light Mode Functionality
let isDarkMode = true;

function toggleMode() {
    const body = document.body;
    if (isDarkMode) {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }
    isDarkMode = !isDarkMode;
}

// Share Result Functionality
function shareResult() {
    const resultText = document.querySelector('.result').textContent || "No result available"; 
    if (navigator.share) {
        navigator.share({
            title: 'Coin Toss Result',
            text: resultText,
            url: window.location.href
        }).then(() => {
            alert('Result shared successfully!');
        }).catch((error) => {
            console.error('Error sharing the result', error);
        });
    } else {
        alert("Sharing is not supported on your browser.");
    }
}
