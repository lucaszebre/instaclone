import { createImage } from "./crop";

export async function modifyImageProperties(imageUrl: string, filter: string): Promise<string | null> {
  try {
    // Load the image
    const image = await createImage(imageUrl);

    // Create a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match image dimensions
    canvas.width = image.width;
    canvas.height = image.height;
    if(ctx){
         // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Apply modifications
    ctx.filter = filter;

    // Draw the modified image onto the canvas
    ctx.drawImage(image, 0, 0);
        }
   

    // Convert canvas to blob
    const blob = await new Promise<Blob | null>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      });
    });

    // Create blob URL
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error modifying image properties:', error);
    return null;
  }
}
