// Crear estrellas dinámicamente
const starCount = 100; // Número de estrellas
const container = document.body;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Duración aleatoria
    container.appendChild(star);
}

// Crear flores dinámicamente
const flowerCount = 30; // Número de flores
const messageContainer = document.querySelector('.message-container');

for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement('div');
    flower.classList.add('sunflower');
    flower.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
    flower.style.animationDuration = `${Math.random() * 3 + 2}s`; // Velocidad de caída aleatoria
    container.appendChild(flower);

    // Detectar cuando la flor llega al fondo
    flower.addEventListener('animationiteration', () => {
        flower.style.top = '-100px'; // Reinicia la posición de la flor
        flower.style.left = `${Math.random() * 100}%`; // Nueva posición horizontal aleatoria
    });

    // Detectar colisión con el mensaje
    flower.addEventListener('animationiteration', () => {
        const flowerRect = flower.getBoundingClientRect();
        const messageRect = messageContainer.getBoundingClientRect();

        // Si la flor está sobre el mensaje
        if (
            flowerRect.bottom > messageRect.top &&
            flowerRect.top < messageRect.bottom &&
            flowerRect.right > messageRect.left &&
            flowerRect.left < messageRect.right
        ) {
            // Desviar la flor hacia los lados
            flower.style.animationName = 'fall-side';
            flower.style.animationTimingFunction = 'ease-in-out';
            flower.style.animationDuration = '2s';
            flower.style.transform = `translateX(${Math.random() > 0.5 ? 100 : -100}px)`;
        }
    });
}

// Animación para desviar las flores hacia los lados
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fall-side {
        0% { transform: translateY(0) translateX(0); }
        100% { transform: translateY(100vh) translateX(${Math.random() > 0.5 ? 100 : -100}px); }
    }
`, styleSheet.cssRules.length);