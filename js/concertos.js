// concertos.js
document.addEventListener('DOMContentLoaded', () => {
    exibirListaConcertos();
    inicializarCalendario(); // opcional: se quiseres usar FullCalendar
  });
  
  async function exibirListaConcertos() {
    try {
      const res = await fetch('data/concertos.json');
      let concertos = await res.json();
  
      // Converter string date para Date e filtrar apenas eventos futuros
      const hoje = new Date();
      concertos = concertos
        .map(c => ({ ...c, dateObj: new Date(c.date) }))
        .filter(c => c.dateObj >= hoje)
        .sort((a, b) => a.dateObj - b.dateObj);
  
      const container = document.getElementById('lista-concertos');
      container.innerHTML = '';
  
      concertos.forEach(c => {
        const li = document.createElement('li');
        const dataFormatada = c.dateObj.toLocaleString('pt-PT', {
          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        li.innerHTML = `
          <strong>${c.titulo}</strong><br>
          ${dataFormatada} | ${c.local} <br>
          Preço: ${c.preco} 
          ${c.link_bilhetes ? `| <a href="${c.link_bilhetes}" target="_blank">Comprar bilhetes</a>` : ''}
        `;
        container.appendChild(li);
      });
    } catch (err) {
      console.error('Erro ao exibir concertos:', err);
    }
  }
  
  // Se quiseres um calendário interativo com FullCalendar:
  function inicializarCalendario() {
    if (!document.getElementById('calendar')) return; // só continua se existir <div id="calendar">
  
    fetch('data/concertos.json')
      .then(res => res.json())
      .then(concertos => {
        // Transformar no formato esperado pelo FullCalendar
        const events = concertos.map(c => ({
          id: c.id,
          title: c.titulo,
          start: c.date,
          url: `concertos.html#c${c.id}`
        }));
  
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale: 'pt',  
          events: events,
          eventClick: info => {
            // evitar popup padrão do FullCalendar para redirecionar:
            info.jsEvent.preventDefault();
            window.location.href = info.event.url;
          }
        });
        calendar.render();
      })
      .catch(err => console.error('Erro ao carregar FullCalendar:', err));
  }
  