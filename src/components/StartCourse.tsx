'use client';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { MdPlayCircleOutline } from 'react-icons/md';


interface IStartCourseProps {
  title: string;
  idClass: string;
  idCourse: string;
  imageUrl: string;
}
export const StartCourse = ({ idClass, idCourse, imageUrl, title }: IStartCourseProps) => {
  const [ref, inView] = useInView({ threshold: 0.2, initialInView: true });


  return (
    <>
      <div ref={ref} className='flex flex-col gap-4 rounded-3xl border border-border bg-paper p-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)]'>
        <Link
          href={`/player/${idCourse}/${idClass}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
          className='group aspect-video w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat'
        >
          <div className='flex h-full w-full items-center justify-center bg-background/35 transition group-hover:bg-background/55'>
            <span className='grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-contrast shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition group-hover:scale-110 group-hover:bg-primary-hover'>
              <MdPlayCircleOutline size={38} />
            </span>
          </div>
        </Link>

        <Link
          href={`/player/${idCourse}/${idClass}`}
          className='rounded-xl bg-primary px-4 py-3 text-center font-black text-primary-contrast transition hover:bg-primary-hover hover:no-underline'
        >
          Começar curso
        </Link>
      </div>

      {!inView && (
        <div className='fixed inset-x-3 bottom-3 z-30 flex items-center gap-3 rounded-2xl border border-border bg-paper/95 p-3 shadow-2xl backdrop-blur-xl md:hidden'>
          <h2 className='line-clamp-1 min-w-0 flex-1 font-extrabold'>
            {title}
          </h2>

          <Link
            href={`/player/${idCourse}/${idClass}`}
            className='shrink-0 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-black text-primary-contrast hover:bg-primary-hover hover:no-underline'
          >
            Começar curso
          </Link>
        </div>
      )}
    </>
  );
};
