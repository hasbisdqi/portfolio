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
    const hasNotionApi = !!process.env.NOTION_API;
    const hasDbId = !!process.env.DB_ID;
    const hasProjDbId = !!process.env.PROJECT_DB_ID;
    
    // Ambil data posts dan projects
    const posts = await getPosts(); // Ambil semua post dari Notion
    const projects = await getProjects(); // Ambil semua project dari Notion

    // Ambil slug dari posts dan projects untuk direvalidate
    const postSlugs = posts.map((post) => `/post/${post.meta.slug}`);
    const projectSlugs = projects.map((project) => `/project/${project.meta.slug}`);

    // Revalidate setiap post
    revalidatePath('/');
    revalidatePath('/post');
    revalidatePath('/project');
    for (const slug of postSlugs) {
      revalidatePath(slug);
    }

    // Revalidate setiap project
    for (const slug of projectSlugs) {
      revalidatePath(slug);
    }

    return Response.json({
      status: 'success',
      env_check: { hasNotionApi, hasDbId, hasProjDbId },
      posts_count: posts.length,
      projects_count: projects.length,
      postSlugs,
      projectSlugs,
    });
  } catch (err) {
    console.error(err);
    return new Response(`Error: ${err instanceof Error ? err.message : String(err)}`, { status: 500 });
  }
}
