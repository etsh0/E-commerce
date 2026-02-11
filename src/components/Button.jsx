import { Link } from 'react-router-dom'
import Arrow from '../assets/Arrow Right white.svg'

export const Button = ({text}) => {
  return (
    <div>
        <button className='relative button'>
            <Link to="/shop">{text}</Link>
            <img className='absolute right-0 top-[50%] translate-[-50%]' src={Arrow} alt="" />
        </button>
    </div>
  )
}
