const InterviewLayout = ({ children }) => {
    return (
        <div className="flex flex-col items-center w-full h-full bg-gray-50 border">
            <div className="flex flex-col w-[90%] h-[100%] px-8 py-12 justify-between rounded-2xl">
                {children}
            </div>
        </div>
    );
};

export default InterviewLayout;
