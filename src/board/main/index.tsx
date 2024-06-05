
import { deleteBoardRequest, getAllBoardRequest } from 'apis';
import { DeleteBoardResponseDto } from 'apis/response/board';
import ResponseDto from 'apis/response/response.dto';
import { UPDATE_PATH } from 'constants';
import Board from 'interface/board.interface';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Home() {

  const {boardNumber} = useParams();
  const navigator = useNavigate();
  const [posts, setPosts] = useState<Board[]>([]);
  const [deletingBoardNumber, setDeletingBoardNumber] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllBoardRequest();
        if (!result) return;
        const { code, boards } = result;
        if (code === 'DBE') {
          alert('데이터베이스 오류입니다.');
          return;
        }
        if (code !== 'SU') return;
        setPosts(boards);
      } catch (error) {
        console.error('게시물 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPosts();
  }, []);

  const writePathClickHandler = () => {
    navigator('/write');
  }

  const deletePostClickHandler = (boardNumber: number | string) => {
    if(!boardNumber) {
      alert('게시물 번호가 없습니다.');
      return;
    };
    deleteBoardRequest(boardNumber).then(deleteBoardResponse);
  }

  const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
    if (responseBody && responseBody.code === 'SU') {
      alert('삭제되었습니다.');
      setPosts(posts.filter(post => post.boardNumber !== deletingBoardNumber));
    } else {
      alert('삭제 실패');
    }
    setDeletingBoardNumber(null);
  }

  const updatePostClickHandler = (boardNumber: number | string) => {
    console.log(boardNumber);
    navigator(UPDATE_PATH(boardNumber));
  }

  console.log(posts);
  return (
    <div className='main-contents-box'>
      <h2>게시물</h2>
      <button onClick={writePathClickHandler}>작성하기</button>
      <div className='main-current-contents'>
        {posts.map(post => (
          <li key={post.boardNumber}>
            <div onClick={() => navigator(`/board/${post.boardNumber}`)}>{post.title}</div>
            <div>{post.content}</div>
            <button onClick={() => deletePostClickHandler(post.boardNumber)}>삭제</button>
            <button onClick={() => updatePostClickHandler(post.boardNumber)}>수정</button>
          </li>
        ))}
      </div>
    </div>
  )
}
