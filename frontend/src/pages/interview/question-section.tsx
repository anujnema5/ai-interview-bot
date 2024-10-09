import QuestionCard from "@/components/cards/question-card";

const QuestionSection = ({ question }) => {
    return (
        <div className="flex justify-center items-center py-4 w-full">
            <QuestionCard question={question} />
        </div>
    );
};

export default QuestionSection;
