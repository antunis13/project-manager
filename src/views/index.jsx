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

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../utils/formValidation'

import Header from '../reactComponents/Header'
import Footer from '../reactComponents/Footer'
import Cards from '../reactComponents/Card'

export default function Home() {
  const [projects, setProjects] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm()

  const onSearch = async (data) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/projects/?name=${data.search}`
      )
      const result = await res.json()
      console.log(result)

      setProjects(result)
    } catch (error) {
      console.log('Error on find project by name: ', error)
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/projects', {
          method: 'GET',
        })

        const data = await res.json()

        setProjects(data)
      } catch (error) {
        console.log('Error on get projects')
      }
    }
    getProjects()
  }, [])

  const onSubmit = async (data) => {
    try {
      await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log('Error on craete project: ', error)
    }
  }

  return (
    <>
      <Header />
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
        <Dialog className="border-2">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-600 hover:bg-gray-600 transition duration-300"
            >
              Add your project here
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
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
                <div className="grid grid-cols-2 items-center gap-4">
                  <Input
                    type="url"
                    id="image"
                    placeholder="Image"
                    className="col-span-3 p-6"
                    {...register('image')}
                  />
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 place-items-center">
        {projects.map((project) => (
          <Cards
            key={project.id}
            img={project.image}
            title={project.name}
            description={project.description}
            url={project.url}
          />
        ))}
      </section>
      <Footer />
    </>
  )
}
