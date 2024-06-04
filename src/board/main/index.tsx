
import { getAllBoardRequest } from 'apis';
import Board from 'interface/board.interface';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigator = useNavigate();
  const [posts, setPosts] = useState<Board[]>([]);

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

  console.log("1221212121212121")
  return (
    <div className='main-contents-box'>
      <h2>게시물</h2>
      <button onClick={writePathClickHandler}>작성하기</button>
      <div className='main-current-contents'>
        {posts.map(post => (
          <li key={post.boardNumber}>
            <div onClick={() => navigator(`/board/${post.boardNumber}`)}>{post.title}</div>
            <div>{post.content}</div>
          </li>
        ))}
      </div>
    </div>
  )
}
