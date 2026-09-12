import { MdShare } from 'react-icons/md';


export const CourseHeaderLoading = () => {
  return (
    <div className='flex flex-col gap-5'>
      <span className='h-10 w-4/5 animate-pulse rounded-xl bg-paper-elevated' />

      <span className='h-24 animate-pulse rounded-2xl bg-paper-elevated' />

      <div className='flex items-center gap-3 border-t border-border pt-5'>
        <button type='button' disabled className='flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2.5 text-sm font-extrabold'>
          <MdShare />
          Compartilhar
        </button>

        <span className='h-10 w-24 animate-pulse rounded-full bg-paper-elevated' />
      </div>
    </div>
  );
};
