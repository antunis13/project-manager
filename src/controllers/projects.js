//const ProjectModel = require('../models/projects')

async function get(req, res) {
  /* const { id } = req.params

  const obj = id ? { id: id } : null

  const projects = await ProjectModel.find(obj)

  res.send(projects) */
  res.status(200).send('It works')
}

module.exports = {
  get,
}
