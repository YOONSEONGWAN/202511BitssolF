// 게시판 API 통신 함수

import { API_BASE_URL, getHeaders, handleApiError } from './config'
import type { Board, BoardListResponse, BoardFormData } from '../types/board'

// 게시글 목록 조회
export const getBoardList = async (
    category: string = 'all',
    pageNum: number = 1,
    pageSize: number = 10
): Promise<BoardListResponse> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/board?category=${category}&pageNum=${pageNum}&pageSize=${pageSize}`,
            {
                method: 'GET',
                headers: getHeaders(),
            }
        )
        if (!response.ok) throw new Error('게시글 목록 조회 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 게시글 상세 조회
export const getBoardDetail = async (id: number): Promise<Board> => {
    try {
        const response = await fetch(`${API_BASE_URL}/board/${id}`, {
            method: 'GET',
            headers: getHeaders(),
        })
        if (!response.ok) throw new Error('게시글 조회 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 게시글 작성
export const createBoard = async (data: BoardFormData): Promise<Board> => {
    try {
        const response = await fetch(`${API_BASE_URL}/board`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('게시글 작성 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 게시글 수정
export const updateBoard = async (id: number, data: BoardFormData): Promise<Board> => {
    try {
        const response = await fetch(`${API_BASE_URL}/board/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('게시글 수정 실패')
        return await response.json()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}

// 게시글 삭제
export const deleteBoard = async (id: number): Promise<string> => {
    try {
        const response = await fetch(`${API_BASE_URL}/board/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        })
        if (!response.ok) throw new Error('게시글 삭제 실패')
        return await response.text()
    } catch (error) {
        handleApiError(error)
        throw error
    }
}