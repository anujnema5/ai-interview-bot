import React from 'react';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '../ui/button';
import { useParams } from 'react-router-dom';
import { useApi } from '@/hooks';

const InvitationCard: React.FC = () => {
    const { getUserMutation: {
        mutate: getUser,
        isPending: isLoadingUser,
    } } = useApi();

    const { userId } = useParams();

    const handleAccept = () => {
        if (!userId) return;
        getUser({ userId });
    };

    return (
        <Card className="space-y-24 bg-secondary shadow-invitation-card border border-primary/20 px-1">
            <CardHeader className="space-y-3">
                <CardTitle className="text-2xl font-semibold">Accept Your Interview</CardTitle>
                <CardDescription className="text-gray-500 font-medium">Please confirm to proceed with the interview.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button
                    onClick={handleAccept}
                    className="w-full py-5 font-medium bg-primary"
                    aria-label="Accept"
                    disabled={isLoadingUser}
                >
                    {isLoadingUser ? "Please wait..." : "Accept"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default InvitationCard;
