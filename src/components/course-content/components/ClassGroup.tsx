'use client';
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import { Class } from './Class'
import { title } from "process";

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
        <>
            <button
                onClick={() => setOpen(!open)}
                className='flex items-center gap-6 p-4 bg-paper'
            >
                {open
                    ? <MdKeyboardArrowDown size={24} />
                    : <MdKeyboardArrowRight size={24} />
                }

                {title}
            </button>

            <ol data-open={open} className='flex flex-col data-[open-false]:hidden'>
                {classes.map(({ id, title }) => (
                    <li key={id}>
                        <Class
                            title={title}
                            playerUrl={`/player/${courseId}/${id}`}
                        />
                    </li>
                ))}
            </ol>
        </>
    )
}