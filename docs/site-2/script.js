window.addEventListener('load', () => {

  /* =====================
     LUZES COLORIDAS
  ====================== */
  const background = document.querySelector('.background-luzes');
  const linhas = 18;
  const porLinha = 40;
  const cores = ['#ffd700','#ff7eb3','#7afcff','#9cff57','#c77dff'];

  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < porLinha; j++) {
      const lamp = document.createElement('div');
      lamp.className = 'lampada';

      const cor = cores[Math.floor(Math.random() * cores.length)];
      lamp.style.background = cor;

      lamp.style.top = `${(i / linhas) * window.innerHeight + Math.random()*20 -10}px`;
      lamp.style.left = `${Math.random() * window.innerWidth}px`;
      lamp.style.animationDelay = `${Math.random()}s`;

      background.appendChild(lamp);
    }
  }

  /* =====================
     CARROSSEL
  ====================== */
  const track = document.querySelector('.track');
  const slides = document.querySelectorAll('.slide');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  let index = 0;
  const width = slides[0].offsetWidth;

  function atualizar() {
    track.style.transform = `translateX(-${index * width}px)`;
  }

  next.onclick = () => {
    index = (index + 1) % slides.length;
    atualizar();
  };

  prev.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    atualizar();
  };

  setInterval(() => {
    index = (index + 1) % slides.length;
    atualizar();
  }, 3000);

  /* =====================
     MÚSICA COM VOLUME
  ====================== */
  const audio = document.getElementById('audio');
  audio.volume = 0.3; // volume de 0.0 a 1.0
  const btnMusica = document.getElementById('btn-musica');

  btnMusica.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      btnMusica.textContent = "Pausar Música";
    } else {
      audio.pause();
      btnMusica.textContent = "Tocar Música";
    }
  });
window.addEventListener('load', () => {

  const audio = document.getElementById('audio');
  const btnMusica = document.getElementById('btn-musica');
  const volumeSlider = document.getElementById('volume');

  // Define volume inicial baseado no slider
  audio.volume = volumeSlider.value / 100;

  // Tocar / pausar música
  btnMusica.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      btnMusica.textContent = "Pausar Música";
    } else {
      audio.pause();
      btnMusica.textContent = "Tocar Música";
    }
  });

  // Atualiza o volume quando o usuário mexer no slider
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100; // converte 0-100 para 0.0-1.0
  });

});

});
