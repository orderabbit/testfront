import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import ResponseDto from 'apis/response/response.dto';

import React, { ChangeEvent, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useBoardStore from 'store/board.store';
import { patchBoardRequest, postBoardRequest } from 'apis';
import { WRITE_PATH, DETAIL_PATH } from 'constants/index';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';

export default function Write() {

    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    const navigate = useNavigate();

    const { pathname } = useLocation();
    const { title, setTitle } = useBoardStore();
    const { content, setContent, resetBoard } = useBoardStore();
    const params = useParams();
    const boardNumber = Number(params["Number"]);

    const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'VF') alert('모두 입력하세요.');
        if (code !== 'SU') return;

        if (!boardNumber) return;
        navigate(DETAIL_PATH(boardNumber));
    }

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
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'VF') alert('모두 입력하세요.');
        if (code !== 'SU') return;
        resetBoard();
    }

    const onUploadButtonClickHandler = async () => {

        const isWritePage = pathname === WRITE_PATH();
        if (isWritePage) {
            const requestBody: PostBoardRequestDto = { title, content }
            postBoardRequest(requestBody).then(postBoardResponse);
        } else {
            if (!boardNumber) {
                alert('존재하지 않는 번호입니다.');
            } else {
                const requestBody: PatchBoardRequestDto = { title, content }
                patchBoardRequest(boardNumber, requestBody).then(patchBoardResponse);
            }
        }
    }
    if (title && content)
        return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;

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

