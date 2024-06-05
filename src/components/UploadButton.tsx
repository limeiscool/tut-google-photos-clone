"use client";

import { Upload } from 'lucide-react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";

import { CloudinaryResource } from '@/types/cloudinary';

import { useResources } from '@/hooks/useResources';


const UploadButton = () => {
  const { addResources } = useResources({
    disableFetch: true
  })

  function handleOnSuccess(results: CloudinaryUploadWidgetResults) {
    addResources([results.info as CloudinaryResource])

  }

  return (
    <CldUploadButton signatureEndpoint="/api/sign-cloudinary-params" options={{
      autoMinimize: true,
      tags: [process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG as string]
    }}
    onSuccess={handleOnSuccess}
     >
      <span className='flex items-center gap-2'>
        <Upload className='w-4 h-4'/> Upload
      </span>
    </CldUploadButton>
  );
}

export default UploadButton;