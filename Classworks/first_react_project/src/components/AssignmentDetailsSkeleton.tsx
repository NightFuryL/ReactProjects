export default function AssignmentDetailsSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        <div>
          <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
          <div className="space-y-1.5">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
          <div>
            <div className="h-3 bg-gray-200 rounded w-16 mb-1.5"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-200 rounded w-16 mb-1.5"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
}
