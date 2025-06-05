import React, { useRef, useState } from "react";
import {
  Wrapper,
  ImagePreview,
  FileInput,
  Button,
} from "@/modules/users/public/styles/AccountStyles";
import { getImageSrc } from "@/shared/getImageSrc";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfileImage } from "@/modules/users/slice/accountSlice";
import { toast } from "react-toastify";

export default function ProfileImageUploader({
  value,
  defaultImage = undefined,
  folder = "profile",
  disabled = false,
}) {
  const fileInputRef = useRef();
  const dispatch = useAppDispatch();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Redux profil state'den yeni resmi anında çek
  const currentProfileImage = useAppSelector((state) => state.account.profile?.profileImage);

  // En güncel görsel yolu
  const imageSrc =
    preview ||
    (typeof value === "string"
      ? getImageSrc(value, folder)
      : value?.url
      ? getImageSrc(value.url, folder)
      : currentProfileImage?.url
      ? getImageSrc(currentProfileImage.url, folder)
      : defaultImage
      ? getImageSrc(defaultImage, folder)
      : getImageSrc(undefined, folder));

  // Dosya seçildiğinde hem preview hem upload işlemi
  const handleFileChange = async (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setUploading(true);
      try {
        await dispatch(updateProfileImage(file)).unwrap();
        toast.success("Profile image updated!");
      } catch (err) {
        toast.error("Upload failed",err);
        setPreview(null);
      }
      setUploading(false);
    }
  };

  return (
    <Wrapper>
      <ImagePreview src={imageSrc} alt="profile" />
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        disabled={disabled || uploading}
        onChange={handleFileChange}
      />
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </Wrapper>
  );
}
