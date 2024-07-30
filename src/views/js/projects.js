document.addEventListener('DOMContentLoaded', function () {
  getProjectList()
})

function getProjectList() {
  const projectsList = document.querySelector('#projects-list')

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
        </ul>
        
        <a href="#" class="removeBtn" id="deleteBtn" data-id="${project._id}">Delete Project</a>
        `
          )
          .join('')
        projectsList.innerHTML = projectsHTML
        deleteProjects()
      })
    })
    .catch((error) => console.error('Error:', error))
}

function deleteProjects() {
  const removeBtn = document.querySelectorAll('#deleteBtn')

  removeBtn.forEach((button) => {
    button.onclick = function (e) {
      e.preventDefault()

      const id = this.dataset.id
      console.log(id)
      fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.status === 204) {
          alert('Projeto excluido')
          getProjectList()
        } else {
          alert('Deu erro')
        }
      })
    }
  })
}
