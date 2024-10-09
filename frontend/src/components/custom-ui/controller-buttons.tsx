import { Button } from "@/components/ui/button";

const ControlButtons = ({ onFinish }) => {
    return (
        <div className="flex justify-between items-center">
            <Button
                type="button"
                variant="outline"
                className="w-40 h-12 text-gray-600 hover:bg-gray-100 transition-all duration-300"
            >
                Next Question
            </Button>

            <div className="flex items-center gap-6">
                <Button
                    variant="outline"
                    className="w-40 h-12 transition-all duration-300"
                >
                    Cancel
                </Button>

                <Button
                    onClick={onFinish}
                    type="submit"
                    className="w-40 h-12 text-white shadow-md transition-all duration-300"
                >
                    Finish Interview
                </Button>
            </div>
        </div>
    );
};

export default ControlButtons;
