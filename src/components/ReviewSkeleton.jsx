import { Skeleton } from 'primereact/skeleton';

export const ReviewSkeleton = () => {
  return (
<div className='card-review flex items-center gap-6 mb-8'>
        {/* الدائرة الوهمية (Avatar) */}
        <Skeleton shape="circle" size="3rem" className="shrink-0"></Skeleton>
        
        <div className="content grow">
            <div className="flex justify-between items-start">
                {/* اسم المراجع الوهمي */}
                <Skeleton width="120px" height="1rem"></Skeleton>
                {/* النجوم الوهمية */}
                <Skeleton width="100px" height="1rem"></Skeleton>
            </div>
            {/* نص الكومنت الوهمي - سطرين */}
            <Skeleton width="100%" height="0.8rem" className="mt-4"></Skeleton>
            <Skeleton width="60%" height="0.8rem" className="mt-2"></Skeleton>
        </div>
    </div>
  )
}
