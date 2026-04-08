import { Skeleton } from "primereact/skeleton"

export const CheckoutSkeleton = () => {
  return (
<div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* الجزء الشمال: Billing Details (Form) */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton width="40%" height="2rem" className="mb-8"></Skeleton>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton width="30%" height="0.8rem"></Skeleton>
                <Skeleton width="100%" height="3rem" borderRadius="8px"></Skeleton>
              </div>
            ))}
          </div>
          
          <Skeleton width="100%" height="5rem" borderRadius="8px" className="mt-4"></Skeleton>
        </div>

        {/* الجزء اليمين: Order Summary (Sidebar) */}
        <div className="bg-secondary/20 p-6 rounded-lg h-fit space-y-6">
          <Skeleton width="60%" height="1.5rem" className="mx-auto mb-6"></Skeleton>
          
          {/* منتجات وهمية في الملخص */}
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Skeleton width="50px" height="50px" borderRadius="4px"></Skeleton>
                <div className="space-y-2">
                  <Skeleton width="100px" height="0.8rem"></Skeleton>
                  <Skeleton width="40px" height="0.6rem"></Skeleton>
                </div>
              </div>
              <Skeleton width="60px" height="1rem"></Skeleton>
            </div>
          ))}

          {/* حسابات التوتال */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between"><Skeleton width="30%" height="0.8rem"></Skeleton> <Skeleton width="20%" height="0.8rem"></Skeleton></div>
            <div className="flex justify-between"><Skeleton width="30%" height="0.8rem"></Skeleton> <Skeleton width="20%" height="0.8rem"></Skeleton></div>
            <div className="flex justify-between pt-4 border-t border-border">
              <Skeleton width="40%" height="1.2rem"></Skeleton> 
              <Skeleton width="30%" height="1.2rem"></Skeleton>
            </div>
          </div>

          {/* زرار الدفع الوهمي */}
          <Skeleton width="100%" height="3.5rem" borderRadius="8px" className="mt-6"></Skeleton>
        </div>

      </div>
    </div>
  )
}
