export declare const suppertedFormats: string[];
interface Props {
    width: number;
    height: number;
    file: File;
}
/**
 * @desc 이미지 파일 resizer
 */
export declare const resizeImageFile: ({ file, width, height }: Props) => Promise<File>;
export {};
