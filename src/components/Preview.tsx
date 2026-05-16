import DOMPurify from "dompurify";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { useEffect, useState, MutableRefObject, RefObject } from "react";

const Preview = ({
  markdown,
  parsedHtmlRef,
  previewRef,
}: {
  markdown: string;
  parsedHtmlRef: MutableRefObject<string>;
  previewRef: RefObject<HTMLDivElement>;
}) => {
  const [parsed, setParsed] = useState<string>("");

  useEffect(() => {
    const renderer = new marked.Renderer();
    renderer.code = function ({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
      const highlightedCode = hljs.highlight(text, { language }).value;
      const label = lang ?? "text";
      return `<div class="code-block-wrapper">
          <div class="code-block-header">
            <div class="code-block-dots"><span></span><span></span><span></span></div>
            <span class="code-lang-label">${label}</span>
          </div>
          <pre><code class="hljs language-${language}">${highlightedCode}</code></pre>
        </div>`;
    };
    marked.setOptions({ renderer });
  }, []);

  useEffect(() => {
    const html = DOMPurify.sanitize(marked(markdown) as string);
    setParsed(html);
    parsedHtmlRef.current = html;
  }, [markdown, parsedHtmlRef]);

  const isEmpty = !markdown.trim();

  return (
    <div className="preview-panel flex flex-col h-full bg-[#f4f6fa] overflow-hidden border-l border-[#1e2433]">
      <div className="panel-label flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Preview</span>
        </div>
        <span className="text-xs text-slate-400">Live</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 select-none">
            <div className="text-5xl mb-4 opacity-20">✦</div>
            <p className="text-sm font-medium">Nothing to preview yet</p>
            <p className="text-xs mt-1 opacity-70">Start writing in the editor</p>
          </div>
        ) : (
          <div
            ref={previewRef}
            className="markdown-content bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 lg:p-10 min-h-full"
            dangerouslySetInnerHTML={{ __html: parsed }}
          />
        )}
      </div>
    </div>
  );
};

export default Preview;
