import { useCallback } from 'react';

export const useImageProcessor = () => {
  const processImage = useCallback((
    imageSrc: HTMLImageElement,
    threshold: number,
    contrast: number,
    inkColor: string
  ): string => {
    const canvas = document.createElement('canvas');
    canvas.width = imageSrc.width;
    canvas.height = imageSrc.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    ctx.drawImage(imageSrc, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Ekstraksi warna RGB dari nilai Hex
    const hex = inkColor || '#0f2b5c';
    const targetR = parseInt(hex.slice(1, 3), 16);
    const targetG = parseInt(hex.slice(3, 5), 16);
    const targetB = parseInt(hex.slice(5, 7), 16);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Kalkulasi Brightness / Luminance
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      if (brightness > threshold) {
        // Latar belakang kertas terang -> ubah menjadi transparan penuh
        data[i + 3] = 0;
      } else {
        // Garis tinta -> tingkatkan kepekatan & terapkan warna tinta
        let inkFactor = (threshold - brightness) / threshold;
        inkFactor = Math.pow(inkFactor, 1 / contrast);
        const alpha = Math.min(255, Math.max(0, Math.round(inkFactor * 255 * 1.3)));

        data[i] = targetR;
        data[i + 1] = targetG;
        data[i + 2] = targetB;
        data[i + 3] = alpha;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  }, []);

  return { processImage };
};