import { faFile , faTrash , faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button} from "../components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
const Header = ({
    saveContent,
    clearEditor
} : {
    saveContent : () => void;
    clearEditor : () => void;
}) => {
  return (
    <header className='w-full z-50 backdrop-blur-sm border-b border-primary'>
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 py-3 justify-between">
            <div className="flex items-center gap-x-2">
                <FontAwesomeIcon color="black" icon={faFile} size="2x"  />
                <p className="font-bold text-lg sm:text-xl md:text-2xl tracking-wide text-black transition-all">
                    Markdown
                </p>
            </div>
            <div className="flex items-center gap-x-2">
                <HoverCard>
                    <HoverCardTrigger>

                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className="bg-black/20 rounded-3xl hover:bg-white/70 px-3">
                                    <FontAwesomeIcon color="black" icon={faTrash}   />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your markdown
                                    and remove your data from our storage.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={clearEditor}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>

                    </HoverCardTrigger>
                    <HoverCardContent>
                    <FontAwesomeIcon color="black" icon={faCircleInfo} className="mr-3"  /> Clear the text in Editor.
                    </HoverCardContent>
                </HoverCard>

                <Drawer>
                    <DrawerTrigger>
                        <Button className="bg-black rounded-3xl hover:bg-black/70 px-7 py-2 text-white">
                            save
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="items-center md:w-[30%] md:mx-auto">
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl">Save Markdown ??</DrawerTitle>
                            <DrawerDescription className=""> 
                            <p className="text-gray-700 text-lg">
                                You can save your markdown content to prevent losing your progress
                            </p>
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="w-full">
                            <DrawerClose className="w-full space-y-3">
                                <Button onClick={saveContent} className="rounded-3xl w-full " >Save</Button>

                                <Button className="w-full rounded-3xl" variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

            </div>
        </div>
    </header>
  )
}

export default Header