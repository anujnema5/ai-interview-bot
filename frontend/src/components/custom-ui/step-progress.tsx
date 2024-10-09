import clsx from "clsx";
import Checkmark from "./check-mark";

type StepProgressProps = {
    totalSteps?: number;
    completedSteps: number;
    finished?: boolean;
    className?: string
}

const StepProgress: React.FC<StepProgressProps> = ({
    totalSteps = 3,
    completedSteps = 0,
    finished = false,
    className
}) => {
    return (
        <ul className={clsx("flex items-center ", className)}>

            {Array.from({ length: totalSteps }, (_, i) => (
                <li key={i} className="flex items-center">
                    <Checkmark
                        showCheck={finished || i < completedSteps}
                        className={`w-10 h-10 flex items-center justify-center ${finished || i < completedSteps ? "bg-green-500" : "bg-white border"
                            }`}
                    />
                    {i < totalSteps - 1 && (
                        <span className="w-10 border-dashed border  mx-2"></span>
                    )}
                </li>
            ))}

        </ul>
    );
};

export default StepProgress;