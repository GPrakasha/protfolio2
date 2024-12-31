import { useEffect, useState } from "react";

export const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false);
    const windowResize = () => {
        if(window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {

        window.addEventListener('resize', windowResize);        

        return () => {
            window.removeEventListener('resize', windowResize);
        }
    },[]);
    
    return {isMobile};
}