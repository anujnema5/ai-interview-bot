import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import IdeaBulbIcon from '@/assets/images/idea-bulb.svg'
import React from "react";
import Description from "../ui/description";

const tips: string[] = [
    "Find a quiet, bright spot where you'll shine.",
    "Wear what makes you feel ready and confident.",
    "Double-check your camera and mic just to be sure.",
    "Take a deep breath: it's just a chat, and we're excited to meet you.",
    "Looking into the camera feels more connected.",
    "Take a moment with each question: listen and reflect.",
    "It's okay to have a cheat sheet nearby.",
    "Remember, this is as much your moment as ours.",
    "A simple 'thank you' leaves a lasting impression."
];


type TTipsCard = {
    title?: string;
    text?: string;
    tips?: string[];
    message?: string
};

const defaultProps: TTipsCard = {
    title: "Tips before you begin",
    text: "You're prepared, and we believe in you. Let's do this!",
    tips: tips,
    message: "You're prepared, and we believe in you. Let's do this!"
};

const TipsCard: React.FC<TTipsCard> = ({
    title = defaultProps.title,
    message = defaultProps.message,
    text = defaultProps.text,
    tips = defaultProps.tips
}) => {
    return (
        <Card className="rounded-xl p-3 border-0 shadow-none">
            <CardHeader className=" p-3 px-5 space-y-4">
                <img src={IdeaBulbIcon} alt="" className="w-12 h-12" />
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                
                <CardDescription className="">
                    <Description variant="small">
                        {text}
                    </Description>
                </CardDescription>

            </CardHeader>
            
            <CardContent className="my-3">
                <ul className="flex flex-col gap-3 px-5">
                    {tips?.map((tip) => (
                        <li key={tip} className="list-disc font-medium">{tip}</li>
                    ))}
                </ul>
            </CardContent>
            
            <CardFooter className="">
                <Description variant="small">
                    {message}
                </Description>
            </CardFooter>
        </Card>

    )
}

export default TipsCard