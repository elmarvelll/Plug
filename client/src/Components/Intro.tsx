
import '../styles/Intro.css'
import { useContext, useEffect, useState } from 'react';
import BusinessProfile from './BusinessProfile';
import BusinessRegForm from '../Pages/BusinessregForm';
import { stateContext } from '../Pages/Home';

function Intro() {
    const state = useContext(stateContext)
    if (!state) throw new Error('no state provided')
    const { setAddState, setscrollHeight, setComponent } = state

    function checkclickState() {
        setscrollHeight(window.scrollY)
        setAddState(true)
        setComponent('regform')
    }
    return (
        <div className="Intro_div">
            <div className="intro_text">
                <div className="text_div">
                    <div className='first_entry'>
                        <h1 style={{ fontSize: '75px' }}>Find What You Need,</h1>
                        <h1 style={{ fontSize: '75px' }}> When You Need It </h1>
                        <p style={{ paddingTop: '20px' }}>Your #1 Service Plug — Fast, Safe, Verified.</p>
                    </div>

                    <div className="search_div second_entry">
                        <div className="intro_search_div"><input type="search" name="intro_search" id="intro_search" placeholder="Search" /></div>
                    </div>
                    <div className='hidden third_entry' style={{ width: '100%' }}>
                        <button className="AddButton" style={{ fontSize: 'medium' }} onClick={checkclickState}>Add your business</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Intro