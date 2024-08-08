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

/*btnHamburguer.addEventListener('click', function () {
    if (this.true) {
        alterarContexto('ativo');
        menuLista.classList.remove('hidden')
        menuLista.classList.add('active')
        principal.classList.remove('active__principal')
        principal.classList.add('hidden__principal')
       
    }
    else {
        alterarContexto('esconder');
        /*menuLista.classList.remove('active')
        menuLista.classList.add('hidden')
        principal.classList.remove('hidden__principal')
        principal.classList.add('active__principal')
        iconMenuLateral.innerHTML = '<i class="bi bi-list"></i>'
    }
});
function alterarContexto(contexto) {
    switch (contexto) {
        case 'ativo':
            menuLista.classList.remove('hidden');
            menuLista.classList.add('ativo');
            principal.classList.remove('ativo__principal');
            principal.classList.add('hidden__principal');
            iconMenuLateral.innerHTML = '<i class="bi bi-arrow-left"></i>';
            break;
        case 'esconder':
            menuLista.classList.remove('ativo');
            menuLista.classList.add('hidden');
            principal.classList.remove('hidden__principal');
            principal.classList.add('ativo__principal');
            iconMenuLateral.innerHTML = '<i class="bi bi-list"></i>';
            break;
        default:
            break;
    }
}
*/