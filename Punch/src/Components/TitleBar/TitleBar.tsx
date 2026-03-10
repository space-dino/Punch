import image from '../../assets/monkey.png'
import './TitleBar.css'

const TitleBar = () => {
  return (
    <div className='title-bar'>
        <div className='title-container'>
            <h1>PUNCH</h1>
            <img src={image}/>
        </div>
    </div>
  )
}

export default TitleBar