/**
 * @desc 업로드
 */
export declare const upload: (file: File, productId: number) => Promise<string>;
/**
 * @desc 업로드 삭제
 */
export declare const deleteUpload: (fullPaths: string[]) => Promise<void>;
