'use client';
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import { Class } from './Class'

export interface IClassGroupProps {
    title: string;
    courseId: string;
    classes: {
        id: string;
        title: string;
    }[];
}

export const ClassGroup = ({ classes, courseId, title }: IClassGroupProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='overflow-hidden rounded-2xl border border-border bg-paper'>
            <button
                type='button'
                onClick={() => setOpen(!open)}
                className='flex w-full items-center gap-4 p-5 text-left font-extrabold transition hover:bg-paper-elevated'
            >
                {open
                    ? <MdKeyboardArrowDown size={24} />
                    : <MdKeyboardArrowRight size={24} />
                }

                {title}
            </button>

            <ol data-open={open} className='flex flex-col border-t border-border data-[open=false]:hidden'>
                {classes.map(({ id, title }) => (
                    <li key={id}>
                        <Class
                            title={title}
                            playerUrl={`/player/${courseId}/${id}`}
                        />
                    </li>
                ))}
            </ol>
        </div>
    )
}
