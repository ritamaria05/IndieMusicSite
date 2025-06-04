// main.js
document.addEventListener('DOMContentLoaded', () => {
    carregarDestaquesArtistas();
    carregarUltimosConcertos();
  });
  
  // 1) Destaques de artistas emergentes (homepage)
  async function carregarDestaquesArtistas() {
    try {
      const res = await fetch('data/artistas.json');
      const artistas = await res.json();
  
      // Filtrar os emergentes (menos conhecidos)
  // Podemos definir threshold arbitrário:
      const emergentes = artistas.filter(a => 
        a.spotify_followers < 1000 || a.listeners_monthly < 2000
      );
      // Pegar 3 emergentes aleatórios (ou tantos quantos houver, se <3)
      shuffleArray(emergentes);
      const destaques = emergentes.slice(0, 3);
  
      const container = document.getElementById('destaque-artistas');
      container.innerHTML = '';
  
      destaques.forEach(a => {
        const div = document.createElement('div');
        div.classList.add('card-artista');
  
        div.innerHTML = `
          <img src="${a.imagem}" alt="${a.nome}">
          <div class="info">
            <h3>${a.nome}<span class="badge-emergente">Emergente</span></h3>
            <p>${a.genero}</p>
          </div>
        `;
        container.appendChild(div);
      });
  
    } catch (err) {
      console.error('Erro ao carregar artistas:', err);
    }
  }
  
  // 2) Últimos concertos (homepage)
  async function carregarUltimosConcertos() {
    try {
      const resConcertos = await fetch('data/concertos.json');
      const concertos = await resConcertos.json();
      // Ordenar por data crescente e filtrar futuros
      const hoje = new Date();
      const futuros = concertos
        .map(c => ({ ...c, dateObj: new Date(c.date) }))
        .filter(c => c.dateObj >= hoje)
        .sort((a, b) => a.dateObj - b.dateObj);
  
      // Mostrar só os 4 próximos
      const proximos = futuros.slice(0, 4);
      const ul = document.getElementById('lista-concertos-home');
      ul.innerHTML = '';
  
      proximos.forEach(c => {
        const li = document.createElement('li');
        const dataFormatada = c.dateObj.toLocaleString('pt-PT', {
          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        li.innerHTML = `
          <strong>${c.titulo}</strong> – ${dataFormatada} | ${c.local}  
          <a href="concertos.html#c${c.id}">Ver detalhes</a>
        `;
        ul.appendChild(li);
      });
    } catch (err) {
      console.error('Erro ao carregar concertos:', err);
    }
  }
  
  // Função utilitária para embaralhar array (Fisher–Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  