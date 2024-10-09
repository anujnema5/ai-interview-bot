
export const convertMillisecondsToSeconds = (milliseconds) => {
    // Ensure the input is a valid number and non-negative
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
        return 'Invalid input';
    }

    // Convert milliseconds to seconds
    const seconds = Math.floor(milliseconds / 1000);

    // Return the result
    return seconds;
}

export const convertMillisecondsToTime = (milliseconds) => {
    // Ensure the input is a valid number and non-negative
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
        return 'Invalid input';
    }

    // Convert milliseconds to total seconds
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format seconds to always be 2 digits (e.g., 30 -> '30', 9 -> '09')
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Return time in 'MM:SS' format
    return `${minutes}:${formattedSeconds}`;
}

export const convertMinutesToMilliseconds = (minutes) => {
    // Ensure the input is a valid number and non-negative
    if (typeof minutes !== 'number' || minutes < 0) {
        return 'Invalid input';
    }

    // Convert minutes to milliseconds
    return minutes * 60 * 1000;
};