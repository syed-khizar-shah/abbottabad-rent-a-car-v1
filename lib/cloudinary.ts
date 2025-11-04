import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File | Buffer, folder: string = 'abbottabad-rent-a-car/cars'): Promise<string> {
  let buffer: Buffer;

  // Handle both File and Buffer inputs
  if (file instanceof Buffer) {
    buffer = file;
  } else {
    // Handle File object from FormData
    // Next.js FormData returns File objects, but we need to convert to Buffer
    try {
      // Method 1: Try arrayBuffer() (standard File API)
      if ('arrayBuffer' in file && typeof file.arrayBuffer === 'function') {
        const bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes);
      } 
      // Method 2: Try stream() (alternative File API)
      else if ('stream' in file && typeof file.stream === 'function') {
        const stream = file.stream();
        const reader = stream.getReader();
        const chunks: Uint8Array[] = [];
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) chunks.push(value);
        }
        buffer = Buffer.concat(chunks);
      }
      // Method 3: Convert to Blob and use arrayBuffer
      else {
        const blob = file instanceof Blob ? file : new Blob([file]);
        const arrayBuffer = await blob.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
      }
    } catch (error) {
      console.error('Error converting file to buffer:', error);
      throw new Error('Failed to process image file');
    }
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || '');
        }
      }
    );

    uploadStream.end(buffer);
  });
}

export async function deleteImage(imageUrl: string, folder: string = 'abbottabad-rent-a-car/cars'): Promise<void> {
  try {
    // Extract public_id from URL
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1];
    const publicId = `${folder}/${filename.split('.')[0]}`;
    
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    // Don't throw - we don't want to fail the whole operation if image deletion fails
  }
}

export default cloudinary;

