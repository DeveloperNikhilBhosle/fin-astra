declare module 'html2pdf.js' {
    function html2pdf(element: HTMLElement): {
        from: (element: HTMLElement) => {
            set: (options: object) => any;
            save: (filename?: string) => Promise<void>;
        };
    }
    export = html2pdf;
}
