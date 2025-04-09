import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Markdown = ({ content }: { content: string }) => {
    return (
<div className="prose prose-invert max-w-none text-white">
    <ReactMarkdown
        components={{
            code({ node, inline, className, content, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                    <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ padding: '1rem', borderRadius: '0.5rem' }}
                        {...props}
                    >
                        {String(content).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                ) : (
                    <code className="bg-white/10 px-1 py-0.5 rounded text-pink-300" {...props}>
                        {content}
                    </code>
                );
            }
        }}
    >
        {content}
    </ReactMarkdown>
</div>

    );
    }
export default Markdown;