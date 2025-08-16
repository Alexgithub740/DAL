

(function(){
  const root = document.documentElement;
  const key = 'dal_theme';
  const toggle = document.querySelector('.theme-toggle',);
  function apply(theme){ root.setAttribute('data-theme', theme); localStorage.setItem(key, theme); }
  const saved = localStorage.getItem(key) || 'light';
  apply(saved);
  if(toggle){
    toggle.addEventListener('click', ()=> apply(root.getAttribute('data-theme')==='light'?'dark':'light'));
  }
})();
(function(){
  const root = document.documentElement;
  const key = 'dal_theme';
  const toggle = document.querySelector('.theme-toggle1',);
  function apply(theme){ root.setAttribute('data-theme', theme); localStorage.setItem(key, theme); }
  const saved = localStorage.getItem(key) || 'light';
  apply(saved);
  if(toggle){
    toggle.addEventListener('click', ()=> apply(root.getAttribute('data-theme')==='light'?'dark':'light'));
  }
})();

