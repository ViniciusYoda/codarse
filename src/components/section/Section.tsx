'use client';
import { UIEvent, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { Card, ICardProps } from "../card/Card";

interface ISectionProps {
    title: string;
    items: ICardProps[];
    variant: 'grid' | 'h-list';
}

export const Section = ({ title, items, variant = 'grid' }: ISectionProps) => {
    const scrollRef = useRef<HTMLUListElement>(null);

    const [scrollAt, setScrollAt] = useState<'start' | 'middle' | 'end'>('start');

    const handleScroll = (event: UIEvent<HTMLUListElement>) => {
        if (event.currentTarget.scrollLeft === 0) {
            setScrollAt('start');
        } else if (event.currentTarget.scrollLeft >= event.currentTarget.scrollWidth - event.currentTarget.clientWidth - 1) {
            setScrollAt('end');
        } else {
            setScrollAt('middle');
        }
    };

    const handleSetScroll = (scroll: number) => {
        const currentScrollLeft = scrollRef.current?.scrollLeft || 0;
        scrollRef.current?.scrollTo({ behavior: 'smooth', left: currentScrollLeft + scroll });
    };

    return (
        <section className='flex flex-col gap-5'>
            <div className='flex items-end justify-between gap-4'>
                <div>
                    <span className='mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-primary'>Aprenda no seu ritmo</span>
                    <h2 className='text-2xl font-black tracking-tight sm:text-3xl'>{title}</h2>
                </div>
                <span className='text-sm font-bold text-text-muted'>{items.length} cursos</span>
            </div>

            <ul
                ref={scrollRef}
                data-variant={variant}
                onScroll={handleScroll}
                className='grid grid-cols-1 gap-5 data-[variant=grid]:sm:grid-cols-2 data-[variant=grid]:lg:grid-cols-3 data-[variant=h-list]:sm:auto-cols-max data-[variant=h-list]:sm:grid-flow-col data-[variant=h-list]:sm:overflow-x-auto data-[variant=h-list]:sm:pb-3'
            >
                {variant === 'h-list' && (
                    <li className='sticky left-2 z-10 my-auto hidden w-0 sm:block'>
                        <button
                            type='button'
                            aria-label='Ver cursos anteriores'
                            disabled={scrollAt === 'start'}
                            onClick={() => handleSetScroll(-350)}
                            className='flex h-14 w-14 items-center justify-center rounded-full bg-primary transition-opacity disabled:opacity-0 active:opacity-80'
                        >
                            <MdKeyboardArrowLeft size={32} />
                        </button>
                    </li>
                )}

                {items.map(item => (
                    <li key={item.href} data-variant={variant} className='w-full snap-start data-[variant=h-list]:sm:w-76'>
                        <Card
                            href={item.href}
                            title={item.title}
                            image={item.image}
                            description={item.description}
                        />
                    </li>
                ))}

                {variant === 'h-list' && (
                    <li className='sticky right-16 z-10 my-auto hidden w-0 sm:block'>
                        <button
                            type='button'
                            aria-label='Ver próximos cursos'
                            disabled={scrollAt === 'end'}
                            onClick={() => handleSetScroll(350)}
                            className='flex h-14 w-14 items-center justify-center rounded-full bg-primary transition-opacity disabled:opacity-0 active:opacity-80'
                        >
                            <MdKeyboardArrowRight size={32} />
                        </button>
                    </li>
                )}
            </ul>
        </section>
    );
}

