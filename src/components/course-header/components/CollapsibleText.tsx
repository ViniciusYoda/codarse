'use client';
import { useState, type CSSProperties } from 'react';


interface ICollapsibleTextProps {
  numberOfLinesWhenClosed: number;
  children: React.ReactNode;
}
export const CollapsibleText = ({ children, numberOfLinesWhenClosed }: ICollapsibleTextProps) => {
  const [open, setOpen] = useState(false);


  return (
    <div className='flex flex-col items-start gap-3'>
      <p
        data-open={open}
        style={{
          '--number-of-lines-when-closed': numberOfLinesWhenClosed,
        } as CSSProperties & { '--number-of-lines-when-closed': number }}
        className='max-w-3xl text-base leading-7 text-text-muted data-[open=false]:line-clamp-[var(--number-of-lines-when-closed)]'
      >
        {children}
      </p>

      <button
        type='button'
        data-open={open}
        onClick={() => setOpen(!open)}
        className='rounded-full border border-border bg-paper px-3 py-1.5 text-sm font-extrabold text-primary transition hover:border-primary/50 hover:bg-paper-elevated'
      >
        {open ? 'Ver menos' : 'Ver mais'}
      </button>
    </div>
  );
};
