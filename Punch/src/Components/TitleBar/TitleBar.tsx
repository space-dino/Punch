import image from '../../assets/monkey.png'
import './TitleBar.css'

const TitleBar = () => {
  return (
    <>
      <div className='title-bar'>
          <div className='title-container'>
              <h1>PUNCH</h1>
              <img src={image}/>
          </div>
      </div>
      <p className='bottom-bar'>Punch 2026 by Gloozmankiz - Mamas 60 Empire</p>
    </>
  )
}

export default TitleBar