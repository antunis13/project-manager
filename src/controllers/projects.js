const ProjectModel = require('../models/projects')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  try {
    const projects = await ProjectModel.find(obj)

    console.log(projects)
    res.send(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error })
  }
}

async function post(req, res) {
  try {
    const { name, url, description, image } = req.body

    const register = new ProjectModel({
      name,
      image,
      url,
      description,
    })

    register.save()

    res.status(201).json({
      message: 'Success. Document created',
    })
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error })
  }
}

async function put(req, res) {
  const { id } = req.params
  const { name, url, description, image } = req.body

  console.log('id:', id)

  try {
    const project = await ProjectModel.findById(id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    project.name = name !== undefined ? name : project.name
    project.url = url !== undefined ? url : project.url
    project.description =
      description !== undefined ? description : project.description
    project.image = image !== undefined ? image : project.image

    const updatedProject = await project.save()

    res.status(200).json({
      message: 'Success. Document updated',
      data: updatedProject,
    })
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).json({
      message: 'Error updating project',
      error: error.message || error,
    })
  }
}

async function remove(req, res) {
  const { id } = req.params

  console.log('id: ', id)

  const projects = await ProjectModel.findById({ _id: id })

  await projects.deleteOne(req.body)

  res.status(204).send()
}

module.exports = {
  get,
  post,
  put,
  remove,
}
