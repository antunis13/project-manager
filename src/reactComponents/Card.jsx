import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../utils/formValidation'

export default function Cards({
  id,
  img,
  title,
  description,
  url,
  onDelete,
  onUpdate,
}) {
  const [open, setOpen] = useState()
  const [openEdit, setOpenEdit] = useState(false)

  const [confirmDelete, setConfirmDelete] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: title,
      description: description,
      image: img,
      url: url,
    },
  })

  async function handleDelete() {
    await onDelete(id)
    setConfirmDelete(false)
    setOpen(false)
  }

  async function handleUpdate(data) {
    await onUpdate(id, data)
    setOpenEdit(false)
    setOpen(false)
  }

  return (
    <>
      <div className="w-2/5 flex justify-center">
        <Card className="border-none rounded-lg">
          <CardContent className="flex flex-wrap items-center justify-center mt-1">
            <img src={img} className="rounded-lg w-full" alt="Project image" />
          </CardContent>
          <CardFooter>
            <CardTitle className="text-center text-2xl mx-2">{title}</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full border-none bg-slate-900 hover:bg-slate-800 ease-in">
                  <img src="../../public/imgs/moreIcon.png" width="25px" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CardDescription>{description}</CardDescription>
                <CardContent>
                  <Label className="m-4 ">Repository</Label>
                  <a href="#" className="text-center my-1">
                    {url}
                  </a>
                </CardContent>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenEdit(true)}>
                    Update
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setConfirmDelete(true)}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <DialogContent>
                <DialogTitle>Are you sure?</DialogTitle>
                <CardDescription>
                  This action cannot be undone. The project will be permanently
                  deleted.
                </CardDescription>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </Button>

                  <Button variant="destructive" onClick={handleDelete}>
                    Yes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleUpdate)}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="col-span-3 p-6"
                        {...register('name')}
                      />

                      <p className="text-red-500 text-xs">
                        {errors.name?.message}
                      </p>
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
                      <p className="text-red-500 text-xs">
                        {errors.url?.message}
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button type="submit" className="text-black">
                      Save changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
