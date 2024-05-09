import GamesCard from '../components/gamesCard/index.jsx'
import announcement from '../assets/images/announcement.jpg'
import '../assets/styles/Johnstyle.css'
import robofighter from '../assets/images/robofighter.png'
import roboadventure from '../assets/images/roboadventure.jpg'
import robocraft from '../assets/images/robocraft.jpg'
import roborpg from '../assets/images/roborpg.jpg'

function Games() {
    return (
      <>
        <div className='Games-image'>
            <center className="Aboutme"><h1>Whats New?</h1></center>
            <img src={announcement} alt='xdd' className='Announcement'/>
        </div>
        <center className="Games-title"><h1>Our list of Games</h1></center>
        <div className='Post-body'>
            <GamesCard title='Robo Fighter' desc='Click to Download' image={robofighter}/>
            <GamesCard  title='Robo Adventure' desc='Click to Download' image={roboadventure}/>
            <GamesCard  title='Robo Craft' desc='Click to Download' image={robocraft}/>
            <GamesCard  title='Robo RPG' desc='Click to Download' image={roborpg}/>
        </div>
      </>
    )
  }
  
  export default Games