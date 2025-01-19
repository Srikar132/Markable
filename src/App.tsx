import { useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import { markDownGuide } from "./lib/utils"; 

const App = () => {
  const storedData = localStorage.getItem("MARKDOWN");
  const [markdown , setMarkdown] = useState<string>(storedData ? storedData : markDownGuide);

  const saveContent = () => {
    localStorage.setItem("MARKDOWN" , markdown);;
  }

  const clearEditor = () => {
    setMarkdown('');
    localStorage.removeItem("MARKDOWN");
  }

  return (
    <>
      <Header
        saveContent={saveContent}
        clearEditor={clearEditor}
      />
      <main className="w-full h-screen grid grid-cols-1  md:grid-cols-2">
        <Editor markdown={markdown} setMarkdown={setMarkdown}/>
        <Preview markdown={markdown}/>
      </main>
    </>
  )
};


export default App;