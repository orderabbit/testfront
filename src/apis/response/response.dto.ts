import Board from "interface/board.interface";
import { ResponseCode, ResponseMessage } from "types/enums";

export default interface ResponseDto{
    boards: Board[];
    code: ResponseCode;
    message: ResponseMessage;
    success: boolean;
    status: string;
    data: any;
}