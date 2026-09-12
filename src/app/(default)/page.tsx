import { Metadata } from 'next';

import { APIYouTube } from '@/shared/services/api-youtube';
import { KeepWatching } from '@/components/KeepWatching';
import { Section } from '@/components/section/Section';


export const metadata: Metadata = {
  title: "CodarSe - Página inicial"
};

export default async function PageHome() {
  const courses = await APIYouTube.course.getAll();


  return (
    <main className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <div className='flex flex-col gap-10'>
        <KeepWatching />

        <Section
          variant='h-list'
          title='Veja mais cursos'
          items={
            courses.map(course => ({
              title: course.title,
              image: course.image,
              href: `/cursos/${course.id}`,
              description: course.description,
            }))
          }
        />
      </div>
    </main>
  );
}
