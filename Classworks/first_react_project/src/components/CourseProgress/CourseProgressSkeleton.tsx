export default function CourseProgressSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm animate-pulse">
      {/* Заголовок */}
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>

      <div className="space-y-4 mb-6">
        <div>
          {/* Опис курсу (два рядки) */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Індикатор кількості пройдених уроків */}
          <div className="flex justify-between items-center mb-1">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>

          {/* Прогрес-бар */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gray-200 h-2.5 rounded-full w-1/3"></div>
          </div>
        </div>

        {/* Список модулів (5 симульованих пунктів) */}
        <div>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                {/* Номер списку (симуляція цифр list-decimal) */}
                <div className="h-4 bg-gray-200 rounded w-3 flex-shrink-0"></div>
                {/* Текст модуля різної довжини для реалістичності */}
                <div
                  className="h-4 bg-gray-200 rounded"
                  style={{ width: `${Math.floor(Math.random() * 30) + 50}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
