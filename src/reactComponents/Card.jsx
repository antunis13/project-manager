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

export default function Cards({ img, title, description, url }) {
  return (
    <>
      <div className="w-2/5 flex justify-center">
        <Card className="border-none rounded-lg">
          <CardContent className="flex flex-wrap items-center justify-center mt-1">
            <img src={img} className="rounded-lg w-full" alt="Project image" />
          </CardContent>
          <CardFooter>
            <CardTitle className="text-center text-2xl mx-2">{title}</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full border-none bg-slate-900 hover:bg-slate-800 ease-in">
                  <img src="../../public/imgs/moreIcon.png" width="25px" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle />
                <CardDescription> {description}</CardDescription>
                <a href="#" className="text-center my-1">
                  Project Repository: {url}
                </a>
                <DialogFooter>
                  <Button variant="outline">Update</Button>
                  <Button variant="outline">Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
