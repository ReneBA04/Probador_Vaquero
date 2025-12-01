import { GoogleGenAI } from "@google/genai";
import { SelectedOutfit } from "../types";

// Helper to remove the data URL prefix
const stripBase64Prefix = (dataUrl: string) => {
  return dataUrl.split(',')[1];
};

export const generateTryOnImage = async (
  baseImage: string,
  outfit: SelectedOutfit
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing from environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Construct the prompt based on selected items
  let outfitDescription = "";
  
  if (outfit.hat) outfitDescription += `Sombrero: ${outfit.hat.description}. `;
  if (outfit.shirt) outfitDescription += `Camisa: ${outfit.shirt.description}. `;
  if (outfit.jeans) outfitDescription += `Pantalones: ${outfit.jeans.description}. `;
  if (outfit.belt) outfitDescription += `Cinturón: ${outfit.belt.description}. `;
  if (outfit.boots) outfitDescription += `Botas: ${outfit.boots.description}. `;

  const prompt = `
    Actúa como un editor de moda profesional.
    
    Instrucción: Edita la imagen proporcionada para vestir a la persona con el siguiente atuendo estilo vaquero (western), reemplazando su ropa actual.
    
    Detalles del atuendo:
    ${outfitDescription}
    
    Requisitos Críticos:
    1. Mantén intactos los rasgos faciales, la identidad, la postura corporal, la iluminación original y el fondo de la imagen. Solo cambia la ropa.
    2. La ropa debe ajustarse perfectamente al cuerpo de la persona de manera realista (arrugas, sombras, texturas de tela/cuero).
    3. Asegura que el estilo sea coherente y fotorrealista.
    4. Si hay partes del cuerpo ocultas (ej. pies), infiere la posición de las botas de manera natural.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt
          },
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming upload is converted/handled as jpeg or png. The API handles standard types.
              data: stripBase64Prefix(baseImage)
            }
          }
        ]
      }
    });

    // Check for inline data (image) in response
    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(p => p.inlineData);

    if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
      return `data:${imagePart.inlineData.mimeType || 'image/jpeg'};base64,${imagePart.inlineData.data}`;
    }

    throw new Error("No se generó ninguna imagen. Intenta de nuevo.");

  } catch (error) {
    console.error("Error generating try-on image:", error);
    throw error;
  }
};