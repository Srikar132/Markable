import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const markDownGuide = `# Markdown Guide

Markdown is a lightweight markup language that you can use to format text easily.
***

## Text Formatting

You can use **bold** or *italic* text for emphasis.

- **Bold text** is created using double asterisks \`**bold**\` or double underscores \`__bold__\`.
- *Italic text* is created using a single asterisk \`*italic*\` or underscore \`_italic_\`.
- ***Bold and italic text*** is made by using triple asterisks or underscores.

***

## Lists

### Unordered List:
- Item 1
- Item 2
- Item 3

### Ordered List:
1. First item
2. Second item
3. Third item

***

## Links and Images

You can create links to websites using this syntax: [OpenAI](https://openai.com).

To display images, use this format: ![Shadcn](https://tse1.mm.bing.net/th?id=OIP.snFNvrjLVU53991_atVwcgAAAA&pid=Api&P=0&h=180).

***

## Blockquotes

> "This is a blockquote. It’s often used to highlight quotes or important information."

***

## Code

### Inline code
To include inline code, use backticks like this: \`print("Hello, world!")\`.

### Code block
For multi-line code, use three backticks like this:

\`\`\`python
def greet():
    print("Hello, world!")
\`\`\`

*** 

## Conclusion
Markdown is a simple way to format your text without needing complex tools. You can make documents clear and easy to read with just a few characters.`;
