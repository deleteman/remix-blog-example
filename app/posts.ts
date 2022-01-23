import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";


export type PostMarkdownAttributes = {
  title: string;
};

export function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

// relative to the server output not the source!
export const postsPath = path.join(__dirname, "..", "posts");

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(
        path.join(postsPath, filename)
      );
      const { attributes } = parseFrontMatter(
        file.toString()
      );
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title
      };
    })
  );
}

export type Post = {
  slug: string;
  title: string;
  markdown: string;
};
