import { faFile, faTrash, faFilePdf, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Header = ({
  saveContent,
  clearEditor,
  exportPDF,
  exporting,
  pdfFilename,
  setPdfFilename,
}: {
  saveContent: () => void;
  clearEditor: () => void;
  exportPDF: () => void;
  exporting: boolean;
  pdfFilename: string;
  setPdfFilename: (v: string) => void;
}) => {
  return (
    <header className="shrink-0 w-full z-50 bg-[#0f1117] border-b border-[#1e2433]">
      <div className="flex items-center px-4 sm:px-6 py-3 justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
            <FontAwesomeIcon icon={faFile} className="text-white text-sm" />
          </div>
          <div>
            <p className="font-bold text-base sm:text-lg text-white leading-none tracking-tight">
              MarkablePDF
            </p>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5 hidden sm:block">
              Markdown to PDF
            </p>
          </div>
        </div>

        {/* Filename input + export */}
        <div className="flex items-center gap-2 flex-1 justify-end min-w-0">

          {/* Filename field — hidden on very small screens */}
          <div className="hidden sm:flex items-center bg-[#1a1d2e] border border-[#2a2d3e] rounded-lg overflow-hidden focus-within:border-indigo-500/60 transition-colors max-w-[200px] lg:max-w-[260px]">
            <span className="pl-3 text-slate-500 text-xs font-mono shrink-0 select-none">📄</span>
            <input
              type="text"
              value={pdfFilename}
              onChange={(e) => setPdfFilename(e.target.value)}
              placeholder="filename"
              className="bg-transparent text-slate-300 text-sm px-2 py-1.5 outline-none w-full min-w-0 font-mono placeholder:text-slate-600"
              spellCheck={false}
            />
            <span className="pr-3 text-slate-600 text-xs shrink-0 select-none">.pdf</span>
          </div>

          {/* Export PDF */}
          <Button
            onClick={exportPDF}
            disabled={exporting}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-3 sm:px-4 py-2 rounded-lg h-auto transition-all shrink-0"
          >
            <FontAwesomeIcon
              icon={exporting ? faSpinner : faFilePdf}
              className={`text-xs ${exporting ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">{exporting ? "Exporting…" : "Export PDF"}</span>
          </Button>

          {/* Clear */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 text-sm px-3 py-2 rounded-lg h-auto transition-all shrink-0"
              >
                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                <span className="hidden lg:inline">Clear</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#1a1d2e] border-[#2a2d3e] text-slate-100">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Clear editor?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  This permanently deletes your markdown and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearEditor}
                  className="bg-rose-600 hover:bg-rose-500 text-white border-none"
                >
                  Clear
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Save */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-3 sm:px-4 py-2 rounded-lg h-auto transition-all shrink-0">
                <FontAwesomeIcon icon={faSave} className="text-xs" />
                <span className="hidden lg:inline">Save</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[#1a1d2e] border-t border-[#2a2d3e] items-center">
              <div className="w-full max-w-md">
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-white text-2xl font-semibold">Save document</DrawerTitle>
                  <DrawerDescription className="text-slate-400 text-base mt-1">
                    Save your markdown to browser storage.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="px-6 pb-8 gap-3">
                  <DrawerClose asChild>
                    <Button
                      onClick={saveContent}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg py-2.5 font-medium"
                    >
                      Save
                    </Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg py-2.5"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

        </div>
      </div>
    </header>
  );
};

export default Header;
