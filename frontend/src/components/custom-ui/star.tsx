import React from 'react';

interface StarProps {
    fill?: boolean; // Optional prop to decide if the star should be golden
}

const Star: React.FC<StarProps> = ({ fill = false }) => {
    return (
        <svg
            width="36"
            height="34"
            viewBox="0 0 36 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.5272 0.562432L22.3154 12.2847H34.6665C35.4557 12.2847 35.8109 13.3109 35.14 13.7845L25.1565 21.0468L28.9842 32.7691C29.221 33.519 28.3528 34.1505 27.7215 33.6768L17.738 26.454L7.75445 33.7163C7.12308 34.1899 6.21549 33.5584 6.49171 32.8085L10.3194 21.0863L0.335871 13.824C-0.295498 13.3504 0.0201864 12.3242 0.809397 12.3242H13.1605L16.9487 0.562432C17.1855 -0.187477 18.2904 -0.187477 18.5272 0.562432Z"
                fill={fill ? "#FFD700" : "#CBD3E3"} // Golden if fill is true, otherwise default color
            />
        </svg>
    );
};

export default Star;
