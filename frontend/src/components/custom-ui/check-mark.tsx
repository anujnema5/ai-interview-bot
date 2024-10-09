import Check from '@/assets/images/check.svg';
import clsx from 'clsx';

const Checkmark = ({
    className,
    checkIconClassName,
    showCheck = true
}: {
    className?: string,
    checkIconClassName?: string,
    showCheck?: boolean
}) => (

    <div className={clsx("bg-lightGreen p-2.5 rounded-full flex-shrink-0 ", className)}>
        {showCheck &&
            <img
                src={Check}
                className={clsx("w-4 h-4 ", checkIconClassName)}
                alt="Checkmark"
            />}
    </div>
);

export default Checkmark;