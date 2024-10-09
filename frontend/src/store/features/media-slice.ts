import { StateCreator } from 'zustand';

export type MediaPermissionStatus = 'granted' | 'denied' | 'pending' | 'error';

export type MediaSlice = {
    microphoneStatus: MediaPermissionStatus;
    videoStatus: MediaPermissionStatus;
    mediaStream: MediaStream | null;
    mediaRecorder: MediaRecorder | null;
    recordedChunks: Blob[];
    requestMediaPermissions: () => Promise<void>;
    startRecording: () => void;
    stopRecording: () => void;
    saveRecording: () => void;
};

export const createMediaSlice: StateCreator<MediaSlice> = (set) => ({
    microphoneStatus: 'pending',
    videoStatus: 'pending',
    mediaStream: null,
    mediaRecorder: null,
    recordedChunks: [],

    requestMediaPermissions: async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log(stream)
            set({
                microphoneStatus: 'granted',
                videoStatus: 'granted',
                mediaStream: stream,
            });

            const recorder = new MediaRecorder(stream);
            set({ mediaRecorder: recorder });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    set((state) => ({
                        recordedChunks: [...state.recordedChunks, event.data],
                    }));
                }
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error: any) {
            // Handle errors as before...
            set({})
        }
    },

    startRecording: () => {
        set((state) => {
            state.mediaRecorder?.start();
            return { recordedChunks: [] }; // Clear previous recordings
        });
    },

    stopRecording: () => {
        set((state) => {
            state.mediaRecorder?.stop();
            return state;
        });
    },

    saveRecording: () => {
        set((state) => {
            const blob = new Blob(state.recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            a.click();
            URL.revokeObjectURL(url); // Clean up
            return state;
        });
    },
});
