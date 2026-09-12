'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdClose, MdMenu, MdOutlineOpenInNew } from 'react-icons/md';

export const Header = () => {
    const [title, setTitle] = useState('CodarSe');
    const [drawer, setDrawer] = useState(false);
    const currentPath = usePathname();

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setTitle(document.title);
            setDrawer(false);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [currentPath]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setDrawer(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navigation = (
        <>
            <li>
                <Link
                    href='/'
                    data-active={currentPath === '/'}
                    className='block rounded-xl px-4 py-3 text-sm font-extrabold text-text-muted transition hover:bg-paper-elevated hover:text-text hover:no-underline data-[active=true]:bg-primary/10 data-[active=true]:text-primary sm:rounded-full sm:py-2'
                >
                    Página inicial
                </Link>
            </li>
            <li>
                <Link
                    href='/cursos'
                    data-active={currentPath.startsWith('/cursos')}
                    className='block rounded-xl px-4 py-3 text-sm font-extrabold text-text-muted transition hover:bg-paper-elevated hover:text-text hover:no-underline data-[active=true]:bg-primary/10 data-[active=true]:text-primary sm:rounded-full sm:py-2'
                >
                    Cursos
                </Link>
            </li>
            <li>
                <Link
                    href='https://blog.codarse.com'
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-text-muted transition hover:bg-paper-elevated hover:text-text hover:no-underline sm:rounded-full sm:py-2'
                >
                    Blog
                    <MdOutlineOpenInNew />
                </Link>
            </li>
        </>
    );

    return (
        <>
            <nav className='fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-background/80 px-4 backdrop-blur-xl sm:px-6'>
                <div className='mx-auto flex h-16 max-w-7xl items-center gap-3 lg:h-20'>
                    <button
                        type='button'
                        aria-label='Abrir menu'
                        aria-expanded={drawer}
                        className='rounded-lg p-2 text-text-muted transition hover:bg-paper-elevated hover:text-text sm:hidden'
                        onClick={() => setDrawer(true)}
                    >
                        <MdMenu size={24} />
                    </button>

                    <Link href='/' className='mr-auto flex shrink-0 items-center gap-2 text-lg font-black tracking-tight hover:no-underline'>
                        <span className='grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm text-primary-contrast shadow-[0_0_28px_rgba(32,201,181,0.24)]'>C</span>
                        <span className='hidden xs:block sm:block'>CODARSE</span>
                    </Link>

                    <ul className='hidden items-center gap-1 sm:flex'>{navigation}</ul>

                    <p className='line-clamp-1 min-w-0 flex-1 text-right text-sm font-bold text-text-muted sm:hidden'>
                        {title}
                    </p>
                </div>
            </nav>

            <div
                data-open={drawer}
                role='presentation'
                onClick={() => setDrawer(false)}
                className='fixed inset-0 z-50 bg-black/65 backdrop-blur-sm transition-opacity data-[open=false]:pointer-events-none data-[open=false]:opacity-0 sm:hidden'
            >
                <div
                    data-open={drawer}
                    className='flex h-full w-72 flex-col border-r border-border bg-paper p-5 shadow-2xl transition-transform data-[open=false]:-translate-x-full'
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className='mb-7 flex items-center justify-between'>
                        <span className='text-lg font-black text-primary'>Navegação</span>
                        <button
                            type='button'
                            aria-label='Fechar menu'
                            className='rounded-lg p-2 text-text-muted hover:bg-paper-elevated hover:text-text'
                            onClick={() => setDrawer(false)}
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                    <ul className='flex flex-col gap-1'>{navigation}</ul>
                </div>
            </div>

            <div className='h-16 lg:h-20' />
        </>
    );
};
