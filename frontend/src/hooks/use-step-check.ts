import { useStore } from "@/store";
import { ROUTES } from "@/utils/constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const useStepCheck = () => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const { steps } = useStore()

    useEffect(() => {
        if (pathname.includes('/invitation') && steps.invitationAccept) {
            navigate(ROUTES.CANDIDATE_DETAILS)
        }

        if (pathname.includes(ROUTES.CANDIDATE_DETAILS) && steps.candidateDetails) {
            navigate(ROUTES.INTERVIEW_SETUP_CHECK)
        }

        if(pathname.includes(ROUTES.INTERVIEW_SETUP_CHECK) && steps.interviewSetupCheck) {
            navigate(ROUTES.INTERVIEW)
        }

        if(pathname.includes(ROUTES.INTERVIEW) && steps.interview) {
            navigate(ROUTES.THANK_YOU)
        }
    }, [steps])
}

export default useStepCheck