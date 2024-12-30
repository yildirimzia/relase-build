'use client';
import { useState } from 'react';

export default function ProjectsPage() {
  // Örnek projeler için veri
  const projects = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Proje ${i + 1}`,
    description: `Bu proje ${i + 1}'in açıklamasıdır. Proje detayları burada yer alacak.`,
    lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString('tr-TR'),
  }));

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projeler</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Yeni Proje
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{project.name}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Son Güncelleme: {project.lastUpdated}</span>
              <button className="text-blue-500 hover:text-blue-600">
                Detaylar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 