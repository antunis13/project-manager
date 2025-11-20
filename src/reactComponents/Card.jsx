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
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function Cards({ id, img, title, description, url, onDelete }) {
  const [open, setOpen] = useState()

  const [confirmDelete, setConfirmDelete] = useState()

  async function handleDelete() {
    await onDelete(id)
    setConfirmDelete(false)
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
                  <Button variant="outline">Update</Button>

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
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
