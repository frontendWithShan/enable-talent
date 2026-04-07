const JPEG_QUALITY = 0.82;
const MIN_BYTES_FOR_REENCODE = 350 * 1024;

const OPTIMIZATION_PRESETS = {
  cover: {
    maxHeight: 1600,
    maxWidth: 1600,
  },
  inline: {
    maxHeight: 1400,
    maxWidth: 1400,
  },
} as const;

type BlogImageOptimizationKind = keyof typeof OPTIMIZATION_PRESETS;

type LoadedImageSource = {
  cleanup: () => void;
  draw: (context: CanvasRenderingContext2D, width: number, height: number) => void;
  height: number;
  width: number;
};

function isOptimizableMimeType(type: string) {
  return type === "image/jpeg" || type === "image/png";
}

function getOutputMimeType(type: string) {
  return type === "image/png" ? "image/png" : "image/jpeg";
}

function replaceFileExtension(fileName: string, mimeType: string) {
  const extension = mimeType === "image/png" ? ".png" : ".jpg";

  if (/\.[^.]+$/.test(fileName)) {
    return fileName.replace(/\.[^.]+$/, extension);
  }

  return `${fileName}${extension}`;
}

function calculateScaledSize(
  width: number,
  height: number,
  limits: {
    maxHeight: number;
    maxWidth: number;
  },
) {
  const scale = Math.min(1, limits.maxWidth / width, limits.maxHeight / height);

  return {
    height: Math.max(1, Math.round(height * scale)),
    width: Math.max(1, Math.round(width * scale)),
  };
}

async function loadImageSource(file: File): Promise<LoadedImageSource> {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file);

    return {
      cleanup() {
        bitmap.close();
      },
      draw(context, width, height) {
        context.drawImage(bitmap, 0, 0, width, height);
      },
      height: bitmap.height,
      width: bitmap.width,
    };
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Selected image could not be read."));
      nextImage.src = objectUrl;
    });

    return {
      cleanup() {
        URL.revokeObjectURL(objectUrl);
      },
      draw(context, width, height) {
        context.drawImage(image, 0, 0, width, height);
      },
      height: image.naturalHeight,
      width: image.naturalWidth,
    };
  } catch (error) {
    URL.revokeObjectURL(objectUrl);
    throw error;
  }
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number,
) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, mimeType, quality);
  });
}

export async function optimizeBlogImageForUpload(
  file: File,
  kind: BlogImageOptimizationKind,
) {
  if (!isOptimizableMimeType(file.type)) {
    return file;
  }

  const loadedImage = await loadImageSource(file);

  try {
    const limits = OPTIMIZATION_PRESETS[kind];
    const nextSize = calculateScaledSize(loadedImage.width, loadedImage.height, limits);
    const shouldResize =
      nextSize.width < loadedImage.width || nextSize.height < loadedImage.height;
    const shouldReencode =
      file.type === "image/jpeg" && file.size >= MIN_BYTES_FOR_REENCODE;

    if (!shouldResize && !shouldReencode) {
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = nextSize.width;
    canvas.height = nextSize.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Image optimization is not available in this browser.");
    }

    loadedImage.draw(context, nextSize.width, nextSize.height);

    const outputMimeType = getOutputMimeType(file.type);
    const optimizedBlob = await canvasToBlob(
      canvas,
      outputMimeType,
      outputMimeType === "image/jpeg" ? JPEG_QUALITY : undefined,
    );

    if (!optimizedBlob) {
      return file;
    }

    if (!shouldResize && optimizedBlob.size >= file.size) {
      return file;
    }

    return new File(
      [optimizedBlob],
      replaceFileExtension(file.name, outputMimeType),
      {
        lastModified: file.lastModified,
        type: outputMimeType,
      },
    );
  } finally {
    loadedImage.cleanup();
  }
}
