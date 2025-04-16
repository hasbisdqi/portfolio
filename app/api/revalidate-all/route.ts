// app/api/revalidate-all/route.ts

import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPosts, getProjects } from '@/lib/contents';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('secret'); // Ambil secret dari header

  // Cek apakah secret cocok dengan yang ada di .env
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Ambil data posts dan projects
    const posts = await getPosts(); // Ambil semua post dari GitHub
    const projects = await getProjects(); // Ambil semua project dari GitHub

    // Ambil slug dari posts dan projects untuk direvalidate
    const postSlugs = posts.map((post) => `/post/${post.meta.slug}`);
    const projectSlugs = projects.map((project) => `/project/${project.meta.slug}`);

    // Revalidate setiap post
    for (const slug of postSlugs) {
      revalidatePath(slug);
    }

    // Revalidate setiap project
    for (const slug of projectSlugs) {
      revalidatePath(slug);
    }

    // Mengembalikan response sukses dengan jumlah path yang direvalidate
    return new Response(`Revalidated ${postSlugs.length + projectSlugs.length} paths`, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
