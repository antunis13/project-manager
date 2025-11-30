const ProjectModel = require('../models/projects')
const mongoose = require('mongoose')

async function get(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Error connecting to the database' })
  }

  try {
    const { userId } = req.auth
    const { name } = req.query

    const query = {
      ownerId: userId,
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }

    const projects = await ProjectModel.find(query)

    return res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error })
  }
}

async function post(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Error connecting to the database' })
  }
  try {
    const { userId } = req.auth

    const { name, url, description } = req.body
    const image = `/uploads/${req.file.filename}`

    const register = new ProjectModel({
      name,
      image,
      url,
      description,
      ownerId: userId,
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

    if (!update || Object.keys(update).length == 0) {
      return res.status(400).json({ message: 'Nothing to update' })
    }

    const project = await ProjectModel.findById(id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const { name, url, description, image } = req.body

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

    const project = await ProjectModel.findById(id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    await ProjectModel.deleteOne(project)
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
