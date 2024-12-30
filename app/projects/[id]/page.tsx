'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  lastBuildDate?: string;
  status: 'active' | 'inactive';
  branches: {
    name: string;
    lastCommit: string;
    author: string;
    date: string;
  }[];
  buildHistory: {
    id: string;
    branch: string;
    status: 'Başarılı' | 'Başarısız';
    date: string;
    duration: string;
  }[];
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'branches' | 'builds'>('overview');

  useEffect(() => {
    // Burada gerçek API çağrısı yapılacak
    // Şimdilik mock data kullanıyoruz
    const mockProject: ProjectDetails = {
      id: params.id as string,
      name: 'Proje Adı',
      description: 'Proje açıklaması burada yer alacak.',
      lastBuildDate: '2024-03-15',
      status: 'active',
      branches: [
        {
          name: 'master',
          lastCommit: 'Update README.md',
          author: 'John Doe',
          date: '2024-03-15'
        },
        {
          name: 'development',
          lastCommit: 'Fix login issue',
          author: 'Jane Smith',
          date: '2024-03-14'
        }
      ],
      buildHistory: [
        {
          id: '1',
          branch: 'master',
          status: 'Başarılı',
          date: '2024-03-15',
          duration: '2m 30s'
        },
        {
          id: '2',
          branch: 'development',
          status: 'Başarısız',
          date: '2024-03-14',
          duration: '1m 45s'
        }
      ]
    };

    setProject(mockProject);
  }, [params.id]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Proje Başlığı */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {project.status === 'active' ? 'Aktif' : 'Pasif'}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{project.description}</p>
      </div>

      {/* Sekmeler */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {(['overview', 'branches', 'builds'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab === 'overview' && 'Genel Bakış'}
              {tab === 'branches' && 'Branchler'}
              {tab === 'builds' && 'Buildler'}
            </button>
          ))}
        </nav>
      </div>

      {/* Sekme İçerikleri */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Proje Bilgileri</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Son Build Tarihi</p>
                <p className="font-medium">{project.lastBuildDate || 'Henüz build yapılmadı'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aktif Branch Sayısı</p>
                <p className="font-medium">{project.branches.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Son Build Durumu</p>
                <p className="font-medium">{project.buildHistory[0]?.status || 'Henüz build yapılmadı'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'branches' && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Commit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yazar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project.branches.map((branch, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{branch.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.lastCommit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'builds' && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Build ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Süre</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project.buildHistory.map((build) => (
                <tr key={build.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{build.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{build.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      build.status === 'Başarılı' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {build.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{build.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{build.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 