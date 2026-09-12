'use client';
import { MdShare } from 'react-icons/md';

import { CollapsibleText } from './components/CollapsibleText';
import { ContentCopy } from './components/CopyContext';


interface ICourseHeaderProps {
  title: string;
  description: string;
  numberOfClasses: number;
}
export const CourseHeader = ({ title, description, numberOfClasses }: ICourseHeaderProps) => {


  return (
    <header className='flex flex-col gap-5'>
      <h1 className='max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl'>
        {title}
      </h1>

      <CollapsibleText numberOfLinesWhenClosed={3}>
        {description}
      </CollapsibleText>

      <div className='flex flex-wrap items-center gap-3 border-t border-border pt-5'>
        <ContentCopy title='Copie o link abaixo'>
          <button type='button' className='flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2.5 text-sm font-extrabold transition hover:border-primary/50 hover:bg-paper-elevated'>
            <MdShare />
            Compartilhar
          </button>
        </ContentCopy>

        <span className='rounded-full bg-primary/10 px-4 py-2.5 text-sm font-extrabold text-primary'>
          {numberOfClasses} aulas
        </span>
      </div>
    </header>
  );
};
