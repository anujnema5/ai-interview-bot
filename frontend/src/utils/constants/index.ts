
// const BASE_URL = "https://interview-ai-dev-backend.azurewebsites.net"

const BASE_URL = "http://127.0.0.1:8000"

const API_POINTS = {
    GET_USER_ID: `${BASE_URL}/get_user_id`,
    RESUME_UPLOAD: `${BASE_URL}/resume-upload`,
}

/** ROUTER CONSTANTS */
const ROUTES = {
    INVITATION: "/invitation/:userId",
    CANDIDATE_DETAILS: "/candidate-details",
    INTERVIEW_SETUP_CHECK: "/interview-setup-check",
    INTERVIEW: "/interview",
    THANK_YOU: "/thank-you"
}

// const WEBSOCKET_URL = `wss://interview-ai-dev-backend.azurewebsites.net/ws1?user_id=` 

const WEBSOCKET_URL = "ws://127.0.0.1:8000/ws1?user_id="

export { ROUTES, BASE_URL, API_POINTS, WEBSOCKET_URL }