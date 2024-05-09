import dice from '../assets/images/dice.jpg'
import '../assets/styles/Johnstyle.css'

function Logo() {
    return(
        <>
        <div className='Logo'>
            <img src={dice} alt='dice' className='Logo-image'/>
            <h1>John Games</h1>
        </div>
        </>
    )
}

export default Logo