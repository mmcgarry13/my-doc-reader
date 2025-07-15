import { useState, ChangeEvent } from 'react';
import mammoth from 'mammoth';
import Footer from './components/Footer';

import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';

GlobalWorkerOptions.workerSrc = workerSrc;
// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [htmlContent, setHtmlContent] = useState<string>('');

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.docx')) {
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setHtmlContent(result.value);
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (file.name.endsWith('.pdf')) {
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result instanceof ArrayBuffer) {
          const typedarray = new Uint8Array(result);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

          let html = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map((item: any) => item.str).join(' ');
            html += `<p>${text}</p>`;
          }

          setHtmlContent(html);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file type. Please upload a PDF or DOCX file.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload PDF or DOCX</h1>
      <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} />
      <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
        <h2>HTML Output</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <Footer />
    </div>
    
  );
}

export default App;