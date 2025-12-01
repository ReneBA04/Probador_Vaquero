import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageInputProps {
  onImageSelected: (base64: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageSelected(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-western text-leather-900 mb-2">Comienza tu Transformación</h2>
        <p className="text-leather-600">Sube una foto tuya de cuerpo completo para probarte los mejores outfits.</p>
      </div>

      <div 
        className={`border-4 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors h-80 bg-white ${
          dragActive ? 'border-amber-500 bg-amber-50' : 'border-leather-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <ImageIcon className="w-16 h-16 text-leather-400 mb-4" />
        <p className="text-lg font-medium text-leather-700 mb-6">Arrastra tu foto aquí o usa una opción</p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 bg-leather-800 hover:bg-leather-900 text-white px-6 py-3 rounded-lg font-medium transition-transform active:scale-95 shadow-lg"
          >
            <Upload className="w-5 h-5" />
            Subir Foto
          </button>
          
          <label className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-transform active:scale-95 shadow-lg">
            <Camera className="w-5 h-5" />
            Tomar Foto
            <input 
              type="file" 
              accept="image/*" 
              capture="user" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </div>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-leather-500">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-leather-200">
          <span className="block font-bold mb-1">📷 Buena Iluminación</span>
          Asegura que tu foto esté clara y bien iluminada.
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-leather-200">
          <span className="block font-bold mb-1">🧍 Cuerpo Completo</span>
          Mejores resultados si se ve todo tu cuerpo.
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-leather-200">
          <span className="block font-bold mb-1">🚫 Fondo Simple</span>
          Evita fondos muy saturados o con otras personas.
        </div>
      </div>
    </div>
  );
};

export default ImageInput;