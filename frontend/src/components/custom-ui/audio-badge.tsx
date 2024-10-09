import SoundWaveIcon from '@/assets/images/sound-wave.svg';

const AudioBadge = () => {
    return (
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
            <img src={SoundWaveIcon} alt="Sound Wave Icon" className="w-4 h-4" />
        </div>
    )
}

export default AudioBadge