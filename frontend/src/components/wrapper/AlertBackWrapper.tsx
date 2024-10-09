import { useEffect, useState } from "react";
import { AlertBack } from "@/components/custom-ui";

const AlertBackWrapper = () => {
    const [backAlert, setBackAlert] = useState(false);

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);

        const preventGoBack = () => {
            setBackAlert(true);
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", preventGoBack);
        return () => window.removeEventListener("popstate", preventGoBack);
    }, []);

    return <AlertBack open={backAlert} close={setBackAlert} />;
};

export default AlertBackWrapper;
