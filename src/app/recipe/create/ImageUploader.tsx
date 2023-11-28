import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDropzone } from "@uploadthing/react/hooks";
import { useUploadThing } from "~/app/lib/uploadthing";
import { SetStateAction, useCallback, useState } from "react";

function UploadButton() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: SetStateAction<File[]>) => {
    setFiles(acceptedFiles);
  }, []);
  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "recipeImagesUploader",
    {
      onClientUploadComplete: () => {
        //TODO: Change this to toast notifications
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <Card>
      <CardBody className="h-64 p-4">
        <div
          {...getRootProps()}
          className="flex h-full items-center justify-center rounded-xl border-1 border-dashed border-black"
        >
          <input {...getInputProps()} />
          <p className="text-center">
            <span className="font-bold">Click to upload</span>
            <br />
            or drag and drop files here
          </p>
        </div>
      </CardBody>
      <CardFooter>
        {files.length > 0 && (
          <Button onClick={() => startUpload(files)}>
            Upload {files.length} files
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default function ImageUploader() {
  const { control, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "images",
  });

  return (
    <>
      {fields.map((image, index) => (
        <div>
          <Image
            key={image.id}
            width={200}
            height={200}
            src={`https://utfs.io/f/${getValues(`images.${index}`)}`}
          />
          <Button
            onClick={() => {
              remove(index);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
      <UploadButton />
    </>
  );
}
