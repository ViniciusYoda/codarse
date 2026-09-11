'use client';
import { useState } from 'react';


interface ICollapsibleTextProps {
  numberOfLinesWhenClosed: number;
  children: React.ReactNode;
}
export const CollapsibleText = ({ children, numberOfLinesWhenClosed }: ICollapsibleTextProps) => {
  const [open, setOpen] = useState(false);


  return (
    <div className='flex flex-col items-end'>
      <p
        data-open={open}
        style={{ '--number-of-lines-when-closed': numberOfLinesWhenClosed } as any}
        className='data-[open=false]:line-clamp-[var(--number-of-lines-when-closed)]'
      >
        {children}
      </p>

      <button
        data-open={open}
        onClick={() => setOpen(!open)}
        className='px-1 bg-paper rounded border border-primary data-[open=false]:-mt-7'
      >
        {open ? 'Ver menos' : 'Ver mais'}
      </button>
    </div>
  );
};