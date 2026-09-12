import { Metadata } from 'next';

import { CourseHeader } from '@/components/course-header/CourseHeader';
import { CourseContent } from '@/components/course-content/CourseContent';
import { APIYouTube } from '@/shared/services/api-youtube';
import { StartCourse } from '@/components/StartCourse';

type RouteParams = { id: string };

interface Props {
  params: Promise<RouteParams>;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const courses = await APIYouTube.course.getAll();
  return courses.map(course => ({ id: course.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const courseDetail = await APIYouTube.course.getById(id);

  return {
    title: courseDetail.title,
    description: courseDetail.description,
    openGraph: {
      locale: 'pt_BR',
      type: 'video.other',
      title: courseDetail.title,
      images: courseDetail.image,
      description: courseDetail.description,
      videos: courseDetail.classGroups
        .reduce<string[]>((previous, current) => [
          ...previous,
          ...current.classes.map(classItem => `https://codarse.com/player/${current.courseId}/${classItem.id}`),
        ], []),
    }
  };
};

export default async function PageCourseDetail({ params }: Props) {
  const { id } = await params;
  const courseDetail = await APIYouTube.course.getById(id);

  const firstClass = courseDetail.classGroups.at(0)?.classes.at(0);


  return (
    <main className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start'>

        {firstClass && (
          <aside className='lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28'>
            <StartCourse
              idClass={firstClass.id}
              title={firstClass.title}
              idCourse={courseDetail.id}
              imageUrl={courseDetail.image}
            />
          </aside>
        )}

        <div className='flex min-w-0 flex-col gap-12 pb-12 lg:col-start-1 lg:row-start-1'>
          <CourseHeader
            title={courseDetail.title}
            description={courseDetail.description}
            numberOfClasses={courseDetail.numberOfClasses}
          />

          <CourseContent classGroups={courseDetail.classGroups} />
        </div>
      </div>
    </main>
  );
}
