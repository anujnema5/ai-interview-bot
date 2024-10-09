import SoundWaveBoxIcon from '@/assets/images/sound-wave-box.svg';

const QuestionCard = ({ question }: { question: string }) => {
    return (
        <div className="bg-teal-50 shadow-md rounded-2xl w-full px-8 py-6 space-y-6 transition-transform hover:scale-105 duration-300">
            <div className="flex items-center space-x-4">
                <img src={SoundWaveBoxIcon} alt="Sound Wave Box Icon" />
                <p className="text-lg font-semibold text-primary leading-6">
                    {question}
                </p>
            </div>
        </div>
    );
}

export default QuestionCard;