'use client';
import { useEffect, useState } from 'react';
import { MdPlayCircle } from 'react-icons/md';
import Link from 'next/link';

import { IKeepWatching, LocalStorage } from '@/shared/services/local-storage';


export const KeepWatching = () => {
  const [data, setData] = useState<IKeepWatching | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setData(LocalStorage.keepWatching.get());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);


  if (!data) return null;

  return (
    <Link
      href={`/player/${data.courseId}/${data.classId}`}
      className='group relative flex overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/18 via-paper to-paper p-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:border-primary/50 hover:no-underline sm:p-6'
    >
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <span className='mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary'>Continue de onde parou</span>
        <h2 className='line-clamp-1 text-xl font-black sm:text-2xl'>{data.className}</h2>
        <p className='line-clamp-1 text-sm text-text-muted sm:text-base'>{data.courseName}</p>
      </div>

      <div className='ml-4 flex items-center justify-center gap-2 self-center rounded-full bg-primary px-3 py-3 font-extrabold text-primary-contrast transition group-hover:bg-primary-hover sm:px-5'>
        <span className='hidden md:block'>Continuar</span>
        <MdPlayCircle size={26} />
      </div>
    </Link>
  );
};
