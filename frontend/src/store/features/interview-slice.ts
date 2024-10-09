import { StateCreator } from "zustand";

export type InterviewSlice = {
    webSocket: string,
    messages: [],
    textToSpeak: string,
    timeLeft: number,
    setSocket: (socketInstance: string) => void;
    // setMessage: (message: string) => void;
    // setTextToSpeak: (data: string) => void;
}

export const createInterviewSlice: StateCreator<InterviewSlice> = (set) => ({
    webSocket: '',
    messages: [],
    textToSpeak: '',
    timeLeft: 1800000,

    setSocket: (socketInstance: string) => {
        set({ webSocket: socketInstance })
    },

    // setMessage: (message: string) => set((state) => ({
    //     messages: [...state.messages, message]
    // })),

    // setTextToSpeak: (data: string) => {

    // }
})