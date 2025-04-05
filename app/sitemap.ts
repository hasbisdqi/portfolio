import { getPosts, getProjects } from '@/lib/contents';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts()
    const projects = await getProjects()
    const baseUrl = "https://rnghbt.me";
    const staticRoutes: MetadataRoute.Sitemap = [
        {
          url: `${baseUrl}/`,
          lastModified: new Date(),
          changeFrequency: "yearly",
          priority: 1,
        },
        {
          url: `${baseUrl}/about`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
      ];
      const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/post/${post.meta.slug}`,
        lastModified: new Date(post.meta.date),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
      const postProjects: MetadataRoute.Sitemap = projects.map((post) => ({
        url: `${baseUrl}/post/${post.meta.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
      return [...staticRoutes, ...postProjects, ...postRoutes];
}