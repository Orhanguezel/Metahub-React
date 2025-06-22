import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfileImage } from "@/modules/users/slice/accountSlice";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getImageSrc } from "@/shared/getImageSrc";

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
  const currentProfileImage = useAppSelector(
    (state) => state.account.profile?.profileImage
  );

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
        toast.error("Upload failed", err);
        setPreview(null);
      }
      setUploading(false);
    }
  };

  return (
    <Wrapper>
      <Border>
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
      </Border>
    </Wrapper>
  );
}

// Stiller Sayfa Altında
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const Border = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 900px) {
    padding: 16px;
  }
`;

const ImagePreview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 5px solid #00fff7;

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 0.9em 1.8em;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  align-self: center;
  width: auto;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.8em 1.6em;
  }
`;
