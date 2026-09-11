import { MdShare } from 'react-icons/md';


export const CourseHeaderLoading = () => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='bg-gray-200/40 h-7 rounded animate-pulse' />

      <span className='h-[70px] bg-gray-200/40 rounded animate-pulse' />

      <div className='flex gap-2 items-center'>
        <button className='py-2 px-4 bg-paper rounded-full flex gap-2 items-center'>
          <MdShare />
          Compartilhar
        </button>

        <span className='w-16 bg-gray-200/40 h-4 rounded animate-pulse' />
      </div>
    </div>
  );
};