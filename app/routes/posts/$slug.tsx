import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { getPost } from "~/post";
import invariant from "tiny-invariant";


export const loader:LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html}} />
    </div>
  );
}