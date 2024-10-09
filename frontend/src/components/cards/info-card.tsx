import React from 'react';
import Description from "../ui/description";
import Heading from "../ui/heading";
import ClockIcon from '@/assets/images/clock.svg';

type InfoCardProps = {
    headingText?: string;
    testDuration?: number;
    content?: string | JSX.Element;
}

const InfoCard: React.FC<InfoCardProps> = ({ headingText, testDuration, content }) => {
    return (
        <div className="flex flex-col gap-7">
            <div className="header flex justify-between items-start">
                <Heading type="h2">{headingText}</Heading>

                <div className="flex items-center gap-2 justify-center">
                    <img src={ClockIcon} alt="clock-icon" className="w-5 h-5" />
                    <Description variant="span">{`${testDuration} Mins`}</Description>
                </div>
            </div>

            {typeof content === 'string' ? 
                <Description variant="span">{content}</Description> : content}
        </div>
    );
}

export default InfoCard;
