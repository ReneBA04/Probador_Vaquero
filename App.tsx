import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ImageInput from './components/ImageInput';
import Wardrobe from './components/Wardrobe';
import { AppStep, Product, SelectedOutfit, Category } from './types';
import { generateTryOnImage } from './services/geminiService';
import { RefreshCw, ShoppingCart, Sparkles, ArrowLeft, Download, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('upload');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [outfit, setOutfit] = useState<SelectedOutfit>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (base64: string) => {
    setUserImage(base64);
    setStep('select');
  };

  const updateOutfit = (item: Product) => {
    setOutfit(prev => ({
      ...prev,
      [item.category]: item
    }));
  };

  const removeItem = (category: Category) => {
    setOutfit(prev => {
        const newState = { ...prev };
        delete newState[category];
        return newState;
    });
  };

  const totalPrice = useMemo(() => {
    return Object.values(outfit).reduce((sum, item) => sum + ((item as Product)?.price || 0), 0);
  }, [outfit]);

  const hasItems = Object.keys(outfit).length > 0;

  const handleGenerate = async () => {
    if (!userImage) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    
    try {
      // Simulate "thinking" time if API is very fast, but usually Gemini takes a few secs.
      const result = await generateTryOnImage(userImage, outfit);
      setGeneratedImage(result);
      setStep('result');
    } catch (err: any) {
      setError(err.message || "Hubo un error al generar la imagen. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setStep('upload');
    setUserImage(null);
    setGeneratedImage(null);
    setOutfit({});
    setError(null);
  };

  const handleBackToEdit = () => {
    setStep('select');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-leather-50">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-6">
        
        {step === 'upload' && (
          <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
            <ImageInput onImageSelected={handleImageSelected} />
          </div>
        )}

        {(step === 'select' || step === 'result') && (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
            
            {/* Left Column: Image Display */}
            <div className="lg:w-1/2 flex flex-col h-full gap-4">
              <div className="relative flex-1 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-4 border-leather-200">
                 {/* Image Container */}
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    {step === 'select' ? (
                       <img 
                         src={userImage || ''} 
                         alt="Usuario" 
                         className="max-h-full max-w-full object-contain"
                       />
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {isGenerating ? (
                           <div className="text-center text-white">
                             <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                             <p className="text-xl font-western animate-pulse">Diseñando tu estilo...</p>
                             <p className="text-sm opacity-80 mt-2">La IA está ajustando las prendas a tu medida.</p>
                           </div>
                        ) : generatedImage ? (
                           <img 
                             src={generatedImage} 
                             alt="Resultado" 
                             className="max-h-full max-w-full object-contain"
                           />
                        ) : (
                            <div className="text-red-300 text-center px-6">
                                <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                                <p>{error}</p>
                            </div>
                        )}
                      </div>
                    )}
                 </div>

                 {/* Top Controls Overlay */}
                 <div className="absolute top-4 left-4 z-10">
                    <button 
                        onClick={step === 'result' ? handleBackToEdit : handleReset}
                        className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                        title={step === 'result' ? "Volver a editar" : "Cambiar foto"}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* Total Price Card (Mobile/Desktop) */}
              <div className="bg-white p-4 rounded-xl shadow border border-leather-200 flex items-center justify-between">
                <div>
                    <p className="text-xs text-leather-500 uppercase font-bold tracking-wider">Total del Outfit</p>
                    <p className="text-2xl font-western text-amber-700">${totalPrice.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-right mr-2 hidden sm:block">
                        <p className="text-xs text-gray-400">{Object.keys(outfit).length} prendas</p>
                    </div>
                    {step === 'select' ? (
                         <button
                            onClick={handleGenerate}
                            disabled={!hasItems || isGenerating}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all
                                ${!hasItems 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-amber-600 hover:bg-amber-700 hover:scale-105 active:scale-95'
                                }
                            `}
                        >
                            <Sparkles className="w-5 h-5" />
                            {isGenerating ? 'Generando...' : 'PROBAR OUTFIT'}
                        </button>
                    ) : (
                        !isGenerating && generatedImage && (
                            <a 
                                href={generatedImage} 
                                download="mi-outfit-vaquero.jpg"
                                className="flex items-center gap-2 bg-leather-800 hover:bg-leather-900 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-95"
                            >
                                <Download className="w-5 h-5" />
                                <span className="hidden sm:inline">GUARDAR</span>
                            </a>
                        )
                    )}
                </div>
              </div>
            </div>

            {/* Right Column: Wardrobe Selector */}
            <div className={`lg:w-1/2 h-full transition-opacity duration-500 ${step === 'result' ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
               <Wardrobe 
                 currentOutfit={outfit} 
                 onUpdateOutfit={updateOutfit} 
                 onRemoveItem={removeItem}
               />
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
};

export default App;