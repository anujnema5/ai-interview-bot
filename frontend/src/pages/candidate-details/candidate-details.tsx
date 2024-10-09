import React from "react";
import Description from "@/components/ui/description";
import Heading from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { InfoCard } from "@/components/cards";
import { greet, messages, staticSkills, testDuration } from "./data";
import { useStore } from "@/store";

type DescriptionForCandidateProps = {
    messages?: string[];
    staticSkills?: string[];
}

type InformationDetailsProps = {
    headingText?: string;
    testDuration?: number;
    content?: JSX.Element | string
}

const DescriptionForCandidate: React.FC<DescriptionForCandidateProps> = () => {
    const { user } = useStore();

    return (
        <>
            <div className="description">
                <ul className="flex flex-col gap-3">
                    <li>
                        <Description
                            variant="span">
                            {`Welcome to our interview application for the role of ${user?.job_role}.`}
                        </Description>
                    </li>

                    {messages?.map((message, i) => (
                        <li>
                            <Description
                                variant="span">
                                {message}
                            </Description>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="required-skills flex gap-10">
                <Heading type="h4" className="whitespace-nowrap">Required Skills*</Heading>

                <ul className="skill-badge flex flex-wrap gap-3">
                    {user?.skills?.map((skill, index) => (
                        <li key={index}>
                            <Badge variant="secondary" className="rounded-3xl py-1 bg-lightBlue text-darkBlue px-2">
                                {skill}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const defaultData: InformationDetailsProps = {
    content: <DescriptionForCandidate />,
    testDuration: testDuration,
    headingText: greet
}

const InformationDetails: React.FC<InformationDetailsProps> = ({
    headingText = defaultData.headingText,
    content = defaultData.content,
    testDuration = defaultData.testDuration
}) => {

    const { user } = useStore()

    return (
        <InfoCard
            content={content}
            headingText={headingText}
            testDuration={user?.interviewDuration || testDuration}
        />
    );
};

export default InformationDetails;
