import { create } from 'zustand';
import { createMediaSlice, MediaSlice } from '@/store/features/media-slice'
import { createUserSlice, UserSlice } from '@/store/features/user-slice';
import { createInterviewSlice } from './features';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { InterviewSlice } from './features/interview-slice';

type AppState = MediaSlice & UserSlice & InterviewSlice;

export const useStore = create<AppState>()(
    devtools(
        persist((...a) => ({
            ...createMediaSlice(...a),
            ...createUserSlice(...a),
            ...createInterviewSlice(...a)
        }),
            {
                name: 'ai-bot-data',
                storage: createJSONStorage(() => sessionStorage)
            }
        )
    )
    // (...a) => ({
    //     ...createMediaSlice(...a),
    //     ...createUserSlice(...a),
    //     ...createInterviewSlice(...a)
    // }),
)