import { Star, StepProgress } from "@/components/custom-ui";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Description from "@/components/ui/description";
import Heading from "@/components/ui/heading";
import LogoIconText from "@/assets/logo/logo-icon-text.svg";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { CongratulationsCard } from "@/components/cards";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThankYouDialog } from "@/components/dialogues";

// Define types

type CardContainerProps = {
    children: ReactNode;
    className?: string;
};

type RatingStarsProps = {
    starCount: number;
    ratingCount: number;
    setRating: (rating: number) => void
};

// ThankYouPage Component

const ThankYouPage = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = () => {
        if (!rating) {
            toast.error('Rating is required to submit your review')
            return;
        }

        setIsSubmitted(true)
    }

    return (
        <>
            <ThankYouDialog
                open={isSubmitted}
                close={setIsSubmitted}
                title="Thank you for submitting your review"
                description="lorem lorem lorem lorem lorem lorem"
            />
            <div className="w-full h-full bg-lightTeal py-14">
                <div className="w-10/12 mx-auto bg-white rounded-xl flex divide-gray-600 p-1">
                    <CardContainer className="w-[55%] border-r-2 border-input">
                        <PrimaryCongratulationCard />
                    </CardContainer>

                    <CardContainer className="w-[45%]">
                        <SecondaryCongratulationCard
                            setRating={setRating}
                            rating={rating}
                            setMessage={setMessage}
                            message={message}
                            onSubmit={onSubmit}
                        />
                    </CardContainer>
                </div>
            </div>
        </>
    );
};

// CardContainer Component

const CardContainer = ({ children, className = "" }: CardContainerProps) => (
    <div className={`h-auto ${className}`}>{children}</div>
);

// PrimaryCongratulationCard Component

const PrimaryCongratulationCard = () => (
    <Card className="border-0 shadow-none flex flex-col gap-6">
        <CardHeader>
            <CongratulationsCard />
        </CardHeader>
        <CardContent>
            <Description>Our team will get in touch with you.</Description>
        </CardContent>
        <CardFooter className="m-auto">
            <StepProgress completedSteps={1} className="my-10" />
        </CardFooter>
    </Card>
);

// SecondaryCongratulationCard Component

const SecondaryCongratulationCard = ({
    setRating,
    rating,
    onSubmit,
    setMessage,
    message
}: {
    setRating: (rating: number) => void,
    rating: number,
    onSubmit: () => void,
    setMessage: (message: string) => void,
    message: string
}) => {

    const [fakeLoading, setFakeLoading] = useState(false);

    const handleSubmitReview = () => {
        setFakeLoading(true);
        setTimeout(() => {
            onSubmit();
            setFakeLoading(false)
        }, 1000)
    }

    return (
        <Card className="border-0 shadow-none flex flex-col gap-6 text-center m-auto my-6 pb-6">
            <CardHeader>
                <img src={LogoIconText} className="h-10" alt="Logo Icon" />
            </CardHeader>

            <CardContent className="space-y-10">
                <CongratulationContent />
                <RatingStars starCount={5} ratingCount={rating} setRating={setRating} />
                <Textarea
                    value={message}
                    placeholder="Your Feedback is appreciated!"
                    className="w-10/12 mx-auto"
                    rows={4}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </CardContent>

            <CardFooter className="m-auto">
                <Button
                    disabled={fakeLoading}
                    className="w-32 h-11"
                    onClick={handleSubmitReview}>
                    {fakeLoading ? "Submitting ..." : "Submit"}
                </Button>
            </CardFooter>
        </Card>
    );
}

// CongratulationContent Component

const CongratulationContent = () => (
    <div className="space-y-3">
        <Heading type="h3" className="">You have finished your interview</Heading>
        <Description className="text-black text-base font-medium">
            Please share your interview experience
        </Description>
    </div>
);

// RatingStars Component

const RatingStars = ({ starCount, ratingCount, setRating }: RatingStarsProps) => (
    <ul className="flex gap-3 justify-center mx-auto">
        {Array.from({ length: starCount }, (_, i) => (
            <li key={i} onClick={() => setRating(i + 1)}>
                <Star fill={ratingCount > i} />
            </li>
        ))}
    </ul>
);

// CongratulationCard Component

export default ThankYouPage;
