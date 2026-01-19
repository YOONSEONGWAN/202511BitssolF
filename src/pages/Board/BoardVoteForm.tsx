import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createBoard, getBoardDetail, updateBoard } from '../../api/boardApi'
import BottomNav from '../../components/layout/BottomNav'
import type { BoardFormData } from '../../types/board'
import './Board.css'

// 🔹 임시 파싱용 타입 (voteOptions 구조 불확실 대응)
type RawVoteOption = {
  text?: string
  optionText?: string
  content?: string
}


function BoardVoteForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<BoardFormData>({
    title: '',
    content: '',
    category: 'vote',
    imageUrl: '',
    voteOptionTexts: [],
  })

  const [voteOptions, setVoteOptions] = useState<string[]>(['', ''])


  // ✅ 수정일 경우 기존 데이터 로드 (안전 처리 적용)
  useEffect(() => {
    if (!isEdit) return

    const loadBoard = async () => {
      try {
        const data = await getBoardDetail(Number(id))

        // 🔥 핵심: voteOptions 구조 안전하게 파싱
        const parsedVoteOptions: string[] = Array.isArray(data.voteOptions)
          ? data.voteOptions.map((v: RawVoteOption) =>
            v.text ?? v.optionText ?? v.content ?? ''
          )
          : []


        setFormData({
          title: data.title ?? '',
          content: data.content ?? '',
          category: 'vote',
          imageUrl: data.imageUrl ?? '',
          voteOptionTexts: parsedVoteOptions,
        })

        setVoteOptions(
          parsedVoteOptions.length >= 2 ? parsedVoteOptions : ['', '']
        )
      } catch {
        alert('투표 정보를 불러오는데 실패했습니다.')
        navigate('/board')
      }
    }

    loadBoard()
  }, [id, isEdit, navigate])

  const addVoteOption = () => {
    setVoteOptions([...voteOptions, ''])
  }

  const removeVoteOption = (index: number) => {
    if (voteOptions.length <= 2) {
      alert('투표 항목은 최소 2개 이상이어야 합니다.')
      return
    }
    setVoteOptions(voteOptions.filter((_, i) => i !== index))
  }

  const updateVoteOption = (index: number, value: string) => {
    const newOptions = [...voteOptions]
    newOptions[index] = value
    setVoteOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    if (voteOptions.filter(v => v.trim()).length < 2) {
      alert('투표 항목을 최소 2개 이상 입력해주세요.')
      return
    }

    const submitData: BoardFormData = {
      ...formData,
      voteOptionTexts: voteOptions.filter(v => v.trim()),
    }

    setIsLoading(true)
    try {
      if (isEdit) {
        await updateBoard(Number(id), submitData)
        alert('투표가 수정되었습니다.')
        navigate(`/board/${id}`)
      } else {
        const newBoard = await createBoard(submitData)
        alert('투표가 등록되었습니다.')
        navigate(`/board/${newBoard.boardId}`)
      }
    } catch {
      alert(isEdit ? '투표 수정에 실패했습니다.' : '투표 등록에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="home-screen">
      <div className="board-header">
        <button className="board-header__back-btn" onClick={() => navigate(-1)}>
          ← 취소
        </button>
        <h1 className="board-header__title">
          {isEdit ? '투표 수정' : '투표 작성'}
        </h1>
      </div>

      <main className="home-screen__content">
        <div className="bottom-panel">
          <div className="bottom-panel__content">
            <form className="board-form" onSubmit={handleSubmit}>
              {/* 제목 */}
              <div className="board-form__group">
                <label className="board-form__label">제목</label>
                <input
                  type="text"
                  className="board-form__input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              {/* 설명 */}
              <div className="board-form__group">
                <label className="board-form__label">설명</label>
                <textarea
                  className="board-form__textarea"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={5}
                  disabled={isLoading}
                />
              </div>

              {/* 투표 항목 */}
              <div className="board-form__group">
                <label className="board-form__label">투표 항목</label>
                {voteOptions.map((option, index) => (
                  <div key={index} className="board-form__vote-option">
                    <input
                      type="text"
                      className="board-form__input"
                      value={option}
                      onChange={(e) =>
                        updateVoteOption(index, e.target.value)
                      }
                      disabled={isLoading}
                    />
                    {voteOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeVoteOption(index)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addVoteOption}>
                  + 항목 추가
                </button>
              </div>

              <div className="board-form__actions">
                <button type="submit" disabled={isLoading}>
                  {isEdit ? '투표 수정' : '투표 등록'}
                </button>
              </div>
            </form>
          </div>
          <BottomNav />
        </div>
      </main>
    </div>
  )
}

export default BoardVoteForm
