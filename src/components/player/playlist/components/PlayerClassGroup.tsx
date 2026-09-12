'use client';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

import { PlayerClass, IPlayerClassProps } from './PlayerClass';


export interface IPlayerClassGroupProps {
    title: string;
    open: boolean;
    position: number;
    playingClassId: string;
    classes: (Pick<IPlayerClassProps, 'done' | 'title'> & { classId: string })[];

    onToggle: () => void;
    onPlay: (classId: string) => void;
    onCheck: (classId: string) => void;
}
export const PlayerClassGroup = ({ classes, position, title, open, playingClassId, onToggle, onPlay, onCheck }: IPlayerClassGroupProps) => {
    return (
        <div className='flex flex-col overflow-hidden rounded-xl'>
            <button type='button' className='flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-paper-elevated active:opacity-80' onClick={onToggle}>
                <div className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background text-sm font-black text-primary'>
                    {position}
                </div>

                <div className='flex min-w-0 flex-1 flex-col items-start'>
                    <span className='font-bold text-start line-clamp-1'>{title}</span>
                    <span className='text-sm font-light text-start line-clamp-1'>
                        {classes.filter((classItem) => classItem.done).length}/{classes.length} aulas
                    </span>
                </div>

                {open
                    ? <MdKeyboardArrowDown size={28} />
                    : <MdKeyboardArrowRight size={28} />
                }
            </button>

            <ol data-open={open} className='ml-5 flex flex-col border-l border-border pl-2 data-[open=false]:hidden'>
                {classes.map(classItem => (
                    <li key={classItem.classId}>
                        <PlayerClass
                            {...classItem}

                            playing={classItem.classId === playingClassId}

                            onPlay={() => onPlay(classItem.classId)}
                            onCheck={() => onCheck(classItem.classId)}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
};
