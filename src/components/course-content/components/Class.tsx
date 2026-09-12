import Link from 'next/link';
import { MdPlayCircleOutline } from 'react-icons/md';


interface IClassProps {
  title: string;
  playerUrl: string;
}

export const Class = ({ playerUrl, title }: IClassProps) => {

  return (
    <Link href={playerUrl} className='group flex items-center gap-4 border-b border-border/60 px-5 py-4 text-text-muted transition last:border-0 hover:bg-primary/5 hover:text-text hover:no-underline'>
      <MdPlayCircleOutline size={24} className='shrink-0 text-primary transition group-hover:scale-110' />

      {title}
    </Link>
  );
};
