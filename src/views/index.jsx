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
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import Header from '../reactComponents/Header'
import Footer from '../reactComponents/Footer'
import Card from '../reactComponents/Card'

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-end gap-2">
        <form>
          <Input name="id" placeholder="Search" />
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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input type="file" id="image" className="col-span-3 p-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  Url
                </Label>
                <Input type="url" id="url" className="col-span-3" />
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
          </DialogContent>
        </Dialog>
      </div>
      <section className="mx-auto my-8 w-full max-w-5xl px-6 md:max-w-7xl flex justify-center items-center flex-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
      <Footer />
    </>
  )
}
