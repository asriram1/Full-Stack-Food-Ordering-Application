import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length == 1) {
      const data = new FormData();
      data.set("file", files[0]);
      toast("Uploading...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json();
      setLink(link);
      if (response.ok) {
        toast.success("Upload Complete");
      } else {
        toast.error("Upload Error");
      }
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          width={250}
          height={250}
          src={link}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No Image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className=" block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
          Change Image
        </span>
      </label>
    </>
  );
}
