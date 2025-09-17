import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../styles/Intro.css'

function Intro() {
    return (
        <div className="Intro_div">
            <div className="intro_text">
                <div className="text_div">
                    Find What You Need
                    <p> When You Need It</p>
                    <p>The #1 Local Services Hub.</p>
                    <div className="search_div">
                            <div className="intro_search_div"><input type="search" name="intro_search" id="intro_search" placeholder="Search" /></div>
                            <div className="searchIcon"><FontAwesomeIcon icon={faMagnifyingGlass} color='black'/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Intro