import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditableImage({ link, setLink }) {
  const [error, setError] = useState(false);
  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length == 1) {
      const data = new FormData();
      const API_ENDPOINT =
        "https://qwcopx6bih.execute-api.us-east-1.amazonaws.com/default/getPresignedUrl-food-app";
      const bucket = "anirudh-food-ordering";

      let key = "";
      const getPresignedUrl = async () => {
        const response = await axios({
          method: "GET",
          url: API_ENDPOINT,
        });
        // return response;
        const preSignedUrl = response.data.presignedUrl;
        key = response.data.key;

        return preSignedUrl;
      };
      const presignedUrl = await getPresignedUrl();
      const uploadResponse = await axios.put(presignedUrl, files[0], {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
      if (uploadResponse.status !== 200) {
        toast.error("Upload Error");
        setError(true);
      }
      if (!error) {
        const link = "https://" + bucket + ".s3.amazonaws.com/" + key;
        setLink(link);
      }

      // data.set("file", files[0]);
      // toast("Uploading...");
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: data,
      // });
      // const link = await response.json();
      // setLink(link);
      // if (response.ok) {
      //   toast.success("Upload Complete");
      // } else {
      //   toast.error("Upload Error");
      // }
    }
    if (!error) {
      toast.success("Upload Complete");
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
