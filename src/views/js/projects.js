const projectsList = document.querySelector('#projects-list')

window.addEventListener('load', () => {
    
    fetch('mongodb+srv://ezequiel:uYSeY7vvAtDbgOEx@mongocluster.4hjigqt.mongodb.net/api/projects').then(resposta => resposta.json()).then(dados => {
        const projectsHTML = dados.map(dado => 
        `<ul> 
            <li>
                <img src='${dado.image}' alt='imagem escolhida pelo usuario' />
            </li> 
            <li>
                <h2>
                    ${dado.name}
                </h2>
            </li>
            <li>
                <p>
                    ${dado.description}
                </p>    
            </li>
            <li>
                <a href='${dado.url}'>GitHub</a>
            </li>
        </ul>`
        ).join('') 

        projectsList.innerHTML = projectsHTML
    })
})

