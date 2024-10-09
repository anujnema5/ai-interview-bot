import { useState, useEffect } from "react";
import { WEBSOCKET_URL } from "@/utils/constants";

const useInterviewWebSocket = (userId: any) => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [textForSubtitle, setTextForSubtitle] = useState({ type: '', transcript: '' });

    useEffect(() => {
        const socketInstance = new WebSocket(WEBSOCKET_URL + userId);
        setWebSocket(socketInstance);

        socketInstance.onmessage = event => {
            setTextForSubtitle({ type: 'interviewer', transcript: event.data });
        };

        socketInstance.onclose = () => console.log("WebSocket connection closed");

        socketInstance.onerror = error => console.error("WebSocket error:", error);

        return () => socketInstance.close();
    }, [userId]);

    return { webSocket, textForSubtitle, setTextForSubtitle };
};

export default useInterviewWebSocket;
