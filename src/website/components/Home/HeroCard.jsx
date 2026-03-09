export const HeroCard = ({icon,title,p}) => {
  return (
    <>
        <div className="card text-center md:text-left">
            <div className="icon bg-secondary rounded-full w-12 h-12 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <img className="" src={icon} alt="" />
            </div>
            <div className="content">
                <h5 className="text-h5 font-semibold mb-3">{title}</h5>
            </div>
            <p className="text-p text-text max-w-68">{p}</p>
        </div>
    </>
  )
}
