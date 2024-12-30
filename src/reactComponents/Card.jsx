import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

export default function Cards() {
  return (
    <>
      <div className="w-2/5 flex justify-center">
        <Card className="border-none">
          <CardContent className="flex flex-wrap items-center justify-center mt-1">
            <img
              src="../../public/imgs/projectImage.webp"
              className="rounded-lg w-full shadow-sm shadow-slate-200"
              alt="Image"
            />
          </CardContent>
          <CardFooter>
            <CardTitle className="text-center text-2xl mx-2">Anunx</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-full border-none bg-slate-900 hover:bg-slate-800 ease-in">
                  <img src="../../public/imgs/moreIcon.png" width="25px" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle />
                <p className="text-center my-1 text-slate-400">
                  {' '}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <a href="#" className="text-center my-1">
                  Project Repository
                </a>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
