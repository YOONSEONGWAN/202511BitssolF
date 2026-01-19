import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../hooks/usePlayer';

function Player() {
    const { currentSound, isPlaying, togglePlayPause, stopSound, currentTime, duration } = usePlayer();
    const navigate = useNavigate();

    // 미니 플레이어 클릭 시 SoundPlayer 페이지로 이동
    const handlePlayerClick = () => {
        navigate('/soundplayer');
    };

    // 버튼 클릭 시 이벤트 전파 방지
    const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        action();
    };
    

    // 재생 중인 소리가 없으면 아무것도 렌더링하지 않음
    if (!currentSound) {
        return null;
    }

    // 진행률 계산 (0~100%)
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="player-container" onClick={handlePlayerClick} style={{ cursor: 'pointer' }}>
            <img src={currentSound.thumbnailUrl} alt={currentSound.title} />
            <div className="sound-info">
                <h4>{currentSound.title}</h4>
                <p>{currentSound.uploader}</p>
            </div>
            <button onClick={(e) => handleButtonClick(e, togglePlayPause)}>
                {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={(e) => handleButtonClick(e, stopSound)} className="close-btn">
                ✕
            </button>
        {/* 미니 재생바 */}
        <div className="mini-progress-bar">
            <div className="mini-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        </div>
    );
}

export default Player;