import PropTypes from 'prop-types';
import '../../assets/styles/Gamescard.css'

function GamesCard(props) {
    return(
        <div className='Games-card'>
            <img className="Games-images" src={props.image} alt='images'/>
            <div className='Games-desc'>
                <h2>{props.title}</h2>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

GamesCard.PropTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

export default GamesCard