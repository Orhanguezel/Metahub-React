import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const modules = [
  {
    key: "users",
    label: "Kullanıcılar",
    description: "Tüm kullanıcıları yönet",
    link: "/admin/users",
  },
  {
    key: "products",
    label: "Ürünler",
    description: "Ürünleri görüntüle ve yönet",
    link: "/admin/products",
  },
  {
    key: "orders",
    label: "Siparişler",
    description: "Sipariş takibi ve yönetimi",
    link: "/admin/orders",
  },
  {
    key: "revenue",
    label: "Gelir",
    description: "Satış ve gelir raporları",
    link: "/admin/revenue",
  },
  {
    key: "feedbacks",
    label: "Geri Bildirimler",
    description: "Müşteri geri bildirimlerini görüntüle",
    link: "/admin/feedbacks",
  },
];

const AdminDashboardPage = () => (
  <Main>
    <Title>Admin Paneli</Title>
    <Grid>
      {modules.map((mod) => (
        <Link
          to={mod.link}
          key={mod.key}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card tabIndex={0}>
            <Label>{mod.label}</Label>
            <Description>{mod.description}</Description>
          </Card>
        </Link>
      ))}
    </Grid>
  </Main>
);

export default AdminDashboardPage;

// --- Styled Components ---
const Main = styled.div`
  width: 100%;
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary || "#222"};
  letter-spacing: 0.03em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background || "#fff"};
  border-radius: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.12s;
  &:hover,
  &:focus {
    box-shadow: 0 6px 20px rgba(44, 55, 125, 0.13);
  }
`;

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary || "#888"};
  font-size: 0.95rem;
  text-align: center;
`;
