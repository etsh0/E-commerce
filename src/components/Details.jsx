import { useOutletContext } from 'react-router-dom'

export const Details = () => {
  const {details} = useOutletContext()
  return (
    <>
        <div className=''>
            <h4 className='text-xl font-semibold'>Detils</h4>
            <div className='content text-text text-sm mt-6'>
                <p className='mb-2 whitespace-pre-line break-words'>{details}</p>
            </div>
        </div>
    </>
  )
}
