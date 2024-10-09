import { Navbar } from "@/components/navbar";
import { InformationPage, InvitationPage, PageNotFound } from "@/pages";
import { InterviewPage } from "@/pages/interview";
import SetupCheckPage from "@/pages/setup-check/setup-check-page";
import { ThankYouPage } from "@/pages/thank-you";
import { ROUTES } from "@/utils/constants";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Navbar />}>
                <Route path={ROUTES.INVITATION} element={<InvitationPage />}></Route>
                <Route path={ROUTES.INTERVIEW} element={<InterviewPage />}></Route>
                <Route path={ROUTES.THANK_YOU} element={<ThankYouPage />}></Route>
            </Route>

            <Route path={ROUTES.CANDIDATE_DETAILS} element={<InformationPage />}></Route>
            <Route path={ROUTES.INTERVIEW_SETUP_CHECK} element={<SetupCheckPage />}></Route>
            <Route path={'*'} element={<PageNotFound />}></Route>
        </Route>
    )
);

export default router;