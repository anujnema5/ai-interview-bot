import { useStore } from "@/store";
import { useNavigate } from "react-router-dom"

const useHandleCancel = () => {
    // debugger;
    const navigate = useNavigate();
    const { user, resetSteps } = useStore();

    resetSteps()
    navigate(`/invitation/${user?.userId}`)
}

export default useHandleCancel