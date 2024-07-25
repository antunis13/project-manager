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

  try {
    const projects = await ProjectModel.findById({ _id: id })

    await projects.updateOne(req.body)
    res.status(200).json({
      message: 'Success. Document updated',
      data,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error })
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
