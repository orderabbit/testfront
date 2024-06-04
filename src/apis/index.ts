import axios, { AxiosResponse } from "axios";
import { PatchBoardRequestDto, PostBoardRequestDto } from "./request/board";
import { DeleteBoardResponseDto, GetBoardResponseDto, PatchBoardResponseDto, PostBoardResponseDto } from "./response/board";
import ResponseDto from "./response/response.dto";

const DOMAIN = 'http://localhost:4040';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const GET_BOARD_LIST_URL = () => `${API_DOMAIN}/boards`;
const POST_BOARD_URL = () => `${API_DOMAIN}/write/board`;
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/delete/board/${boardNumber}`;
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;

export const getBoardListRequest = async () => {
    const result = await axios.get(GET_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const postBoardRequest = async (requestBody: PostBoardRequestDto) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody)
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteBoardRequest = async (boardNumber: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(boardNumber))
        .then(response => {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.data;
            return responseBody;
        });
    return result;
};

export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto) => {
    const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody)
        .then(response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
};