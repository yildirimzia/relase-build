import Sidebar from '../components/Sidebar'

export default function Build() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Build</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Build Ayarları</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <h3 className="font-medium">Production Build</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Son build: 3 saat önce</p>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Build Başlat
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <h3 className="font-medium">Development Build</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Son build: 1 gün önce</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Build Başlat
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 