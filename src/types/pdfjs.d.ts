declare module 'pdfjs-dist/build/pdf.mjs' {
  export const GlobalWorkerOptions: {
    workerSrc: string;
  };
  export function getDocument(src: any): {
    promise: Promise<any>;
    destroy(): Promise<void>;
  };
  export class TextLayer {
    constructor(options: {
      textContentSource: any;
      container: HTMLElement;
      viewport: any;
    });
    render(): Promise<void>;
    cancel(): void;
  }
  export const version: string;
}
