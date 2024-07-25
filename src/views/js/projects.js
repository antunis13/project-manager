const projectsList = document.querySelector('#projects-list')

window.addEventListener('load', () => {
  fetch('http://localhost:8080/api/projects', { method: 'GET' })
    .then((res) => {
      res.json().then((data) => {
        const projectsHTML = data
          .map(
            (project) => `
        <ul> 
          <li>
            <img src='${project.image}' alt='imagem escolhida pelo usuario' />
          </li> 
          <li>
            <h2>${project.name}</h2>
          </li>
          <li>
            <p>${project.description}</p>    
          </li>
          <li>
            <a href='${project.url}'>GitHub</a>
          </li>
        </ul>`
          )
          .join('')
        projectsList.innerHTML = projectsHTML
      })
    })
    .catch((error) => console.error('Error:', error))
})
