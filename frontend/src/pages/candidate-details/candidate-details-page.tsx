import { TipsCard } from "@/components/cards"
import { SplitViewLayout } from "@/components/layouts"
import { CandidateForm } from "@/components/forms"
import InformationDetails from "./candidate-details"

const InformationPage = () => {

    return (
        <SplitViewLayout firstLayout={<TipsCard />}>
            <InformationDetails />
            <CandidateForm />
        </SplitViewLayout>
    )
}

export default InformationPage