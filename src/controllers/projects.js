const ProjectModel = require('../models/projects')
const mongoose = require('mongoose')

async function get(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Error connecting to the database' })
  }
  const { id } = req.params

  const obj = id ? { _id: id } : null

  try {
    const projects = await ProjectModel.find(obj)
    console.log(projects)
    await res.send(projects)

    res.status(200)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error })
  }
}

async function post(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Error connecting to the database' })
  }
  try {
    const { name, url, description, image } = req.body

    const register = new ProjectModel({
      name,
      image,
      url,
      description,
    })

    await register.save()

    const id = register._id

    res.status(201).json({
      message: 'Success. Document created',
      id: id,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation failed' })
    } else {
      res.status(500).json({ message: 'Error creating project', error })
    }
  }
}

async function put(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Error connecting to the database' })
  }
  try {
    const { id } = req.params
    const update = req.body

    console.log('update no controller: ', update)

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Project not found' })
    }
    if (!update || Object.keys(update).length == 0) {
      return res.status(400).json({ message: 'Nothing to update' })
    }

    const { name, url, description, image } = req.body
    const project = await ProjectModel.findById({ _id: id })

    project.name = name !== undefined ? name : project.name
    project.url = url !== undefined ? url : project.url
    project.description =
      description !== undefined ? description : project.description
    project.image = image !== undefined ? image : project.image

    const updatedProject = await project.save()

    res.status(201).json({
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
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Error connecting to the database' })
  }
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Project not found' })
    }
    await ProjectModel.deleteOne({ _id: id })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({
      message: 'Error removing project',
      error,
    })
  }
}

module.exports = {
  get,
  post,
  put,
  remove,
}
