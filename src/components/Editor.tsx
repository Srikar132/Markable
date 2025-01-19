import { Textarea } from "@/components/ui/textarea"
const Editor = ({
    markdown,
    setMarkdown
} : {
    markdown : string,
    setMarkdown : React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className=" flex flex-col  overflow-hidden h-full">
        <div className="bg-gray-900 p-2 sm:p-4 md:p-5 text-white w-full uppercase tracking-wider">
            Mark Down
        </div>
        <Textarea
            className="min-h-[50vh] w-full flex-growoutline-none  overflow-scroll p-6 text-xl sm:text-3xl h-full border-2 border-gray-700  shadow-md transition-all ease-in-out duration-300 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500 placeholder:text-7xl text-black"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Start writing your markdown here..."
            
        />

    </div>
  )
}

export default Editor