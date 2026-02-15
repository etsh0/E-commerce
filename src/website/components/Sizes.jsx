
export const Sizes = () => {
    const sizes = ["s","m","l","xl","xxl"]
  return (
    <div className="size">
        <div className="flex items-center flex-wrap gap-2 mt-4">
            {
                sizes.map( (size,idx) => (
                    <span key={idx} className="px-4 py-3 border border-border rounded-lg uppercase text-xs font-medium text-text cursor-pointer">{size}</span>
                ))
            }
        </div>
    </div>
  )
}
