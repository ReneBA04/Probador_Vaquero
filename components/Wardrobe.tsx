import React, { useState } from 'react';
import { CATEGORIES, CATALOGUE } from '../constants';
import { Category, Product, SelectedOutfit } from '../types';
import { Check, Info, ShoppingBag, X } from 'lucide-react';

interface WardrobeProps {
  currentOutfit: SelectedOutfit;
  onUpdateOutfit: (item: Product) => void;
  onRemoveItem: (category: Category) => void;
}

const Wardrobe: React.FC<WardrobeProps> = ({ currentOutfit, onUpdateOutfit, onRemoveItem }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('hat');

  const filteredItems = CATALOGUE.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-leather-200 overflow-hidden">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto bg-leather-50 border-b border-leather-200">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-1 min-w-[80px] py-4 text-sm font-bold tracking-wide uppercase transition-colors relative
              ${activeCategory === cat.id 
                ? 'text-amber-700 bg-white' 
                : 'text-leather-500 hover:text-leather-800 hover:bg-leather-100'
              }`}
          >
            {cat.label}
            {activeCategory === cat.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></div>
            )}
            {currentOutfit[cat.id] && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500"></div>
            )}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-4 bg-leather-50/50">
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map(item => {
            const isSelected = currentOutfit[activeCategory]?.id === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => onUpdateOutfit(item)}
                className={`group relative bg-white rounded-lg border-2 cursor-pointer transition-all overflow-hidden
                  ${isSelected 
                    ? 'border-amber-500 ring-2 ring-amber-200' 
                    : 'border-transparent hover:border-leather-300 shadow-sm'
                  }`}
              >
                <div className="aspect-square bg-gray-100 relative">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <p className="text-white text-xs truncate">{item.description}</p>
                    </div>
                </div>
                
                <div className="p-3">
                  <p className="text-xs text-amber-700 font-bold uppercase mb-1">{item.brand}</p>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight mb-2 h-10 overflow-hidden">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">${item.price}</span>
                    {isSelected && <div className="bg-amber-500 text-white p-1 rounded-full"><Check className="w-3 h-3" /></div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredItems.length === 0 && (
            <div className="h-40 flex items-center justify-center text-leather-400">
                <p>No hay items disponibles</p>
            </div>
        )}
      </div>

      {/* Selected Item Summary for Active Category */}
      {currentOutfit[activeCategory] ? (
        <div className="p-3 bg-amber-50 border-t border-amber-100 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded bg-white border border-amber-200 shrink-0">
                <img src={currentOutfit[activeCategory]?.image} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-amber-800 font-bold">Seleccionado:</p>
              <p className="text-sm text-leather-900 truncate">{currentOutfit[activeCategory]?.name}</p>
            </div>
          </div>
          <button 
            onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(activeCategory);
            }}
            className="p-2 hover:bg-amber-100 rounded-full text-amber-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
          Nada seleccionado en esta categoría
        </div>
      )}
    </div>
  );
};

export default Wardrobe;