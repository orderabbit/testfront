import React, { ChangeEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useBoardStore from 'store/board.store';

export default function Write() {

    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();

    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();

    const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setTitle(value);

        if (!titleRef.current) return;
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    };

    const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);

        if (!contentRef.current) return;
        contentRef.current.style.height = 'auto';
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    };
    return (
        <div className='board-write-box'>
            <div className='board-write-title-box'>
                <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler} />
            </div>
            <div className='divider'></div>
            <div className='board-write-content-box'>
                <textarea ref={contentRef} className='board-write-content-textarea' placeholder='내용을 작성해주세요.' value={content} onChange={onContentChangeHandler} />
            </div>
        </div>

    )
}
