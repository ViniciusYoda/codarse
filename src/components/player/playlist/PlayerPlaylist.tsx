'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { IPlayerClassGroupProps, PlayerClassGroup } from './components/PlayerClassGroup';
import { LocalStorage } from '@/shared/services/local-storage';

interface IPlayerPlaylistProps {
    playingClassId: string;
    playingCourseId: string;
    classGroups: Pick<IPlayerClassGroupProps, 'classes' | 'title'>[];
}

export const PlayerPlaylist = ({ classGroups, playingClassId, playingCourseId }: IPlayerPlaylistProps) => {
    const router = useRouter();

    const [watchedContentIds, setWatchedContentIds] = useState<string[]>([]);
    const [openedIndex, setOpenedIndex] = useState<number | undefined>(
        classGroups.findIndex((classGroup) => classGroup.classes.some(classItem => classItem.classId === playingClassId))
    );

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const watchedContent = LocalStorage.watchedContent.get(playingCourseId);
            setWatchedContentIds(watchedContent ?? []);
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, [playingCourseId]);

    const classGroupsWithDone = useMemo(() => {
        return classGroups.map(classGroup => ({
            ...classGroup,
            classes: classGroup.classes.map(classItem => ({
                ...classItem,
                done: watchedContentIds.includes(classItem.classId),
            })),
        }));
    }, [classGroups, watchedContentIds]);

    const handleCheck = useCallback((classId: string) => {
        const newWatchedContent = LocalStorage.watchedContent.toggle(playingCourseId, classId);
        if (!newWatchedContent) return;

        setWatchedContentIds(newWatchedContent);
    }, [playingCourseId]);

    return (
        <div className='flex h-full flex-col'>
            <div className='flex flex-col gap-1 border-b border-border p-5'>
                <span className='text-xs font-extrabold uppercase tracking-[0.16em] text-primary'>Sua trilha</span>
                <h3 className='text-lg font-black'>
                    Conteudo do curso
                </h3>
            </div>

            <ol className='overflow-primary min-h-0 flex-1 overflow-auto p-2'>
                {classGroupsWithDone.map((classGroup, index) => (
                    <li key={classGroup.classes[0]?.classId ?? `${classGroup.title}-${index}`}>
                        <PlayerClassGroup
                            {...classGroup}

                            playingClassId={playingClassId}

                            position={index + 1}
                            open={openedIndex === index}
                            onToggle={() => setOpenedIndex(openedIndex === index ? undefined : index)}

                            onCheck={handleCheck}
                            onPlay={(classId) => router.push(`/player/${playingCourseId}/${classId}`)}
                        />
                    </li>
                ))}
            </ol>
        </div>
    )
}
