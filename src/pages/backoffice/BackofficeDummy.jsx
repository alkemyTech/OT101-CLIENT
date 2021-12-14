import { useLocation } from "react-router-dom";

const BackofficeDummy = () => {
    return (
        <h1>{useLocation().pathname}</h1>
    );
}

export default BackofficeDummy;