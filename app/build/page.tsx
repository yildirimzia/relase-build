'use client';
import { useState } from 'react';

interface BuildHistory {
  projectName: string;
  devBranch: string;
  status: 'Başarılı' | 'Başarısız';
  date: Date;
}

export default function BuildPage() {
  const [projectName, setProjectName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [devBranch, setDevBranch] = useState('');
  const [productionMaster, setProductionMaster] = useState('-pm master');
  const [isLoading, setIsLoading] = useState(false);
  const [buildOutput, setBuildOutput] = useState<string>('');
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [buildHistory, setBuildHistory] = useState<BuildHistory[]>([]);

  const handleBuild = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBuildOutput('');
    
    try {
      const response = await fetch('/api/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName,
          branchName,
          devBranch,
          productionMaster,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setBuildOutput(data.output || data.message);
        // Build geçmişine yeni build'i ekle
        setBuildHistory(prev => [{
          projectName,
          devBranch,
          status: 'Başarılı',
          date: new Date()
        }, ...prev]);
      } else {
        throw new Error(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Build hatası:', error);
      setBuildOutput(`Hata: ${error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'}`);
      // Başarısız build'i de geçmişe ekle
      setBuildHistory(prev => [{
        projectName,
        devBranch,
        status: 'Başarısız',
        date: new Date()
      }, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCommand = () => {
    return `python run.py -d ~/Desktop/projects/${projectName || '<proje-adı>'} -b ${branchName || '<branch>'} -dev ${devBranch || '<dev-branch>'} -pm ${productionMaster.replace('-pm ', '') || 'master'}`;
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(getCommand());
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Build İşlemi</h2>
        
        {/* Komut Önizleme */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="relative">
              <button
                onClick={handleCopyCommand}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 group"
                title="Komutu kopyala"
              >
                <svg 
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-700" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
              {showCopyNotification && (
                <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
                  Kopyalandı!
                </div>
              )}
            </div>
          </div>
          <code className="text-sm font-mono text-gray-700 block overflow-x-auto">
            {getCommand()}
          </code>
        </div>

        <form onSubmit={handleBuild} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proje Adı */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Proje Adı
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Proje adını giriniz"
              />
            </div>

            {/* Branch Adı */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Branch Adı
              </label>
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Branch adını giriniz"
              />
            </div>

            {/* Dev Branch */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dev Branch
              </label>
              <input
                type="text"
                value={devBranch}
                onChange={(e) => setDevBranch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Dev branch adını giriniz"
              />
            </div>

            {/* Production Master */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Production Master
              </label>
              <input
                type="text"
                value={productionMaster}
                onChange={(e) => setProductionMaster(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="-pm master"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Build başlatılıyor...</span>
                </>
              ) : (
                'Build Başlat'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Build Çıktısı */}
      {buildOutput && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Build Çıktısı</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
            {buildOutput}
          </pre>
        </div>
      )}

      {/* Build Geçmişi */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Build Geçmişi</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proje
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dev Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buildHistory.map((build, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {build.projectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {build.devBranch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        build.status === 'Başarılı' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {build.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {build.date.toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
                {buildHistory.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      Henüz build geçmişi bulunmuyor
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 