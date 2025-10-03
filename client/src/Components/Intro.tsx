import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../styles/Intro.css'

function Intro() {
    return (
        <div className="Intro_div">
            <div className="intro_text">
                <h1 className='text_header'>PLUG</h1>
                <div className="text_div">
                    Find What You Need
                    <span> When You Need It </span>
                    <span>The #1 Local Services Hub.</span>
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