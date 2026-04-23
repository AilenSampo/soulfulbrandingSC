import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  a: ({ href, children, ...props }) => {
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[20rem] border-collapse text-left">{children}</table>
    </div>
  ),
};

const bodyClassName =
  "space-y-4 text-sm leading-relaxed text-neutral-700 [&_a]:text-brand-blue [&_a]:underline " +
  "[&>h2:first-child]:mt-0 [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:font-sans [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-brand-navy " +
  "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-brand-navy " +
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 " +
  "[&_hr]:my-8 [&_hr]:border-neutral-200 [&_strong]:font-semibold " +
  "[&_th]:border [&_th]:border-neutral-200 [&_th]:bg-neutral-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-xs [&_th]:font-semibold " +
  "[&_td]:border [&_td]:border-neutral-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-xs";

type Props = { content: string };

export function LegalMarkdownBody({ content }: Props) {
  return (
    <div className={bodyClassName}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
