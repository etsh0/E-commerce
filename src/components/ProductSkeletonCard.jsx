import { Skeleton } from 'primereact/skeleton';

export const ProductSkeletonCard = () => {
  return (
<div className="productCard py-4 px-2">
            
            {/* 1. السكيلتون بتاع الصورة - قلدنا الـ aspect-4/5 والـ rounded */}
            <div className="relative bg-secondary rounded overflow-hidden aspect-4/5 w-full">
                <Skeleton width="100%" height="100%" borderRadius="0px"></Skeleton>
                
                {/* محاكاة لزرار الـ Add to Cart الصغير اللي تحت على اليمين */}
                <div className="absolute bottom-2 right-2">
                    <Skeleton width="32px" height="32px" borderRadius="0px"></Skeleton>
                </div>
            </div>

            {/* 2. تفاصيل المنتج - نفس الـ mt-6 */}
            <div className="product-deatils mt-6">
                
                {/* سكيلتون العنوان - نفس لون الـ Primary تقريباً */}
                <Skeleton width="80%" height="1.2rem" className="mb-3"></Skeleton>
                
                <div className="info flex items-center gap-2 mt-2">
                    {/* سكيلتون الـ Badge */}
                    <Skeleton width="60px" height="1.5rem" borderRadius="4px"></Skeleton>
                    
                    {/* سكيلتون السعر */}
                    <Skeleton width="80px" height="1.5rem"></Skeleton>
                </div>
            </div>
            
        </div>
  )
}
