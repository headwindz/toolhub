export function TextExtractorKnowledge() {
  return (
    <div className="space-y-4 text-sm leading-relaxed p-6">
      <div>
        <h4 className="font-semibold text-base mb-2">
          What is OCR (Optical Character Recognition)?
        </h4>
        <p className="text-muted-foreground">
          OCR is technology that converts different types of documents—such as
          scanned paper documents, PDF files, or images captured by a digital
          camera—into editable and searchable text data. It uses pattern
          recognition, artificial intelligence, and computer vision to identify
          and extract text characters from images.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">How It Works</h4>
        <p className="text-muted-foreground">
          OCR systems analyze the structure of an image, breaking it down into
          lines, words, and individual characters. The software compares these
          shapes against a database of character patterns, using machine
          learning algorithms to improve accuracy. Modern OCR can recognize
          various fonts, sizes, and even handwritten text with reasonable
          accuracy.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Common Use Cases</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Document Digitization:</strong> Convert physical documents
            into digital, searchable archives
          </li>
          <li>
            <strong>Data Entry Automation:</strong> Extract information from
            forms, receipts, and invoices
          </li>
          <li>
            <strong>Accessibility:</strong> Convert images to text for screen
            readers and text-to-speech
          </li>
          <li>
            <strong>Translation:</strong> Extract text from images for language
            translation
          </li>
          <li>
            <strong>Content Extraction:</strong> Copy text from screenshots,
            photos, and PDFs
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Tips for Best Results</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>High Resolution:</strong> Use images with at least 300 DPI
            for optimal accuracy
          </li>
          <li>
            <strong>Good Lighting:</strong> Ensure text is clearly visible with
            good contrast
          </li>
          <li>
            <strong>Straight Alignment:</strong> Keep text horizontal and avoid
            skewed angles
          </li>
          <li>
            <strong>Clean Images:</strong> Reduce noise, blur, and distortions
          </li>
          <li>
            <strong>Standard Fonts:</strong> Clear, standard fonts work better
            than decorative ones
          </li>
        </ul>
      </div>
      <div className="border rounded-lg bg-purple-500/10 border-purple-500/50 p-4">
        <h4 className="font-semibold text-base mb-2 text-purple-900 dark:text-purple-100">
          💡 Important Notes
        </h4>
        <ul className="list-disc space-y-1 text-sm pl-5 text-purple-900/80 dark:text-purple-100/80">
          <li>
            OCR accuracy varies based on image quality and text complexity
          </li>
          <li>
            All processing happens in your browser - images are not uploaded
          </li>
          <li>Handwritten text may have lower accuracy than printed text</li>
          <li>
            Review extracted text for errors, especially with poor quality
            images
          </li>
        </ul>
      </div>
    </div>
  );
}
