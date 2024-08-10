const btnSubmit = document.querySelector('#btnSubmit')

const form = document.querySelector('#form')

btnSubmit.onclick = function (e) {
  e.preventDefault()

  const name = form.name.value
  const description = form.description.value
  const url = form.url.value
  const image = form.image.value

  fetch('http://localhost:8080/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      description: description,
      url: url,
      image: image,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Success. Document created') {
        alert('Formulario cadastrado com sucesso')
      } else {
        alert('Deu erro')
      }
    })
    .catch((error) => {
      console.log('Erro do catch: ', error)
    })
}
