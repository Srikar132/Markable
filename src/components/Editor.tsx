import { Textarea } from "@/components/ui/textarea";

const Editor = ({
  markdown,
  setMarkdown,
}: {
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const lineCount = markdown ? markdown.split("\n").length : 0;

  return (
    <div className="editor-panel flex flex-col h-full bg-[#1a1d2e] overflow-hidden">
      {/* Panel label */}
      <div className="panel-label flex items-center justify-between px-4 py-2.5 border-b border-[#2a2d3e] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Editor
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>{lineCount} lines</span>
          <span>{wordCount} words</span>
        </div>
      </div>

      {/* Textarea */}
      <Textarea
        className="flex-1 w-full h-full resize-none border-none outline-none rounded-none shadow-none
          bg-[#1a1d2e] text-slate-200 text-sm leading-relaxed
          font-['JetBrains_Mono',_'Courier_New',_monospace]
          p-5 sm:p-6
          placeholder:text-slate-600
          focus-visible:ring-0 focus-visible:ring-offset-0
          focus:border-none focus:outline-none
          caret-indigo-400
          selection:bg-indigo-600/40"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="# Start writing your markdown here...&#10;&#10;**Bold**, *italic*, `code`, and more."
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
