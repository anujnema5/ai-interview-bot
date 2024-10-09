import Cross from '@/assets/images/cross.svg';
import clsx from 'clsx';

const CrossMark = ({
    className,
    checkIconClassName,
    showCheck = true
}: {
    className?: string,
    checkIconClassName?: string,
    showCheck?: boolean
}) => (

    <div className={clsx("bg-lightRed p-2.5 rounded-full flex-shrink-0 ", className)}>
        {showCheck &&
            <img
                src={Cross}
                className={clsx("w-4 h-4 ", checkIconClassName)}
                alt="CrossMark"
            />}
    </div>
);

export default CrossMark;