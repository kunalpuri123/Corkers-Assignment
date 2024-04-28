import {Route, Routes} from "react-router-dom";
import Homepage from "../components/Homepage";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </>
    )
}

export default Router;