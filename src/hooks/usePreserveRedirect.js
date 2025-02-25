import { useLocation, useNavigate } from "react-router";

export default function usePreserveRedirect() {
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = (path) => {
        const currentLocation = location.query
        navigate(`${path}${currentLocation}`);
    }
    return redirect;
}