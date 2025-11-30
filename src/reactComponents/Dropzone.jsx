import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Dropzone({ setValue, watch }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const imageValue = watch ? watch('image') : null

  useEffect(() => {
    if (!imageValue) {
      setSelectedFile(null)
    }
  }, [imageValue])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (files) => {
      const file = files[0]
      setSelectedFile(file)
      setValue('image', file, { shouldValidate: true })
    },
  })

  return (
    <div
      {...getRootProps()}
      className="border border-dashed p-6 rounded-xl cursor-pointer text-center"
    >
      <input {...getInputProps()} />
      <p>{selectedFile ? selectedFile.name : 'Select the image file'}</p>
    </div>
  )
}
