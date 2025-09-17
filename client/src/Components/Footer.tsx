import { Year } from "./Date"
import '../styles/footer.css'
const year = Year()
function Footer() {
    return (
        <div className="footer">
           © Copyright Plug {year}
        </div>
    )
}
export default Footer