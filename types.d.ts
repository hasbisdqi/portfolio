type PostMeta = {
    slug: string,
    title: string,
    description: string,
    readTime: string,
    date: string,
    cover: string,
    published: boolean,
    tags: string[],
}

type PostContent = {
    meta: PostMeta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type ProjectMeta = {
    slug: string,
    title: string,
    description: string,
    coverImage: string,
    technologies: string[],
    liveUrl: string?,
    githubUrl: string?,
    year: string,
    duration: string,
    client: string,
    role: string,
    images: string[],
}

type ProjectContent = {
    meta: ProjectMeta,
    content: ReactElement<any, string | JSXElementConstructor<any>>
}