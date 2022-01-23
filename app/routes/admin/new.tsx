import { redirect, Form, ActionFunction } from "remix";
import { createPost } from "~/post";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = (formData.get("title") || "").toString();
  const slug = (formData.get("slug") || "").toString();
  const markdown = (formData.get("markdown") || "").toString();

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  return (
    <Form method="post">
      <p>
        <label>
          Post Title: <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>
        <br />
        <textarea id="markdown" rows={20} cols={80} name="markdown" />
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}