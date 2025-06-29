"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchAllComments,
  togglePublishComment,
  deleteComment,
  clearCommentMessages,
} from "../../slice/commentSlice";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IComment } from "../../types/comment";
import { CommentDetailsModal } from "../..";

export default function AdminCommentPage() {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("adminComment");
  const lang = i18n.language as "tr" | "en" | "de";

  const { comments, loading, error, pagination } = useAppSelector(
    (state) => state.comments
  );

  const [typeFilter, setTypeFilter] = useState("all");
  const [publishFilter, setPublishFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllComments(currentPage));
    return () => {
      dispatch(clearCommentMessages());
    };
  }, [dispatch, currentPage]);

  const handleToggle = (id: string) => {
    dispatch(togglePublishComment(id));
  };

  const handleDelete = (id: string) => {
    if (confirm(t("confirmDelete"))) {
      dispatch(deleteComment(id));
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredComments = comments.filter((c) => {
    const name =
      typeof c.userId === "object" && "name" in c.userId
        ? c.userId.name
        : c.name;
    const email =
      typeof c.userId === "object" && "email" in c.userId
        ? c.userId.email
        : c.email;
    const matchesType = typeFilter === "all" || c.contentType === typeFilter;
    const matchesStatus =
      publishFilter === "all" ||
      (publishFilter === "published" && c.isPublished) ||
      (publishFilter === "unpublished" && !c.isPublished);
    const matchesSearch = `${name} ${email} ${c.label?.[lang] || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <Wrapper>
      <h1>{t("title")}</h1>

      <FilterBar>
        <label>
          {t("filter.type")}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">{t("filter.allTypes")}</option>
            <option value="blog">Blog</option>
            <option value="product">Product</option>
            <option value="radonarprod">Product</option>
            <option value="service">Service</option>
            <option value="news">News</option>
            <option value="article">Article</option>
          </select>
        </label>

        <label>
          {t("filter.status")}
          <select
            value={publishFilter}
            onChange={(e) => setPublishFilter(e.target.value)}
          >
            <option value="all">{t("filter.allStatus")}</option>
            <option value="published">{t("published")}</option>
            <option value="unpublished">{t("unpublished")}</option>
          </select>
        </label>

        <label>
          {t("filter.search")}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("filter.searchPlaceholder")}
          />
        </label>
      </FilterBar>

      {loading && <p>{t("loading")}</p>}
      {error && <Error>{error}</Error>}
      {!loading && filteredComments.length === 0 && <p>{t("noComments")}</p>}

      {!loading && filteredComments.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <th>{t("contentType")}</th>
                <th>{t("user")}</th>
                <th>{t("email")}</th>
                <th>{t("contentTitle")}</th>
                <th>{t("comment")}</th>
                <th>{t("rating")}</th>
                <th>{t("date")}</th>
                <th>{t("status")}</th>
                <th>{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment) => {
                const user =
                  comment.userId &&
                  typeof comment.userId === "object" &&
                  "name" in comment.userId
                    ? comment.userId
                    : null;
                const content =
                  comment.contentId &&
                  typeof comment.contentId === "object" &&
                  "title" in comment.contentId
                    ? comment.contentId
                    : null;

                return (
                  <tr key={comment._id}>
                    <td>{comment.contentType}</td>
                    <td>{user?.name || comment.name}</td>
                    <td>{user?.email || comment.email}</td>
                    <td>{content?.title?.[lang] || "-"}</td>
                    <td
                      onClick={() => setSelectedComment(comment)}
                      style={{ cursor: "pointer" }}
                    >
                      {comment.label?.[lang] || "-"}
                    </td>
                    <td>{comment.rating ? `${comment.rating} ★` : "-"}</td>
                    <td>
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      {comment.isPublished ? t("published") : t("unpublished")}
                    </td>
                    <td>
                      <button onClick={() => handleToggle(comment._id)}>
                        {t("toggle")}
                      </button>
                      <button onClick={() => handleDelete(comment._id)}>
                        {t("delete")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {selectedComment && (
            <CommentDetailsModal
              comment={selectedComment}
              lang={lang}
              onClose={() => setSelectedComment(null)}
            />
          )}

          {pagination.pages > 1 && (
            <PaginationBar>
              {Array.from({ length: pagination.pages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={pagination.page === i + 1}
                >
                  {i + 1}
                </button>
              ))}
            </PaginationBar>
          )}
        </>
      )}
    </Wrapper>
  );
}

// ✅ Styled Components

const Wrapper = styled.div`
  padding: 2rem;
`;

const Error = styled.div`
  color: red;
  margin-top: 1rem;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1.5rem;

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    gap: 0.25rem;
  }

  input,
  select {
    padding: 0.4rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    min-width: 160px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.cardBackground};
  }

  button {
    margin-right: 0.5rem;
    padding: 0.4rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;

const PaginationBar = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background: ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.textSecondary};
      cursor: default;
    }
  }
`;
