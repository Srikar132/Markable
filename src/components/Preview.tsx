import DOMPurify from 'dompurify';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEffect, useState } from "react";

const Preview = ({
    markdown
} : {
    markdown : string
}) => {
    useEffect(() => {
        const renderer = new marked.Renderer();

        renderer.code = function ({text , lang}) {
            const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
            const highlightedCode = hljs.highlight(text, { language }).value;

            return `<pre><code class="hljs ${language}">${highlightedCode}</code></pre>`;
        };

        marked.setOptions({
            renderer: renderer,
          });
    } , []);

    const [parsed , setParsed] = useState<string>('');

    useEffect(() => {
        setParsed(DOMPurify.sanitize(marked(markdown) as string))
    } , [markdown]);


  return (
    <div className="border-r flex flex-col overflow-hidden h-full">
        <div className="bg-gray-900 p-2 sm:p-5 md:p- text-white w-full uppercase tracking-wider">
            Preview
        </div>
        <div
            className="markdown-content w-full flex-grow prose prose-invert p-6 prose-heading prose-a:text-blue-800 overflow-scroll"
            dangerouslySetInnerHTML={{__html : parsed}}
        ></div>
    </div>
  )
}

export default Preview