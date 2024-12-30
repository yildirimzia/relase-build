export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>
      <div className="max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Profil Ayarları */}
          <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Profil Ayarları</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Kullanıcı adınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-posta</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="E-posta adresiniz"
                />
              </div>
            </div>
          </div>

          {/* Bildirim Ayarları */}
          <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Bildirim Ayarları</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>E-posta Bildirimleri</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <span>Push Bildirimleri</span>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 