import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  url: yup.string().url().required('URL is required'),
  image: yup.string().required('Image is required'),
})

export default schema
