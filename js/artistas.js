// artistas.js
document.addEventListener('DOMContentLoaded', () => {
    exibirArtistas();
  });
  
  async function exibirArtistas() {
    try {
      const res = await fetch('data/artistas.json');
      const artistas = await res.json();
  
      const container = document.getElementById('lista-artistas');
      container.innerHTML = '';
  
      artistas.forEach(a => {
        // Verificar se é emergente:
        const isEmergente = (a.spotify_followers < 1000 || a.listeners_monthly < 2000);
  
        const div = document.createElement('div');
        div.classList.add('card-artista-lista');
  
        div.innerHTML = `
          <img src="${a.imagem}" alt="${a.nome}">
          <div class="detalhes">
            <h3>${a.nome} ${isEmergente ? '<span class="badge-emergente">Emergente</span>' : ''}</h3>
            <p><strong>Género</strong>: ${a.genero}</p>
            <p>${a.bio}</p>
            <a href="artista.html?id=${a.id}">Ver página</a>
          </div>
        `;
        container.appendChild(div);
      });
    } catch (err) {
      console.error('Erro ao exibir artistas:', err);
    }
  }
  