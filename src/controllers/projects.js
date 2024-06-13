const ProjectModel = require('../models/projects')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  const projects = await ProjectModel.find(obj)

  console.log(projects)
  res.send(projects)
}

async function post(req, res) {
  try {
    const { name, url, description, image } = req.body
    const register = new ProjectModel({
      name,
      url,
      description,
      image,
    })

    register.save()

    res.status(201).json({
      message: 'Success',
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar projeto', error })
  }
}

module.exports = {
  get,
  post,
}
