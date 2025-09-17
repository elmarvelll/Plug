import { useParams } from "react-router-dom"
import verifyUser from "../Components/verifiedPage";
import axios from "axios";
function mybusiness() {
    const { buisness } = useParams<{ buisness: string }>();
    axios.get(`http://localhost:3000/buisnesses/${buisness}`, { withCredentials: true })
    return (
        <div>
            Hello {buisness}
        </div>
    )
}
export default mybusiness