'use client';
import { useEffect, useState, type ReactElement } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MdCheck, MdContentCopy } from 'react-icons/md';


interface IContentCopyProps {
  title: string;
  content?: string;
  children: ReactElement;
}
export const ContentCopy = ({ title, children, content }: IContentCopyProps) => {
  const [copied, setCopied] = useState(false);
  const [copyContent, setCopyContent] = useState(content ?? '');


  useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);


  const handleCopy = async () => {
    try {
      await window.navigator.clipboard.writeText(copyContent);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };


  return (
    <DropdownMenu.Root
      onOpenChange={(open) => {
        if (open) {
          setCopyContent(content || window.location.href);
        } else {
          setCopied(false);
        }
      }}
    >
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={10} align='start' className='z-50 flex min-w-72 max-w-sm flex-col gap-3 rounded-2xl border border-border bg-paper-elevated p-4 shadow-2xl'>
          <span className='text-sm font-extrabold'>{title}</span>

          <div className='flex items-center gap-2'>
            <input
              readOnly
              autoFocus
              value={copyContent}
              onFocus={e => e.target.select()}
              aria-label='Conteúdo para copiar'
              className='w-full min-w-0 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-text-muted'
            />

            <button
              type='button'
              aria-label={copied ? 'Conteúdo copiado' : 'Copiar conteúdo'}
              className='rounded-xl bg-primary p-2.5 text-primary-contrast transition hover:bg-primary-hover'
              onClick={handleCopy}
            >
              {copied ? <MdCheck className='text-primary' /> : <MdContentCopy />}
            </button>
          </div>
          <DropdownMenu.Arrow className='fill-paper-elevated' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
