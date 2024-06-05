import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardRequest, patchBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';

export default function Update() {
    const params = useParams();
    const boardNumber = Number(params["Number"]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [postRequest, setPostRequest] = useState<PostBoardRequestDto>({
        title: '',
        content: ''
    });

    useEffect(() => {
        const fetchBoardDetails = async () => {
            try {
                const response = await getBoardRequest(boardNumber);
                if ('title' in response && 'content' in response) {
                    const { title, content } = response;
                    setPostRequest({ title, content });
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
            const result = await patchBoardRequest(boardNumber, postRequest);
            if (result && result.code === 'SU') {
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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPostRequest({
            ...postRequest,
            [name]: value
        });
    };

    return (
        <div>
            <h2>게시물 수정하기</h2>
            <input
                type="text"
                name="title"
                placeholder="제목을 입력하세요"
                value={postRequest.title}
                onChange={handleInputChange}
            />
            <br />
            <textarea
                name="content"
                placeholder="내용을 입력하세요"
                value={postRequest.content}
                onChange={handleInputChange}
            />
            <br />
            <button onClick={updatePost}>게시물 수정</button>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};
