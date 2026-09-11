'use client';
import { useEffect, useState } from 'react';
import { MdPlayCircle } from 'react-icons/md';
import Link from 'next/link';

import { IKeepWatching, LocalStorage } from '@/shared/services/local-storage';


export const KeepWatching = () => {
  const [data, setData] = useState<IKeepWatching | null>(null);

  useEffect(() => {
    const data = LocalStorage.keepWatching.get();
    setData(data);
  }, []);


  if (!data) return null;

  return (
    <Link
      href={`/player/${data.courseId}/${data.classId}`}
      className='p-4 mx-4 flex gap-2 bg-primary rounded-2xl hover:no-underline'
    >
      <div className='flex flex-col gap-2 flex-1'>
        <h1 className='font-bold line-clamp-1'>{data.className}</h1>
        <p className='line-clamp-1'>{data.courseName}</p>
      </div>

      <div className='flex gap-2 items-center justify-center'>
        <span className='hidden md:block'>Continuar assistindo</span>
        <MdPlayCircle size={28} />
      </div>
    </Link>
  );
};