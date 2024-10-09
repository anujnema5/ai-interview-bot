// import { StateCreator } from "zustand";

// export type UserSlice = {
//     user: object;
//     setUser: (user: object) => void;
//     userTimeLeft: number;
//     setUserTimeLeft: (timeLeft: number) => any;
//     steps: object,
// };

// export const createUserSlice: StateCreator<UserSlice> = (set) => ({
//     user: {
//         // DEFAULT JUST FOR NOW WILL BE REMOVED IN FUTURE
//         userId: 1,
//         interviewDuration: "N/A"
//     },
//     userTimeLeft: 0,
//     steps: {
//         invitationAccept: false,
//         candidateDetails: false,
//         interviewSetupCheck: false,
//         interview: false
//     },

//     setUser: (newData: object) => set((state) => ({
//         user: { ...state.user, ...newData }
//     })),

//     setUserTimeLeft: (timeLeft: number) => set((state) => ({
//         userTimeLeft: timeLeft // Set the userTimeLeft to the passed timeLeft
//     }))

// });

import { StateCreator } from "zustand";

const initialSteps = {
    invitationAccept: false,
    candidateDetails: false,
    interviewSetupCheck: false,
    interview: false
};

export type UserSlice = {
    user: object;
    setUser: (user: object) => void;
    userTimeLeft: number;
    setUserTimeLeft: (timeLeft: number) => void;
    steps: typeof initialSteps;
    setStep: (step: keyof typeof initialSteps, value?: boolean) => void;
    resetSteps: () => void;
};

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
    user: {
        // DEFAULT JUST FOR NOW WILL BE REMOVED IN FUTURE
        userId: 1,
        interviewDuration: "N/A"
    },
    userTimeLeft: 0,
    steps: { ...initialSteps },

    setUser: (newData: object) => set((state) => ({
        user: { ...state.user, ...newData }
    })),

    setUserTimeLeft: (timeLeft: number) => set(() => ({
        userTimeLeft: timeLeft
    })),

    setStep: (step, value = true) => set((state) => ({
        steps: {
            ...state.steps,
            [step]: value
        }
    })),

    resetSteps: () => set(() => ({
        steps: { ...initialSteps }
    }))
});