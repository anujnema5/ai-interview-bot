import clsx from 'clsx';
import React from 'react';

type HeadingProps = {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    children: React.ReactNode;
    className?: string;
};

const Heading: React.FC<HeadingProps> = ({ type, children, className }) => {
    const baseClasses = "font-semibold"; // Common class for all headings

    const headingClasses = clsx(baseClasses, className); // Combine base and additional classes

    switch (type) {
        case 'h1':
            return <h1 className={clsx("text-4xl", headingClasses)}>{children}</h1>;
        case 'h2':
            return <h2 className={clsx("text-3xl", headingClasses)}>{children}</h2>;
        case 'h3':
            return <h3 className={clsx("text-2xl",  headingClasses)}>{children}</h3>;
        case 'h4':
            return <h4 className={clsx("text-xl", headingClasses)}>{children}</h4>;
        case 'h5':
            return <h5 className={clsx("text-lg", headingClasses)}>{children}</h5>;
        default:
            return <h2 className={clsx("text-3xl", headingClasses)}>{children}</h2>; // default to h2
    }
};

export default Heading;
