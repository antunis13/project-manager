import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../utils/formValidation'

import Cards from '../reactComponents/Card'
import Dropzone from '../reactComponents/Dropzone'

import { useAuth } from '@clerk/clerk-react'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  const { getToken } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm()

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = await getToken()
        // console.log(token)
        const res = await fetch('http://localhost:8080/api/projects', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        setProjects(data)
      } catch (error) {
        console.log('Error on get projects')

        toast.error('Error on list projects')
      }
    }
    getProjects()
  }, [])

  const onSearch = async (data) => {
    try {
      const token = await getToken()

      const res = await fetch(
        `http://localhost:8080/api/projects/?name=${data.search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const result = await res.json()
      console.log(result)

      setProjects(result)
    } catch (error) {
      console.log('Error on find project by name: ', error)
      toast.error('Error on find project by name')
    }
  }

  const onSubmit = async (data) => {
    try {
      const token = await getToken()
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('url', data.url)
      formData.append('description', data.description)
      formData.append('image', data.image)
      const res = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (res.status == '201') {
        const getProjectsResponse = await fetch(
          'http://localhost:8080/api/projects',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (getProjectsResponse.ok) {
          const updatedProjects = await getProjectsResponse.json()
          setProjects(updatedProjects)
        }

        setOpenDialog(false)

        toast.success('Projected has been created successfully')
        reset()
      }
    } catch (error) {
      console.log('Error on craete project: ', error)
      toast.error('Error on create project')
    }
  }

  const deleteProject = async (id) => {
    try {
      const token = await getToken()
      const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProjects((prev) => prev.filter((p) => p._id !== id))

      if (res.status == '204') {
        toast.success('Project deleted')
      }
    } catch (error) {
      console.log('Error on delete project: ', error)
      toast.error('Error on delete project')
    }
  }

  const updateProject = async (id, updatedData) => {
    try {
      const token = await getToken()
      const res = await fetch(`http://localhost:8080/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      const updatedProject = await res.json()

      console.log('Projetos atualizados: ', updatedProject)

      setProjects((prev) =>
        prev.map((p) => (p._id === id ? updatedProject.data : p))
      )
      console.log(res.status)
      if (res.status == '201') {
        toast.success('Project updated')
      }
    } catch (error) {
      console.log('Error on update project: ', error)
      toast.error('Error on update project')
    }
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <form onSubmit={handleSubmitSearch(onSearch)}>
          <Input
            name="name"
            type="text"
            placeholder="Search"
            {...registerSearch('search')}
          />
          <button type="submit" hidden></button>
        </form>
        <Dialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          className="border-2"
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-600 hover:bg-gray-600 transition duration-300"
            >
              Add your project here
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-secondary">
            <DialogHeader>
              <DialogTitle>Add Projects</DialogTitle>
              <DialogDescription>
                Show us everything about your best projects!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="col-span-3 p-6"
                    {...register('name')}
                  />
                  <p className="text-red-500 text-xs">{errors.name?.message}</p>
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Dropzone setValue={setValue} watch={watch} />
                  <p className="text-red-500 text-xs">
                    {errors.image?.message}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Textarea
                    id="description"
                    placeholder="Description"
                    className="col-span-3"
                    {...register('description')}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.description?.message}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Input
                    type="url"
                    id="url"
                    placeholder="URL"
                    className="col-span-3 p-6"
                    {...register('url')}
                  />
                  <p className="text-red-500 text-xs">{errors.url?.message}</p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit" className="text-black">
                  Save project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 place-items-center m-10">
        {projects.map((project) => (
          <Cards
            key={project._id}
            id={project._id}
            img={project.image}
            title={project.name}
            description={project.description}
            url={project.url}
            onDelete={deleteProject}
            onUpdate={updateProject}
          />
        ))}
      </section>
    </>
  )
}
