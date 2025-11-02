// FriendCardSkeleton.jsx
export default function DevShimmer() {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="w-full max-w-sm bg-[#252526] border border-[#333] shadow-md rounded-xl overflow-hidden">
 
        <div className="flex justify-center mt-6">
          <div className="rounded-full w-32 h-32 bg-[#3C3C3C] border-4 border-[#333]" />
        </div>

     
        <div className="p-4 flex flex-col gap-4">

          <div className="w-full flex justify-center">
            <div className="h-6 bg-[#3C3C3C] rounded w-3/4"></div>
          </div>

          <div className="w-full text-left pl-2 flex flex-col gap-2">
            <div className="h-4 bg-[#3C3C3C] rounded w-5/6"></div>
            <div className="h-4 bg-[#3C3C3C] rounded w-1/2"></div>
            <div className="h-4 bg-[#3C3C3C] rounded w-4/6"></div>

            <div className="flex justify-center mt-4 gap-2">
              <div className="h-8 bg-[#007ACC] rounded w-20"></div>
              <div className="h-8 bg-[#3C3C3C] rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
