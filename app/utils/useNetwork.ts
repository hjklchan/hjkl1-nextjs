import { useState } from "react";

export const useNetwork = () => {
    const [isOnline] = useState(window.navigator.onLine);

    return isOnline;
}

export default useNetwork;
