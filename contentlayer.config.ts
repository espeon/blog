import { defineDocumentType, makeSource } from "contentlayer2/source-files";

import latte from "@catppuccin/vscode/themes/latte.json" with { type: "json" };
import mocha from "@catppuccin/vscode/themes/mocha.json" with { type: "json" };

import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { readFileSync } from "fs";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    datePublished: { type: "date", required: true },
    lastUpdated: { type: "date", required: false },
    summary: { type: "string", required: true },
    public: { type: "boolean", required: false, default: true },
    coAuthors: { type: "list", of: { type: "string" }, required: false },
    coAuthorPFPs: { type: "list", of: { type: "string" }, required: false },
    isWeekly: { type: "boolean", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: mocha,
            light: latte,
          },
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
