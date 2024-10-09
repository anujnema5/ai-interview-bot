import { VideoCard } from "@/components/cards";
import { CustomAvatar } from "@/components/custom-ui";
import botVideo from "@/assets/bot.mp4";
import SoundWaveIcon from "@/assets/images/sound-wave.svg";

const VideoSection = ({ videoRef }) => {
    return (
        <div className="grid grid-cols-2 gap-8 h-[50%]">
            <VideoCard
                videoSrc={botVideo}
                badgeContent={<CustomAvatar fallbackText="A" />}
                badgeLabel="Alex"
            />
            <VideoCard
                videoRef={videoRef}
                badgeContent={
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                        <img src={SoundWaveIcon} alt="Sound Wave Icon" className="w-4 h-4" />
                    </div>
                }
                badgeLabel="You"
            />
        </div>
    );
};

export default VideoSection;
