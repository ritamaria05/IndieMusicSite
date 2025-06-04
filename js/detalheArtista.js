// detalheArtista.js
document.addEventListener('DOMContentLoaded', () => {
    mostrarDetalhes();
  });
  
  async function mostrarDetalhes() {
    // 1) Ler o query param “id”
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      document.getElementById('detalhe-artista').innerHTML = '<p>Artista não encontrado.</p>';
      return;
    }
  
    try {
      // 2) Puxar dados de artistas.json
      const res = await fetch('data/artistas.json');
      const artistas = await res.json();
      const artista = artistas.find(a => String(a.id) === id);
  
      if (!artista) {
        document.getElementById('detalhe-artista').innerHTML = '<p>Artista não existe.</p>';
        return;
      }
  
      // 3) Renderizar detalhes
      const div = document.createElement('div');
      div.innerHTML = `
        <h1>${artista.nome}</h1>
        <img src="${artista.imagem}" alt="${artista.nome}" style="max-width:300px; display:block; margin-bottom:20px;">
        <p><strong>Género:</strong> ${artista.genero}</p>
        <p>${artista.bio}</p>
        <h2>Discografia (exemplo estático)</h2>
        <ul id="discografia"></ul>
      `;
      document.getElementById('detalhe-artista').appendChild(div);
  
      // 4) Opcional: listar álbuns/ músicas (poderias ter outro JSON ou array dentro de artista)
      // Por agora, deixamos vazio ou inserimos manualmente se quiseres.
  
    } catch (err) {
      console.error('Erro ao buscar detalhes do artista:', err);
    }
  }
  