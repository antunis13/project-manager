const updateForm = document.querySelector('#updtForm')

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
        <a href="#" class="updateBtn" id="updateBtn" data-id="${project._id}">Update Project</a>
        `
          )
          .join('')
        projectsList.innerHTML = projectsHTML
        deleteProjects()
        setUpdateBtns()
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

function setUpdateBtns() {
  const updateBtn = document.querySelectorAll('#updateBtn')

  updateBtn.forEach((button) => {
    button.onclick = function (e) {
      e.preventDefault()

      const id = this.dataset.id
      console.log(id)
      console.log('passou por aqui')

      openForm(id)
    }
  })
}

async function openForm(id) {
  const btnSave = document.querySelector('#saveBtn')
  const btnCancel = document.querySelector('#cancelBtn')

  updateForm.classList.remove('hidden')
  try {
    const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
      method: 'GET',
    })
    const data = await res.json()

    const project = data[0]

    let img = (document.getElementById('img').value = project.image)
    let name = (document.getElementById('name').value = project.name)
    let desc = (document.getElementById('description').value =
      project.description)
    let url = (document.getElementById('url').value = project.url)

    btnSave.onclick = function () {
      let newImg = document.getElementById('img').value
      let newName = document.getElementById('name').value
      let newDesc = document.getElementById('description').value
      let newUrl = document.getElementById('url').value

      name = newName
      img = newImg
      desc = newDesc
      url = newUrl
      updateRequest(name, desc, url, img, id)
    }

    btnCancel.onclick = function () {
      name = ''
      img = ''
      desc = ''
      url = ''

      updateForm.classList.add('hidden')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function updateRequest(name, desc, url, img, id) {
  console.log(id, name, desc, url, img)

  fetch(`http://localhost:8080/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      description: desc,
      url: url,
      image: img,
    }),
  })
    .then((res) => {
      res.json().then((data) => {
        if (data.message === 'Success. Document updated') {
          alert('Projeto Atualizado')
          updateForm.classList.add('hidden')
        }
      })
    })
    .catch((error) => console.log(error))
}
