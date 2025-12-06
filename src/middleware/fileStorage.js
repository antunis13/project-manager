import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'

async function createUserFolder(userId) {
  const folder = path.join(process.cwd(), 'uploads', 'users', userId)
  await fs.mkdir(folder, { recursive: true })
  return folder
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const userId = req.auth.userId
      const folder = await createUserFolder(userId)
      cb(null, folder)
    } catch (err) {
      cb(err)
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

export const upload = multer({ storage })
