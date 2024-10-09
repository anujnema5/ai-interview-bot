import React from 'react';
import clsx from 'clsx';

type DescriptionProps = {
    variant?: 'p' | 'small' | 'span';
    children: React.ReactNode;
    className?: string;
};

const Description: React.FC<DescriptionProps> = ({ variant, children, className }) => {
    const defaultColor = "text-muted"; 
    
    const renderDescription = () => {
        const isCustomColorProvided = className && className.match(/text-(\w+)-(\d+)/);         
        switch (variant) {
            case 'p':
                return <p className={clsx("text-base font-medium", !isCustomColorProvided && defaultColor, className)}>{children}</p>;
            case 'small':
                return <small className={clsx("text-sm font-semibold", !isCustomColorProvided && defaultColor, className)}>{children}</small>;
            case 'span':
                return <span className={clsx("text-sm font-semibold", !isCustomColorProvided && defaultColor, className)}>{children}</span>;
            default:
                return <p className={clsx("text-base", !isCustomColorProvided && defaultColor, className)}>{children}</p>; // default to 'p'
        }
    };

    return <>{renderDescription()}</>;
};

export default Description;
