import BoardListItem from "interface/board-list.interface";
import ResponseDto from "../response.dto";

export default interface GetBoardResponseDto extends ResponseDto{
    latestList: BoardListItem[];
}