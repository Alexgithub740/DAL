(function(){
  const loginForm = document.querySelector('.login1 form');
  const registerForm = document.querySelector('.register1 form');

  const MAX_ATTEMPTS = 3;
  const LOCK_TIME_MS = 60 * 1000; // 1 minute

  // Admin credentials
  const adminAccounts = [
    { nom: "DEUS", prenom: "Dayan Alex Stéphen", password: "2003" },
    { nom: "ARISTE", prenom: "Sardoune", password: "2003" },
    { nom: "LAURENT", prenom: "Jess-Kenzy", password: "2003" }
  ];

  // Load existing users from localStorage
  function loadUsers(){
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  function saveUser(user){
    const users = loadUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Check lock
  function isLocked(){
    const lockUntil = localStorage.getItem('lockUntil');
    if(lockUntil && Date.now() < parseInt(lockUntil)){
      return true;
    }
    return false;
  }

  function lockSite(){
    localStorage.setItem('lockUntil', Date.now() + LOCK_TIME_MS);
  }

  function resetAttempts(){
    localStorage.removeItem('attempts');
  }

  function incrementAttempts(){
    let att = parseInt(localStorage.getItem('attempts') || '0') + 1;
    localStorage.setItem('attempts', att);
    if(att >= MAX_ATTEMPTS){
      lockSite();
      alert("Trop de tentatives! Réessayez dans 1 minute");
    }
  }

  // Handle login
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(isLocked()){
      alert("Vous êtes temporairement bloqué. Réessayez plus tard.");
      return;
    }

    const nom = loginForm.querySelector('input[placeholder="Nom"]').value.trim();
    const prenom = loginForm.querySelector('input[placeholder="prenom"]').value.trim();
    const password = loginForm.querySelector('input[placeholder="Mot de passe"]').value.trim();

    // Check if admin
    const isAdmin = adminAccounts.some(a => 
      a.nom.toLowerCase() === nom.toLowerCase() && 
      a.prenom.toLowerCase() === prenom.toLowerCase() && 
      a.password === password
    );

    if(isAdmin){
      resetAttempts();
     
      window.location.href = "principaladm.html";
      return;
    }

    // Check if user exists in localStorage
    const users = loadUsers();
    const found = users.find(u => 
      u.nom.toLowerCase() === nom.toLowerCase() &&
      u.prenom.toLowerCase() === prenom.toLowerCase() &&
      u.password === password
    );

    if(found){
      resetAttempts();
      
      window.location.href = "principal.html";
    } else {
      // Check if user ever registered
      const isRegistered = users.some(u =>
        u.nom.toLowerCase() === nom.toLowerCase() &&
        u.prenom.toLowerCase() === prenom.toLowerCase()
      );

      if(!isRegistered){
        alert("Vous devez vous inscrire avant de vous connecter.");
      } else {
        alert("Informations incorrectes.");
      }
      incrementAttempts();
    }
  });

  // Handle registration
  registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nom = registerForm.querySelector('input[placeholder="Nom"]').value.trim();
    const prenom = registerForm.querySelector('input[placeholder="prenom"]').value.trim();
    const password = registerForm.querySelector('input[placeholder="Mot de passe"]').value.trim();

    // Check if already registered
    const users = loadUsers();
    if(users.some(u => u.nom.toLowerCase() === nom.toLowerCase() && u.prenom.toLowerCase() === prenom.toLowerCase())){
      alert("Cet utilisateur est déjà inscrit.");
      return;
    }

    saveUser({ nom, prenom, password });
    
    registerForm.reset();
  });

})();
const container1 = document.querySelector('.container1');
const registerBtn1 = document.querySelector('.register-btn1');
const loginBtn1 = document.querySelector('.login-btn1');

registerBtn1.addEventListener('click', () => {
    container1.classList.add('active');
})

loginBtn1.addEventListener('click', () => {
    container1.classList.remove('active');
})
