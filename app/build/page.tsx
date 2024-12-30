'use client';
import { useState } from 'react';

export default function BuildPage() {
  const [projectName, setProjectName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [devBranch, setDevBranch] = useState('');
  const [productionMaster, setProductionMaster] = useState('-pm master');
  const [isLoading, setIsLoading] = useState(false);
  const [buildOutput, setBuildOutput] = useState<string>('');

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
      } else {
        throw new Error(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Build hatası:', error);
      setBuildOutput(`Hata: ${error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Build İşlemi</h2>
        
        {/* Komut Önizleme */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <code className="text-sm font-mono text-gray-700 block overflow-x-auto">
            python run.py -d ~/Desktop/projects/{projectName} -b {branchName} -dev {devBranch} -pm {productionMaster.replace('-pm ', '')}
          </code>
        </div>

        <form onSubmit={handleBuild} className="space-y-6">
          {/* Form Grid */}
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
                placeholder="örn: gap"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                placeholder="örn: SHOP-46982"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                placeholder="örn: gap_dev_311"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                placeholder="örn: -pm master"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                    Branch
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
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">gap</td>
                    <td className="px-6 py-4 whitespace-nowrap">gap_dev_311</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Başarılı
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(Date.now() - index * 86400000).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 