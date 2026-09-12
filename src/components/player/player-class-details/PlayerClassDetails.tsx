'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdComment, MdThumbUp, MdVisibility } from 'react-icons/md';
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { IPlayerVideoPlayerRef, PlayerVideoPlayer } from './components/PlayerVideoPlayer';
import { CourseHeaderLoading } from '@/components/course-header/CourseHeaderLoading';
import { IPlayerClassGroupProps } from '../playlist/components/PlayerClassGroup';
import { PlayerClassHeader } from './components/PlayerClassHeader';
import { LocalStorage } from '@/shared/services/local-storage';
import { ICommentProps } from './components/comments/Comment';
import { PlayerPlaylist } from '../playlist/PlayerPlaylist';
import { Comments } from './components/comments/Comments';

const CourseHeader = dynamic(
    () => import('@/components/course-header/CourseHeader').then(res => res.CourseHeader),
    { ssr: false, loading: CourseHeaderLoading },
);


interface IPlayerClassDetailsProps {
    course: {
        id: string;
        title: string;
        description: string;
        numberOfClasses: number;
        classGroups: Pick<IPlayerClassGroupProps, 'classes' | 'title'>[];
    };
    classItem: {
        id: string;
        title: string;
        videoId: string;
        viewsCount: number;
        likesCount: number;
        description: string;
        commentsCount: number;
    };
    comments: ICommentProps[];
}
export const PlayerClassDetails = ({ course, classItem, comments }: IPlayerClassDetailsProps) => {
    const router = useRouter();

    const playerVideoPlayerRef = useRef<IPlayerVideoPlayerRef>(null);

    const [currentTab, setCurrentTab] = useState('class-details');


    useEffect(() => {
        const matchMedia = window.matchMedia("(min-width: 768px)");

        const handleMatchMedia = (e: MediaQueryListEvent) => {
            if (e.matches && currentTab === 'course-playlist') {
                setCurrentTab('class-details');
            }
        };

        matchMedia.addEventListener('change', handleMatchMedia);
        return () => matchMedia.removeEventListener('change', handleMatchMedia);
    }, [currentTab]);

    useEffect(() => {
        LocalStorage.keepWatching.set({
            classId: classItem.id,
            courseId: course.id,
            className: classItem.title,
            courseName: course.title,
        });
    }, [course.id, course.title, classItem.id, classItem.title]);


    const nextClassId = useMemo(() => {
        const classes = course.classGroups.flatMap(classGroup => classGroup.classes);

        const currentClassIndex = classes.findIndex(({ classId }) => classId === classItem.id);

        const nextClassIndex = currentClassIndex + 1;

        if (nextClassIndex === classes.length) {
            return undefined;
        }

        return classes[nextClassIndex].classId;
    }, [course.classGroups, classItem.id]);


    const handlePlayerNext = useCallback(() => {
        if (!nextClassId) return;

        LocalStorage.watchedContent.toggle(course.id, classItem.id, 'add');
        router.push(`/player/${course.id}/${nextClassId}`);
    }, [course.id, classItem.id, nextClassId, router]);


    return (
        <div className='min-w-0 flex-1 overflow-auto pb-12'>
            <div className='mx-auto w-full max-w-6xl lg:px-6 lg:pt-6'>
            <div className='aspect-video'>
                <PlayerVideoPlayer
                    ref={playerVideoPlayerRef}
                    videoId={classItem.videoId}
                    onPlayNext={handlePlayerNext}
                />
            </div>

            <div className='flex flex-wrap gap-2 px-4 py-4 text-sm text-text-muted lg:px-0'>
                <div className='flex items-center gap-1.5 rounded-full border border-border bg-paper px-3 py-1.5'>
                    <MdVisibility />
                    <span>{classItem.viewsCount}</span>
                    <span>visualizações</span>
                </div>
                <a className='flex items-center gap-1.5 rounded-full border border-border bg-paper px-3 py-1.5 transition hover:border-primary/40 hover:text-primary hover:no-underline' target='_blank' rel='noreferrer' href={`https://www.youtube.com/watch?v=${classItem.videoId}`}>
                    <MdThumbUp />
                    <span>{classItem.likesCount}</span>
                    <span>curtidas</span>
                </a>
                <div className='flex items-center gap-1.5 rounded-full border border-border bg-paper px-3 py-1.5'>
                    <MdComment />
                    <span>{classItem.commentsCount}</span>
                    <span>comentários</span>
                </div>
            </div>

            <Tabs.Root value={currentTab} onValueChange={value => setCurrentTab(value)} className='px-4 lg:px-0'>
                <Tabs.List className='flex gap-1 overflow-x-auto rounded-xl border border-border bg-paper p-1'>
                    <Tabs.Trigger
                        value='class-details'
                        className='shrink-0 rounded-lg px-4 py-2.5 text-sm font-extrabold text-text-muted transition hover:text-text data-[state=active]:bg-paper-elevated data-[state=active]:text-primary'
                    >
                        Visão geral
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value='course-playlist'
                        className='shrink-0 rounded-lg px-4 py-2.5 text-sm font-extrabold text-text-muted transition hover:text-text data-[state=active]:bg-paper-elevated data-[state=active]:text-primary md:hidden'
                    >
                        Conteúdo do curso
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value='class-comments'
                        className='shrink-0 rounded-lg px-4 py-2.5 text-sm font-extrabold text-text-muted transition hover:text-text data-[state=active]:bg-paper-elevated data-[state=active]:text-primary'
                    >
                        Comentários
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value='course-details'
                        className='shrink-0 rounded-lg px-4 py-2.5 text-sm font-extrabold text-text-muted transition hover:text-text data-[state=active]:bg-paper-elevated data-[state=active]:text-primary'
                    >
                        Visão geral do curso
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value='class-details' className='pt-7'>
                    <PlayerClassHeader
                        title={classItem.title}
                        description={classItem.description}
                        onTimeClick={seconds => playerVideoPlayerRef.current?.setProgress(seconds)}
                    />
                </Tabs.Content>
                <Tabs.Content value='course-playlist' className='pt-5'>
                    <PlayerPlaylist
                        playingCourseId={course.id}
                        playingClassId={classItem.id}
                        classGroups={course.classGroups}
                    />
                </Tabs.Content>
                <Tabs.Content value='class-comments' className='pt-7'>
                    <Comments
                        comments={comments}
                    />
                </Tabs.Content>
                <Tabs.Content value='course-details' className='pt-7'>
                    <CourseHeader
                        title={course.title}
                        description={course.description}
                        numberOfClasses={course.numberOfClasses}
                    />
                </Tabs.Content>
            </Tabs.Root>
            </div>
        </div>
    );
};
