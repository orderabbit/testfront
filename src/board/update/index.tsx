import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardRequest, patchBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';
import useBoardStore from 'store/board.store';

export default function Update() {
    const params = useParams();
    const boardNumber = Number(params["Number"]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();

    useEffect(() => {
        const fetchBoardDetails = async () => {
            try {
                const response = await getBoardRequest(boardNumber);
                if (response.code === 'SU') {
                    setTitle(response.title);
                    setContent(response.content);
                } else {
                    alert('게시물 정보를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('게시물 정보를 불러오는 중 오류가 발생했습니다:', error);
                alert('게시물 정보를 불러오는 중 오류가 발생했습니다.');
            }
        };
        fetchBoardDetails();
    }, []);

    const updatePost = async () => {
        try {
            const postRequest: PostBoardRequestDto = { title, content };

            const result = await patchBoardRequest(boardNumber, postRequest);
            if(!result) return;
            if (result.code === 'SU') {
                alert('게시물 수정 완료');
                navigate('/');
            } else {
                setErrorMessage('게시물 수정 실패');
            }
        } catch (error) {
            console.error('게시물 수정 중 오류가 발생했습니다:', error);
            setErrorMessage('게시물 수정 중 오류가 발생했습니다');
        }
    };

    const handleTitleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setTitle(value);
    };

    const handleContentInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);
    };

    return (
        <div>
            <h2>게시물 수정하기</h2>
            <textarea
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleInputChange}
            />
            <br />
            <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={handleContentInputChange}
            />
            <br />
            <button onClick={updatePost}>게시물 수정</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};
