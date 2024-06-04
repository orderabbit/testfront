
import { getBoardListRequest } from 'apis';
import { GetBoardResponseDto } from 'apis/response/board';
import ResponseDto from 'apis/response/response.dto';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface BoardItemProps {
  boardListItem: {
    itemNumber: number;
    title: string;
    content: string;
  }
}
const Home = ({ boardListItem }: BoardItemProps) => {

  const [boardList, setBoardList] = useState<BoardItemProps[]>([]);
  const { itemNumber, title, content } = boardListItem;
  const navigator = useNavigate();


  const getBoardListResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    const { latestList } = responseBody as GetBoardResponseDto;
    // setBoardList(latestList);
  }

  const writeBoardClickHandler = () => {
    navigator('/write/board');
  }

useEffect(() => {
  getBoardListRequest().then(getBoardListResponse)
}, [])

return (
  <div className='main-contents-box'>
    <button onClick={writeBoardClickHandler}></button>
    <div className='main-current-contents'>
      <div className='main-contents-card' onClick={() => navigator(`/board/${itemNumber}`)}>
        <div className='main-contents-card-title'>{title}</div>
        <div className='main-contents-card-content'>{content}</div>
      </div>
    </div>
  </div>
)
}

export default Home
