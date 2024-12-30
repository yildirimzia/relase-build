'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdate: string;
}

export default function ProjectsPage() {
  // Mock proje verileri
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Proje 1',
      description: 'Bu bir örnek proje açıklamasıdır. Proje detayları burada yer alacak.',
      lastUpdate: '15.09.2024'
    },
    {
      id: '2',
      name: 'Proje 2',
      description: 'Bu bir örnek proje açıklamasıdır. Proje detayları burada yer alacak.',
      lastUpdate: '29.09.2024'
    },
    {
      id: '3',
      name: 'Proje 3',
      description: 'Bu bir örnek proje açıklamasıdır. Proje detayları burada yer alacak.',
      lastUpdate: '07.11.2024'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projeler</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Yeni Proje
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Son Güncelleme: {project.lastUpdate}
                </span>
                <Link 
                  href={`/projects/${project.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Detaylar →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 