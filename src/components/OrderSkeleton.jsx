import { Skeleton } from 'primereact/skeleton';

export const OrderSkeleton = () => {
  return (
<div className="order-wrapper border-b-2 border-border pb-6 mb-6 animate-pulse">
            
            {/* Header الـ Order الوهمي */}
            <div className="flex justify-between items-center mb-4 bg-secondary/20 p-2 rounded">
                <div className="flex flex-col gap-2">
                    {/* Order ID */}
                    <Skeleton width="100px" height="0.8rem"></Skeleton>
                    {/* Order Status */}
                    <Skeleton width="120px" height="0.8rem"></Skeleton>
                    {/* Date */}
                    <Skeleton width="80px" height="0.6rem"></Skeleton>
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton width="60px" height="1rem"></Skeleton>
                    <Skeleton width="80px" height="1.2rem"></Skeleton>
                </div>
            </div>

            {/* قائمة المنتجات الوهمية (هنفترض منتجين لكل طلب) */}
            <div className="flex flex-col gap-4">
                {[1, 2].map((item) => (
                    <div key={item} className="order-item flex items-center justify-between gap-4 pl-4">
                        <div className="flex items-center gap-4">
                            {/* مكان الصورة */}
                            <div className="bg-secondary/40 rounded overflow-hidden">
                                <Skeleton width="80px" height="80px"></Skeleton>
                            </div>
                            {/* تفاصيل المنتج */}
                            <div className="flex flex-col gap-2">
                                <Skeleton width="150px" height="0.9rem"></Skeleton>
                                <Skeleton width="40px" height="0.7rem"></Skeleton>
                                <Skeleton width="70px" height="0.9rem"></Skeleton>
                            </div>
                        </div>
                        {/* زرار View Item الوهمي */}
                        <Skeleton width="70px" height="30px" borderRadius="4px"></Skeleton>
                    </div>
                ))}
            </div>
        </div>
  )
}
