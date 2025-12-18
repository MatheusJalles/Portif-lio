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
/* =====================
   PAINT FUNCIONAL COMPLETO
===================== */
const canvas = document.getElementById('paint');
const ctx = canvas.getContext('2d');
let painting = false;
let color = document.getElementById('paintColor').value;
let size = document.getElementById('paintSize').value;
let brush = document.getElementById('paintBrush').value;
let erasing = false;

// Inicia pintura
function startPosition(e) {
  painting = true;
  draw(e);
}

// Para pintura
function endPosition() {
  painting = false;
  ctx.beginPath();
}

// Desenho no canvas
function draw(e) {
  if (!painting) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = size;
  ctx.lineCap = brush;
  ctx.strokeStyle = erasing ? 'rgba(0,0,0,0)' : color;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Eventos do mouse
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseout', endPosition);
canvas.addEventListener('mousemove', draw);

// Alterar cor
document.getElementById('paintColor').addEventListener('change', (e) => { 
  color = e.target.value; 
  erasing = false;
});

// Alterar tamanho
document.getElementById('paintSize').addEventListener('change', (e) => size = e.target.value);

// Alterar tipo de pincel
document.getElementById('paintBrush').addEventListener('change', (e) => brush = e.target.value);

// Borracha
document.getElementById('eraser').addEventListener('click', () => {
  erasing = true;
});

// Limpar canvas
document.getElementById('clearPaint').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

// Preencher todo o canvas
document.getElementById('fillPaint').addEventListener('click', () => {
  ctx.fillStyle = color;
  ctx.fillRect(0,0,canvas.width,canvas.height);
});

// Salvar desenho
document.getElementById('savePaint').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'meu-desenho.png';
  link.href = canvas.toDataURL();
  link.click();
});
