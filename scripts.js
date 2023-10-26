document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const larguraContainer = container.offsetWidth;
    const alturaContainer = container.offsetHeight;

    for (let i = 0; i < 100; i++) { 
        const texto = document.createElement('div');
        texto.className = 'texto-deslizante';
        texto.textContent = 'CAMPEÕES DA GINCANA DE JOVENS 2023';
        container.appendChild(texto);

        const topPosition = alturaContainer - i * 10; 
        texto.style.top = `${topPosition}px`;
    }

    document.querySelectorAll('.texto-deslizante').forEach((texto) => {
        const larguraTexto = texto.offsetWidth;
        texto.style.animation = `deslizar ${Math.random() * 10 + 5}s linear infinite`;
        if (larguraTexto > larguraContainer) {
            texto.style.animation = 'none';
        }
    });

    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createConfettiParticle() {
        const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
        return {
            x: canvas.width / 2,
            y: canvas.height / 2.6,
            radius: randomInRange(7.5, 15),
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: randomInRange(0, Math.PI * 2),
            velocity: randomInRange(2, 5),
            rotation: randomInRange(-0.2, 0.2),
            friction: 0.98,
            gravity: 0.9
        };
    }

    const particles = Array.from({ length: 200 }, createConfettiParticle);

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.velocity *= particle.friction;
            particle.x += Math.cos(particle.angle) * particle.velocity;
            particle.y += Math.sin(particle.angle) * particle.velocity + particle.gravity;
            particle.angle += particle.rotation;
            particle.radius *= 0.98;

            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.angle);

            ctx.fillStyle = particle.color;

            ctx.fillRect(-particle.radius, -particle.radius, particle.radius * 2, particle.radius * 2);
            ctx.restore();
        });
        requestAnimationFrame(update);
    }

    update();
});
