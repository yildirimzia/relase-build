import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { sourceBranch, targetBranch, projectPath } = await request.json();

    if (!sourceBranch || !targetBranch || !projectPath) {
      return NextResponse.json(
        { message: 'Tüm alanlar gereklidir' },
        { status: 400 }
      );
    }

    const command = `python run.py -d ${projectPath} -b ${sourceBranch} -dev ${targetBranch}`;
    
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error('Hata:', stderr);
      return NextResponse.json(
        { message: 'İşlem sırasında bir hata oluştu', error: stderr },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'İşlem başarıyla tamamlandı',
      output: stdout
    });

  } catch (error) {
    console.error('Hata:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası', error: (error as Error).message },
      { status: 500 }
    );
  }
} 