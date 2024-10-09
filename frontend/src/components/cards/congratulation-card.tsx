import { CheckMark } from "../custom-ui";
import Heading from "../ui/heading";
import Description from "../ui/description";

const CongratulationCard = () => (
    <div className="bg-lightTeal p-5 rounded-xl flex gap-7 items-center">
        <CheckMark
            className="w-20 h-20 flex items-center justify-center bg-white border-[3px] border-primaryGreen"
            checkIconClassName="h-full w-8"
        />
        <div className="space-y-1">
            <Heading type="h5" className="font-bold">
                Congratulations
            </Heading>
            <Description>Your interview answers have been sent through.</Description>
        </div>
    </div>
);
export default CongratulationCard