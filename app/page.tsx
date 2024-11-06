import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-1 py-12">
      <div className="grid grid-cols-12 gap-8 lg:max-w-screen-xl px-4">
        <div className="max-w-md lg:text-left text-center col-span-full lg:col-span-5 mx-auto my-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Hi, Im <span className="text-primary">Hasbi Assidiqi</span></h1>
          <p className="text-muted-foreground text-pretty text-sm">I am a passionate web developer with a knack for creating dynamic and responsive web applications. With a strong foundation in JavaScript and React, I enjoy bringing ideas to life in the browser.</p>
          <div className="flex gap-4 mt-6 lg:justify-start justify-center">
            <Button>Get in touch</Button>
            <Button variant={'secondary'}>About me</Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-2 col-span-full lg:col-span-7 lg:max-w-full max-w-md">
          <div className="border border-primary/20 backdrop-blur rounded-lg bg-primary/10 p-4 lg:max-w-full">
            <h2 className="text-md font-bold">Lorem ipsum dolor sit amet consectetur</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, natus enim repudiandae accusamus doloremque sequi. Voluptate aliquam similique incidunt sapiente.</p>
          </div>
          <div className="border border-primary/20 backdrop-blur rounded-lg bg-primary/10 p-4 lg:max-w-full">
            <h2 className="text-md font-bold">Lorem ipsum dolor sit amet consectetur</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, natus enim repudiandae accusamus doloremque sequi. Voluptate aliquam similique incidunt sapiente.</p>
          </div>
          <div className="border border-primary/20 backdrop-blur rounded-lg bg-primary/10 p-4 lg:max-w-full">
            <h2 className="text-md font-bold">Lorem ipsum dolor sit amet consectetur</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, natus enim repudiandae accusamus doloremque sequi. Voluptate aliquam similique incidunt sapiente.</p>
          </div>
          <div className="border border-primary/20 backdrop-blur rounded-lg bg-primary/10 p-4 lg:max-w-full">
            <h2 className="text-md font-bold">Lorem ipsum dolor sit amet consectetur</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, natus enim repudiandae accusamus doloremque sequi. Voluptate aliquam similique incidunt sapiente.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
