import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FileObject } from '@supabase/storage-js';
import { Upload, FileText, Download, Trash2, Loader2 } from 'lucide-react';

export default function Storage() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    const { data, error } = await supabase.storage.from('uploads').list();
    if (data) {
      setFiles(data);
    }
    if (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { error } = await supabase.storage
      .from('uploads')
      .upload(`${file.name}`, file, { 
        cacheControl: '3600',
        upsert: false 
      });

    if (error) {
      alert(error.message);
    } else {
      getFiles(); // Refresh the file list
    }
    setUploading(false);
  };

  const downloadFile = async (fileName: string) => {
    const { data, error } = await supabase.storage.from('uploads').download(fileName);
    if (error) {
      console.error('Error downloading file:', error);
      return;
    }
    if(data) {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
  };

  const deleteFile = async (fileName: string) => {
    const { error } = await supabase.storage.from('uploads').remove([fileName]);
    if (error) {
        alert(error.message);
    } else {
        getFiles(); // Refresh the file list
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">File Storage</h2>
            <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50">
                {uploading ? (
                    <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Uploading...</>
                ) : (
                    <><Upload className="mr-2 h-5 w-5" /> Upload File</>
                )}
                <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
        </div>

        <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-white/20">
                {files.length > 0 ? files.map(file => (
                    <li key={file.name} className="py-4 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <FileText className="h-6 w-6 text-gray-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-sm text-gray-500">Last modified: {new Date(file.last_modified).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => downloadFile(file.name)} className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Download className="h-5 w-5" />
                            </button>
                            <button onClick={() => deleteFile(file.name)} className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </li>
                )) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No files uploaded yet.</p>
                    </div>
                )}
            </ul>
        </div>
      </div>
    </div>
  );
}
