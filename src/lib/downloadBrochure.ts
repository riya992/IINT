import iintBrochureImg from "../assets/images/iint_official_brochure_2026.png";

const DEFAULT_FILENAME = "IINT_Official_Admission_Brochure.png";

export function downloadIINTBrochure(
  filename = DEFAULT_FILENAME
): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = iintBrochureImg;

    const triggerDirectDownload = () => {
      const link = document.createElement("a");
      link.href = iintBrochureImg;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resolve(true);
    };

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 1200;
        canvas.height = img.naturalHeight || 1600;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          triggerDirectDownload();
          return;
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve(true);
      } catch {
        triggerDirectDownload();
      }
    };

    img.onerror = () => {
      triggerDirectDownload();
    };
  });
}
