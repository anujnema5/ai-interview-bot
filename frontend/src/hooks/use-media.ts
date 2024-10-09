import { useEffect, useRef } from 'react';

const useMedia = () => {
    const cameraPermission = useRef()
    const microphonePermission = useRef();

    useEffect(() => {
        const handlePermissionChange = (e) => {
            console.log('permission changed');
        };

        const setupPermissionListener = async () => {
            try {
                cameraPermission.current = await navigator.permissions.query({ name: 'camera' });
                cameraPermission.current.addEventListener('change', handlePermissionChange);
                
                microphonePermission.current = await navigator.permissions.query({ name: 'microphone' })

                microphonePermission.current.addEventListener('change', handlePermissionChange)

            } catch (error) {
                console.error('Error accessing camera permission:', error);
            }
        };

        // Call the function to set up the listener
        setupPermissionListener();

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            if (cameraPermission) {
                cameraPermission.current.removeEventListener('change', handlePermissionChange);
            }
        };
    }, [cameraPermission, microphonePermission]);
}

export default useMedia