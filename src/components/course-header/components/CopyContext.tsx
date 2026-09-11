'use client';
import { useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MdCheck, MdContentCopy } from 'react-icons/md';


interface IContentCopyProps {
  title: string;
  content: string;
  children: React.ReactNode;
}
export const ContentCopy = ({ title, children, content }: IContentCopyProps) => {
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);


  const handleCopy = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(content);
  };


  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='p-2 bg-paper border border-primary rounded-lg flex flex-col gap-2 min-w-72 max-w-sm'>
          <span>{title}</span>

          <div className='flex items-center gap-1'>
            <input
              readOnly
              autoFocus
              value={content}
              onFocus={e => e.target.select()}
              className='bg-background p-1 px-2 rounded w-full'
            />

            <button className='p-2' onClick={handleCopy}>
              {copied ? <MdCheck className='text-primary' /> : <MdContentCopy />}
            </button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};