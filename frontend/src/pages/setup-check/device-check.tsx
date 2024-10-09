
import Camera from '@/assets/images/camera.svg';
import Mic from '@/assets/images/mic.svg';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Description from "@/components/ui/description";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { CheckMark } from '@/components/custom-ui';
import { useStore } from '@/store';
import CrossMark from '@/components/custom-ui/cross-mark';
import { useEffect } from 'react';
import { UseHandleCancel } from '@/hooks';

type DeviceSectionProps = {
    heading: string;
    imgSrc: string;
    placeholder: string;
    enable: boolean
}

const DeviceCheck = () => {
    const { microphoneStatus, videoStatus, requestMediaPermissions, user, setStep, resetSteps } = useStore()
    const navigate = useNavigate();

    const nextPage = () => {
        setStep('interviewSetupCheck')
    };

    const handleCancel = () => {
        resetSteps()
        navigate(`/invitation/${user?.userId}`)
    }

    useEffect(() => { requestMediaPermissions() }, [requestMediaPermissions])

    return (
        <div className="flex-1 flex flex-col py-10 w-full mx-auto bg-white">
            <Heading type="h4" className="ml-0.5">Let’s check your setup</Heading>

            <div className="flex-grow space-y-8 py-8 w-8/12 ml-0.5">
                <DeviceSection
                    heading="Device camera"
                    imgSrc={Camera}
                    placeholder="FaceTime HD Camera (Built In)"
                    enable={videoStatus === 'granted'}
                />

                <DeviceSection
                    heading="Microphone"
                    imgSrc={Mic}
                    placeholder="Default-Macbook Pro"
                    enable={microphoneStatus === 'granted'}
                />

                <ConnectionStatus />
            </div>

            {/* Button area (fixed at the bottom due to flex-column layout) */}
            <ActionButtons handleCancel={handleCancel} nextPage={nextPage} />
        </div>
    );
};

const DeviceSection: React.FC<DeviceSectionProps> = ({ heading, imgSrc, placeholder, enable }) => (
    <div className="flex flex-col gap-2">
        <Heading type="h5" className="text-small font-semibold">{heading}</Heading>
        <div className="flex items-center justify-between gap-7">
            <Select>
                <SelectTrigger className="m-0 w-full">
                    <div className="flex items-center gap-3">
                        <img src={imgSrc} alt={`${heading} icon`} />
                        <SelectValue placeholder={placeholder} />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="facetime">{placeholder}</SelectItem>
                </SelectContent>
            </Select>
            {enable ? <CheckMark /> : <CrossMark />}
        </div>
        <Description variant="span" className="text-primaryGreen text-sm">Looks good !</Description>
    </div>
);

const ConnectionStatus = () => (
    <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <Heading type="h5" className="text-small font-semibold">Internet Connection</Heading>
            <Description variant="small" className="text-green-600">Looks good !</Description>
        </div>
        <CheckMark />
    </div>
);

const ActionButtons = ({ nextPage, handleCancel }: { nextPage: () => void, handleCancel: () => void; }) => (
    <div className="flex space-x-4 -mb-10 w-full px-4">
        <Button onClick={handleCancel} type="button" variant="outline" className="flex-1 rounded-sm h-12">Cancel</Button>
        <Button onClick={nextPage} type="submit" className="flex-1 rounded-sm h-12 bg-primary hover:bg-teal-700">Let's Start</Button>
    </div>
);

export default DeviceCheck;
