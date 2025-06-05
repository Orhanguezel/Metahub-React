import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getImageSrc } from "./getImageSrc";

const ImageUploadWithPreview = ({
  max = 5,
  defaultImages = [],
  onChange,
  folder = "blog",
}) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState(defaultImages);
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    setExistingImages(defaultImages || []);
  }, [defaultImages]);

  useEffect(() => {
    if (onChange) {
      onChange(files, removedImages, existingImages);
    }
  }, [files, removedImages, existingImages, onChange]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    const total = files.length + existingImages.length + newFiles.length;
    if (total > max) return;
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setRemovedImages((prev) => [...prev, url]);
  };

  return (
    <Wrapper>
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />
      <UploadButton
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={files.length + existingImages.length >= max}
      >
        + {files.length + existingImages.length}/{max}
      </UploadButton>
      <PreviewGrid>
        {existingImages.map((url, i) => (
          <PreviewBox key={`existing-${i}`}>
            <RemoveBtn type="button" onClick={() => removeExistingImage(url)}>
              ×
            </RemoveBtn>
            <ImagePreview src={getImageSrc(url, folder)} alt={`image-${i}`} />
          </PreviewBox>
        ))}
        {previews.map((src, i) => (
          <PreviewBox key={`preview-${i}`}>
            <RemoveBtn type="button" onClick={() => removeNewImage(i)}>
              ×
            </RemoveBtn>
            <ImagePreview src={src} alt={`preview-${i}`} />
          </PreviewBox>
        ))}
      </PreviewGrid>
    </Wrapper>
  );
};

export default ImageUploadWithPreview;


const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const FileInput = styled.input``;
const UploadButton = styled.button`
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.disabled : theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: ${({ theme }) => theme.transition.normal};
  &:hover {
    background: ${({ theme, disabled }) =>
      disabled ? theme.colors.disabled : theme.buttons.primary.backgroundHover};
  }
`;
const PreviewGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;
const PreviewBox = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${({ theme }) => theme.buttons.danger.background};
  color: ${({ theme }) => theme.buttons.danger.text};
  border: none;
  border-radius: ${({ theme }) => theme.radii.circle};
  width: 24px;
  height: 24px;
  font-weight: bold;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  &:hover {
    background: ${({ theme }) => theme.buttons.danger.backgroundHover};
  }
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
