import { useStore } from "@/store"
import { convertMinutesToMilliseconds } from "@/utils"
import { API_POINTS} from "@/utils/constants"
import { useMutation } from "@tanstack/react-query"
import axios from 'axios'

const useApi = () => {
    const { setUser, setStep, setUserTimeLeft } = useStore()

    /** GET USER */
    const getUserMutation = useMutation({
        mutationFn: ({ userId }: { userId: string }) => {
            setUser({ userId })
            return axios.post(`${API_POINTS.GET_USER_ID}`, { userId })
        },
        onSuccess: (data) => {
            if (data) {
                setUser(data.data);
                setUserTimeLeft(convertMinutesToMilliseconds(data.data?.interviewDuration ?? 0))
                setStep('invitationAccept');

            }
        },

        onError: () => {
            setUser({})
        }
    })

    /** UPLOAD RESUME */
    const uploadResumeMutation = useMutation({
        mutationFn: ({ userId, file }: { userId: string, file: File }) => {
            
            // Create a FormData object
            const formData = new FormData();
            formData.append("file", file);         // Append the file
            formData.append("user_id", userId);    // Append the user ID
            
            return axios.post(`${API_POINTS.RESUME_UPLOAD}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Set content type
                }
            });
        },
        onSuccess: (data) => {
            if (data) {
                console.log(data);
                setStep('candidateDetails');
                // navigate(ROUTES.INTERVIEW_SETUP_CHECK);
            }
        },
    });
    

    return {
        getUserMutation: getUserMutation,
        uploadResumeMutation: uploadResumeMutation
    }
}

export default useApi