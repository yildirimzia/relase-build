import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { projectName, branchName, devBranch, productionMaster } = await request.json();

    // Script'in bulunduğu yolu belirle
    const scriptPath = path.join(process.cwd(), 'scripts', 'build.py');
    
    // Python komutunu oluştur - tırnak işaretleri kaldırıldı
    const command = `python ${scriptPath} \
      -d ~/Desktop/projects/${projectName} \
      -b ${branchName} \
      -dev ${devBranch} \
      -pm ${productionMaster.replace('-pm ', '')} \
      -npm`;

    console.log('Çalıştırılan komut:', command);

    // Komutu çalıştır
    const { stdout, stderr } = await execAsync(command);

    if (stderr && !stderr.includes('Created')) {
      console.error('Build hatası:', stderr);
      return NextResponse.json(
        { message: stderr || 'Build işlemi sırasında bir hata oluştu' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: stdout || 'Build işlemi başarıyla başlatıldı',
        output: stdout 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API hatası:', error);
    return NextResponse.json(
      { message: (error as Error).message || 'İşlem sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
} 