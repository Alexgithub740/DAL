

(function(){
  const burger = document.querySelector('.hamburger');
  const mobile = document.querySelector('.mobile-menu');
  if(!burger || !mobile) return;
  burger.addEventListener('click', ()=>{
    burger.classList.toggle('active');
    mobile.style.display = mobile.style.display==='flex' ? 'none' : 'flex';
  });
  
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    burger.classList.remove('active'); mobile.style.display='none';
  }));
})();
