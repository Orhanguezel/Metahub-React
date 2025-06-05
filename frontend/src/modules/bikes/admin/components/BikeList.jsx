import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function BikeList({
  product,
  lang,
  loading,
  error,
  onEdit,
  onDelete,
  onTogglePublish,
}) {
  const { t } = useTranslation("admin");

  if (loading) {
    return (
      <SkeletonWrapper>
        {[...Array(3)].map((_, i) => (
          <SkeletonBox key={i}>{t("loading", "Loading...")}</SkeletonBox>
        ))}
      </SkeletonWrapper>
    );
  }

  if (error) return <ErrorText>❌ {error}</ErrorText>;
  if (!Array.isArray(product)) return null;
  if (product.length === 0)
    return <Empty>{t("product.empty", "No product available.")}</Empty>;

  return (
    <div>
      {product.map((item) => (
        <ProductCard key={item._id}>
          <h2>{item.name?.[lang] || "—"}</h2>
          <p>{item.description?.[lang] || "—"}</p>

          {Array.isArray(item.images) && item.images.length > 0 ? (
            <ImageGrid>
              {item.images.map((img, i) => (
                <img key={i} src={img.url} alt={`product-${i}`} />
              ))}
            </ImageGrid>
          ) : (
            <small>{t("product.no_images", "No images")}</small>
          )}

          <InfoLine><strong>{t("product.brand", "Brand")}:</strong> {item.brand}</InfoLine>
          <InfoLine><strong>{t("product.price", "Price")}:</strong> €{item.price}</InfoLine>
          <InfoLine><strong>{t("product.stock", "Stock")}:</strong> {item.stock}</InfoLine>
          <InfoLine><strong>{t("product.tags", "Tags")}:</strong> {item.tags?.join(", ") || t("none", "None")}</InfoLine>
          <InfoLine><strong>{t("product.publish_status", "Published")}:</strong> {item.isPublished ? t("yes", "Yes") : t("no", "No")}</InfoLine>

          {(onEdit || onDelete || onTogglePublish) && (
            <ButtonGroup>
              {onEdit && <ActionButton onClick={() => onEdit(item)}>{t("edit", "Edit")}</ActionButton>}
              {onDelete && <DeleteButton onClick={() => onDelete(item._id)}>{t("delete", "Delete")}</DeleteButton>}
              {onTogglePublish && (
                <ToggleButton onClick={() => onTogglePublish(item._id, item.isPublished)}>
                  {item.isPublished
                    ? t("product.unpublish", "Unpublish")
                    : t("product.publish", "Publish")}
                </ToggleButton>
              )}
            </ButtonGroup>
          )}
        </ProductCard>
      ))}
    </div>
  );
}

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SkeletonBox = styled.div`
  background-color: ${({ theme }) => theme.colors.skeletonBackground};
  height: 80px;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const ProductCard = styled.div`
  border: ${({ theme }) => theme.borders.thin};
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.card};

  h2 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};

  img {
    width: 120px;
    height: auto;
    border-radius: ${({ theme }) => theme.radii.sm};
    object-fit: cover;
  }
`;

const InfoLine = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
`;

const ToggleButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
`;
