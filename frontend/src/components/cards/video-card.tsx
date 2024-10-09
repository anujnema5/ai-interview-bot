import Description from "@/components/ui/description";
import { Badge } from "@/components/ui/badge";
import React from "react";


type TVideoCard = {
    badgeContent: string | JSX.Element;
    badgeLabel: string;
    videoRef?: any;
    videoSrc?: any;
}

const VideoCard: React.FC<TVideoCard> = ({ badgeContent, badgeLabel, videoRef, videoSrc }) => {
    return (
        <div className="relative bg-gray-100 shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="h-80 w-full flex items-center justify-center  rounded-2xl">
                <video
                    className="w-full h-full rounded-xl "
                    autoPlay
                    muted
                    ref={videoRef}
                    src={videoSrc}
                />
            </div>
            <div className="absolute top-4 left-4">
                <Badge variant="outline" className="bg-black/50 pr-5 py-2 rounded-full flex items-center gap-3">
                    {badgeContent}
                    <Description variant="span" className="text-white">{badgeLabel}</Description>
                </Badge>
            </div>
        </div>
    );
}

export default VideoCard;