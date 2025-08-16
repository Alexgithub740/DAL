

(function(){
  const form = document.getElementById('postuler-form');
  const printBtn = document.getElementById('print-btn');
  const msg = document.getElementById('postuler-msg');

  function getList(){
    return JSON.parse(localStorage.getItem('dal_postulants')||'[]');
  }
  function saveList(list){
    localStorage.setItem('dal_postulants', JSON.stringify(list));
  }

  function validatePhone(v){
    
    return /^\+509\d{8}$/.test(v);
  }

  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    
    data.nationalite = 'Haïtien';
    
    const comp = Array.from(form.querySelectorAll('input[name="competences"]:checked')).map(i=>i.value);
    data.competences = comp;

    if(!validatePhone(data.telephone)){
      msg.textContent = "Le numéro doit être au format +509 suivi de 8 chiffres.";
      msg.style.color = 'var(--danger)';
      return;
    }
    
    const file = form.photo.files?.[0];
    const done = (photoData)=>{
      const list = getList();
      const id = 'DAL-'+Date.now();
      const rec = {
        id, statut:'en-attente', date:new Date().toISOString(),
        ...data, photo:photoData || ''
      };
      list.push(rec); saveList(list);
      msg.textContent = "Candidature envoyée avec succès !";
      msg.style.color = 'var(--ok)';
      form.reset();
      setTimeout(()=> window.location.href='principal.html', 800);
    };
    if(file){
      const reader = new FileReader();
      reader.onload = ()=> done(reader.result);
      reader.readAsDataURL(file);
    }else{
      done('');
    }
  });

  printBtn?.addEventListener('click', ()=> window.print());
})();

const images = document.querySelectorAll('#accueil img');
let current = 0;
setInterval(()=>{
  images[current].classList.remove('active');
  current =(current + 1)% images.length;
  images[current].classList.add('active');
},5000);