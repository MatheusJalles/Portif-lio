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
  const width = slides[0].offsetWidth; // largura dinâmica

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

  /* LOOP AUTOMÁTICO DO CARROSSEL */
  const tempoLoop = 3000; // 3s
  setInterval(() => {
    index = (index + 1) % slides.length;
    atualizar();
  }, tempoLoop);

  /* =====================
     MÚSICA
  ====================== */
  const audio = document.getElementById('audio');
  audio.volume = 0.5;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => console.log("Clique no botão para tocar a música"));
  }

});
