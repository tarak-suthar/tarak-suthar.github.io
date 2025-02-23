import { useEffect, useState } from "react";
// custom hook example
export function useWindowSize() {
    let [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    function calcSize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        addEventListener("resize", calcSize);
    }, [])

    return windowSize;
}

