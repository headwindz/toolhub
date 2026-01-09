import { KnowledgeSection } from '@/components/knowledge-section'

export function ImageCompressorKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about image compression"
      description="Understanding image optimization and compression techniques"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is Image compression?</h4>
        <p className="text-muted-foreground">
          Image compression reduces the file size of an image by removing
          redundant data while maintaining acceptable visual quality. This
          process is essential for web performance, storage optimization, and
          faster loading times across devices and networks.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Types of compression</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Lossy compression:</strong> Reduces file size significantly
            by discarding some image data. Best for photos and complex images
            where small quality loss is acceptable (JPEG, WebP).
          </li>
          <li>
            <strong>Lossless compression:</strong> Reduces file size without any
            quality loss. Ideal for graphics, logos, and images requiring pixel
            perfection (PNG, GIF).
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Why compress images?</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Faster page load:</strong> Smaller files download quicker,
            improving user experience and SEO rankings.
          </li>
          <li>
            <strong>Reduced bandwidth:</strong> Lower data usage saves costs for
            both hosting and mobile users.
          </li>
          <li>
            <strong>Better performance:</strong> Compressed images consume less
            memory and process faster.
          </li>
          <li>
            <strong>Storage efficiency:</strong> Save significant disk space
            when storing large image libraries.
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Choosing quality settings</h4>
        <p className="text-muted-foreground">
          The quality slider controls the balance between file size and visual
          quality:
        </p>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>90-100%:</strong> Minimal compression, best for professional
            photography
          </li>
          <li>
            <strong>70-89%:</strong> Good balance for most web images
            (recommended)
          </li>
          <li>
            <strong>50-69%:</strong> Higher compression for thumbnails and
            previews
          </li>
          <li>
            <strong>Below 50%:</strong> Significant quality loss, use sparingly
          </li>
        </ul>
      </div>
      <div className="border rounded-lg bg-blue-500/10 border-blue-500/50 p-4">
        <h4 className="font-semibold text-base mb-2 text-blue-900 dark:text-blue-100">
          💡 Best Practices
        </h4>
        <ul className="list-disc space-y-1 text-sm pl-5 text-blue-900/80 dark:text-blue-100/80">
          <li>Always keep original images as backups before compressing</li>
          <li>
            Use 75-85% quality for most web photos to balance size and quality
          </li>
          <li>Test compressed images across different devices and screens</li>
          <li>
            Consider using modern formats like WebP for better compression
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
