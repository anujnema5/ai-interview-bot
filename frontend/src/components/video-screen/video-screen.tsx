import clsx from 'clsx';
import Description from '../ui/description';

const videoSetupTip = "Ensure good lighting and a tidy background.";

type TipProps = {
    tip: string;
};


const VideoScreen = ({ stream }: { stream: MediaStream | null }) => {
    return (
        <div className="divide-y-8 divide-transparent">
            <VideoContainer stream={stream} />
            <Tip tip={videoSetupTip} />
        </div>
    );
};


export const VideoContainer = ({ stream, className }: { stream: MediaStream | null, className?: string }) => (
    <div className={clsx(className, 'w-[50rem] h-96 bg-gray-200 rounded-xl border-gray-300')}>
        <video
            className="w-full h-full rounded-xl"
            autoPlay
            muted
            ref={(videoElement) => {
                if (videoElement) {
                    if (stream instanceof MediaStream) {
                        videoElement.srcObject = stream;
                    } else {
                        console.error("Invalid stream type or stream is null.");
                    }
                }
            }}
        />
    </div>
);


const Tip = ({ tip }: TipProps) => (
    <Description variant='p' className='flex items-center justify-center gap-1'>
        Tip: <Description variant='span'>{tip}</Description>
    </Description>
);

export default VideoScreen;
