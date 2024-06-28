import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoardRequest } from 'apis';

export default function Write() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const uploadPostClickHandler = async () => {
        try {
            const result = await postBoardRequest({ title, content });
            if (result && result.code === 'SU') {
                alert('게시물이 업로드되었습니다.');
                navigate('/');
            } else {
                alert('게시물 업로드 실패');
            }
        } catch (error) {
            console.error('게시물 업로드 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div>
            <h2>게시물 작성하기</h2>
            <textarea
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
            />
            <br />
            <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={handleContentChange}
            />
            <br />
            <button onClick={uploadPostClickHandler}>게시물 업로드</button>
        </div>
    );
};
