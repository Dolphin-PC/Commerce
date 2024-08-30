import FileResizer from "react-image-file-resizer";

export const suppertedFormats = ["image/jpeg", "image/png"];

interface Props {
  width: number;
  height: number;
  file: File;
}
const qualityList = [100, 90, 80, 70, 60, 50];

/**
 * @desc 이미지 파일 resizer
 */
export const resizeImageFile = async ({ file, width, height }: Props): Promise<File> => {
  if (!suppertedFormats.includes(file.type)) {
    throw new Error("지원하지 않는 이미지 형식입니다.");
  }

  const orgSize = file.size;

  let res = file;

  console.group("(300*300)파일 압축 테스트 :: WEBP");
  console.log("원본 파일 사이즈", orgSize);
  console.log("원본 파일 확장자", file.type);
  const data = [];
  for await (const quality of qualityList) {
    const resizedFile = await resizeImage({ file, width, height, compressFormat: "WEBP", quality });

    data.push({
      "압축파일 품질": quality,
      "원본파일 사이즈": orgSize,
      "압축된 파일 사이즈": resizedFile.size,
      압축률: (((orgSize - resizedFile.size) / orgSize) * 100).toFixed(2) + "%",
    });

    if (resizedFile.size < orgSize) {
      res = resizedFile;
      break;
    }
  }

  console.table(data);
  console.groupEnd();
  return res;
};

interface ResizeProps extends Props {
  quality: number;
  compressFormat: "JPEG" | "PNG" | "WEBP";
}

const resizeImage = async ({ file, width, height, compressFormat, quality }: ResizeProps): Promise<File> => {
  return new Promise((resolve, reject) => {
    try {
      FileResizer.imageFileResizer(
        file, // image file
        width, // max width
        height, // max height
        compressFormat, // compress format(JPEG | PNG | WEBP)
        quality, // quality
        0, // rotation
        (uri) => {
          // callback
          const res = uri as File;
          resolve(res);
        },
        "file" // output type (base64 | blob | file)
      );
    } catch (err) {
      reject(err);
    }
  });
};

const getImageSize = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = URL.createObjectURL(file);
  });
};
