import { useRef, useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import { markDownGuide } from "./lib/utils";

const App = () => {
  const storedData = localStorage.getItem("MARKDOWN");
  const [markdown, setMarkdown] = useState<string>(storedData ?? markDownGuide);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [exporting, setExporting] = useState(false);
  const [pdfFilename, setPdfFilename] = useState("document");
  const parsedHtmlRef = useRef<string>("");
  const previewRef = useRef<HTMLDivElement>(null);

  const saveContent = () => localStorage.setItem("MARKDOWN", markdown);

  const clearEditor = () => {
    setMarkdown("");
    localStorage.removeItem("MARKDOWN");
  };

  const exportPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    setExporting(true);

    // Apply light-theme class so html2canvas captures clean colors
    element.classList.add("pdf-export");
    // Strip card styling so no border/shadow artifacts in PDF
    const prevStyle = element.getAttribute("style") ?? "";
    element.style.borderRadius = "0";
    element.style.boxShadow = "none";
    element.style.border = "none";
    element.style.padding = "32px";

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const filename = (pdfFilename.trim() || "document").replace(/\.pdf$/i, "") + ".pdf";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (html2pdf() as any)
        .set({
          margin: [12, 14, 12, 14],
          filename,
          image: { type: "png", quality: 1 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: "#ffffff",
            logging: false,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: {
            mode: ["css", "legacy"],
            avoid: ["h1", "h2", "h3", "h4", ".code-block-wrapper", "blockquote", "table", "img"],
          },
        })
        .from(element)
        .save();
    } finally {
      element.classList.remove("pdf-export");
      element.setAttribute("style", prevStyle);
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0f1117]">
      <Header
        saveContent={saveContent}
        clearEditor={clearEditor}
        exportPDF={exportPDF}
        exporting={exporting}
        pdfFilename={pdfFilename}
        setPdfFilename={setPdfFilename}
      />

      <div className="mobile-tabs md:hidden flex border-b border-[#1e2433] shrink-0">
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex-1 py-2.5 text-sm font-medium tracking-wide uppercase transition-all ${
            activeTab === "editor"
              ? "text-indigo-400 border-b-2 border-indigo-400 bg-[#1a1d2e]"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2.5 text-sm font-medium tracking-wide uppercase transition-all ${
            activeTab === "preview"
              ? "text-indigo-400 border-b-2 border-indigo-400 bg-[#1a1d2e]"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Preview
        </button>
      </div>

      <main className="flex-1 overflow-hidden md:grid md:grid-cols-2">
        <div className={`h-full overflow-hidden ${activeTab === "editor" ? "block" : "hidden"} md:block`}>
          <Editor markdown={markdown} setMarkdown={setMarkdown} />
        </div>
        <div className={`h-full overflow-hidden ${activeTab === "preview" ? "block" : "hidden"} md:block`}>
          <Preview markdown={markdown} parsedHtmlRef={parsedHtmlRef} previewRef={previewRef} />
        </div>
      </main>
    </div>
  );
};

export default App;
