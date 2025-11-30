import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  url: yup.string().url().required('URL is required'),
  image: yup
    .mixed()
    .required('Imagem obrigatória')
    .test('required', 'Imagem obrigatória', (file) => !!file)
    .test('fileType', 'Use JPG, PNG ou WEBP', (value) => {
      return (
        value && ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
      )
    })
    .test('fileSize', 'Tamanho máximo é 2MB', (value) => {
      return value && value.size <= 2 * 1024 * 1024
    }),
})

export default schema
