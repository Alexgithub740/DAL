

(function(){
  const tbody = document.getElementById('tbl-body');
  const addBtn = document.getElementById('add-manual');
  const filter = document.getElementById('filter');

  function getList(){
    return JSON.parse(localStorage.getItem('dal_postulants')||'[]');
  }
  function saveList(list){
    localStorage.setItem('dal_postulants', JSON.stringify(list));
  }

  function badge(statut){
    const cls = statut==='confirme'?'confirme':(statut==='refuse'?'refuse':'en-attente');
    return `<span class="status ${cls}">${statut.replace('-', ' ')}</span>`;
  }

  function row(p){
    return `<tr data-id="${p.id}">
      <td>${p.id}</td>
      <td>${p.nom} ${p.prenom}</td>
      <td>${p.option}</td>
      <td>${p.telephone}</td>
      <td>${badge(p.statut)}</td>
      <td>
        <button class="btn btn-ok btn-sm" data-action="confirm">Confirmer</button>
        <button class="btn btn-danger btn-sm" data-action="refuse">Refuser</button>
        <button class="btn btn-outline btn-sm" data-action="edit">Modifier</button>
        <button class="btn btn-outline btn-sm" data-action="delete">Supprimer</button>
      </td>
    </tr>`;
  }

  function render(){
    const q = (filter?.value || '').toLowerCase();
    const list = getList().filter(p => !q || p.option.toLowerCase().includes(q) || p.nom.toLowerCase().includes(q) || p.prenom.toLowerCase().includes(q));
    tbody.innerHTML = list.map(row).join('') || `<tr><td colspan="6">Aucun enregistrement.</td></tr>`;
  }

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const tr = btn.closest('tr'); const id = tr?.dataset.id;
    if(!id) return;
    const list = getList();
    const i = list.findIndex(x=>x.id===id);
    if(i<0) return;

    const p = list[i];
    const action = btn.dataset.action;
    if(action==='confirm'){
      list[i].statut='confirme'; saveList(list);
      alert(`Candidature confirmée pour ${p.nom} ${p.prenom} - option ${p.option}.`);
      render();
    }else if(action==='refuse'){
      list[i].statut='refuse'; saveList(list);
      alert(`Candidature refusée pour ${p.nom} ${p.prenom}.`);
      render();
    }else if(action==='delete'){
      if(confirm('Supprimer définitivement ?')){
        list.splice(i,1); saveList(list); render();
      }
    }else if(action==='edit'){
      const nvTel = prompt('Nouveau téléphone (+509XXXXXXXX) :', p.telephone) || p.telephone;
      const nvOpt = prompt('Nouvelle option (Parasportive/Entraîneur/Personnel médical/Équipe technique) :', p.option) || p.option;
      list[i].telephone = nvTel; list[i].option = nvOpt; saveList(list); render();
    }
  });

  addBtn?.addEventListener('click', ()=>{
    const nom = prompt('Nom :')||'---';
    const prenom = prompt('Prénom :')||'---';
    const option = prompt('Option :')||'---';
    const telephone = prompt('Téléphone (+509XXXXXXXX) :')||'+50900000000';
    const id = 'DAL-'+Date.now();
    const rec = {id, nom, prenom, option, telephone, statut:'en-attente', date:new Date().toISOString(), nationalite:'Haïtien', competences:[]};
    const list = getList(); list.push(rec); saveList(list); render();
  });

  filter?.addEventListener('input', render);

  render();
})();
