const btnHamburguer = document.querySelector('#btnHamburguer');
const menuLista = document.querySelector('.menu-lateral__lista');
const principal = document.querySelector('#principal');


btnHamburguer.addEventListener('click', () => {

    menuLista.classList.toggle('ativo')

    if (menuLista.classList.contains('ativo')){
        
        btnHamburguer.innerHTML = '<i class="bi bi-arrow-left"></i>'
        principal.classList.add('hidden__principal');
        principal.classList.remove('ativo__principal');
    }   else{
        
        btnHamburguer.innerHTML = '<i class="bi bi-list"></i>'
        principal.classList.remove('hidden__principal');
        principal.classList.add('ativo__principal');
    }
})

