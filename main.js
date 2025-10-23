function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

const equipmentData = {
  backline: [
    { item: 'Batterie Pearl Export', state: 'Bon', notes: '' },
    { item: 'Ampli Basse Ampeg', state: 'Bon', notes: '' },
    { item: 'Ampli Guitare Marshall', state: 'Bon', notes: '' },
  ],
  micros: [
    { item: 'Shure SM57', state: 'Bon', notes: '' },
    { item: 'Shure SM58', state: 'Bon', notes: '' },
    { item: 'AKG C414', state: 'Excellent', notes: '' },
  ],
  pedales: [
    { item: 'Boss DS-1', state: 'Bon', notes: '' },
    { item: 'Ibanez Tube Screamer', state: 'Moyen', notes: '' },
  ],
  mao: [
    { item: 'Interface Audio Focusrite', state: 'Excellent', notes: '' },
    { item: 'Moniteurs Yamaha HS5', state: 'Bon', notes: '' },
    { item: 'MacBook Pro', state: 'Excellent', notes: '' },
  ],
  autre: [
    { item: 'Câbles XLR (x10)', state: 'Bon', notes: '' },
    { item: 'Pieds de micro (x5)', state: 'Moyen', notes: '' },
  ]
};

function getStateClass(state) {
  const stateMap = {
    'Excellent': 'bg-success',
    'Bon': 'bg-primary',
    'Moyen': 'bg-warning',
    'Mauvais': 'bg-danger'
  };
  return stateMap[state] || 'bg-secondary';
}

function exportToPDF() {
  window.print();
}

function generateSection(title, icon, data, sectionId) {
  return `
    <div class="card">
      <div class="card-header">
        <i class="bi ${icon}"></i> ${title}
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th style="width: 40%">Équipement</th>
                <th style="width: 20%">État</th>
                <th style="width: 40%">Observations</th>
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  <td>${item.item}</td>
                  <td><span class="badge ${getStateClass(item.state)}">${item.state}</span></td>
                  <td><input type="text" class="form-control form-control-sm" value="${item.notes}" placeholder="Observations"></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function generateHTML() {
  return `
    <nav class="navbar navbar-light fixed-top">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">
          <i class="bi bi-music-note-beamed"></i> Audit Matériel Studio
        </span>
        <span class="navbar-text">${getCurrentDate()}</span>
      </div>
    </nav>

    <div class="container" style="margin-top: 80px;">
      <div class="fade-in">

        <div class="page-header">
          <h1><i class="bi bi-clipboard-check"></i> Audit Matériel</h1>
          <p class="text-muted">Studio de Répétition & Enregistrement</p>
        </div>

        <div class="action-bar">
          <div>
            <h5 class="mb-0">Rapport d'audit</h5>
            <small class="text-muted">Dernière mise à jour : ${getCurrentDate()}</small>
          </div>
          <button class="btn btn-primary" onclick="exportToPDF()">
            <i class="bi bi-file-earmark-pdf"></i>
            Convertir en PDF
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <i class="bi bi-info-circle"></i> Informations Générales
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Nom du Studio</label>
                <input type="text" class="form-control" placeholder="Studio SonikLab">
              </div>
              <div class="col-md-6">
                <label class="form-label">Responsable</label>
                <input type="text" class="form-control" placeholder="Nom du responsable">
              </div>
              <div class="col-md-6">
                <label class="form-label">Date</label>
                <input type="text" class="form-control" value="${getCurrentDate()}">
              </div>
              <div class="col-md-6">
                <label class="form-label">Contact</label>
                <input type="text" class="form-control" placeholder="Email ou téléphone">
              </div>
            </div>
          </div>
        </div>

        ${generateSection('Backline', 'bi-speaker', equipmentData.backline, 'backline')}
        ${generateSection('Micros', 'bi-mic', equipmentData.micros, 'micros')}
        ${generateSection('Pédales', 'bi-bezier2', equipmentData.pedales, 'pedales')}
        ${generateSection('MAO', 'bi-laptop', equipmentData.mao, 'mao')}
        ${generateSection('Autre', 'bi-box', equipmentData.autre, 'autre')}

        <div class="card">
          <div class="card-header">
            <i class="bi bi-pencil-square"></i> Notes et Recommandations
          </div>
          <div class="card-body">
            <textarea class="form-control" rows="6" placeholder="Ajoutez vos observations et recommandations ici..."></textarea>
          </div>
        </div>

        <footer class="page-footer">
          <p class="text-muted">Document généré le ${getCurrentDate()}</p>
          <div class="signature-line">Signature</div>
        </footer>

      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = generateHTML();
  window.exportToPDF = exportToPDF;
});
