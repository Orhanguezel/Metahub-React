import React from "react";
import styled from "styled-components";
import { Globe, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as MdIcons from "react-icons/md";
import { ModuleStatusToggle } from "@/modules/adminmodules";
import {
  updateAdminModule,
  fetchTenantModules,
} from "@/modules/adminmodules/slice/adminModuleSlice";
import { useAppDispatch } from "@/store/hooks";
import { getCurrentLocale } from "@/utils/getCurrentLocale";

// --- Dynamic Icon Handler
const dynamicIcon = (iconName) => {
  if (iconName && MdIcons[iconName]) return MdIcons[iconName];
  return MdIcons.MdSettings;
};

// --- Highlight Search
const highlightMatch = (text, search) => {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <Highlight key={i}>{part}</Highlight>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

export default function ModuleCard({ module, search = "", onClick, onDelete }) {
  const { t } = useTranslation("adminModules");
  const lang = getCurrentLocale();
  const dispatch = useAppDispatch();

  // Label fallback
  const moduleLabel =
    module.label?.[lang]?.trim() ||
    module.label?.en?.trim() ||
    module.name ||
    module.module;

  const IconComponent = dynamicIcon(module.icon);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete && onDelete(module.name || module.module);
  };

  // Her toggle sonrası tüm modülleri tekrar çek!
  const handleToggle = async (key) => {
    try {
      await dispatch(
        updateAdminModule({
          name: module.name || module.module,
          updates: { [key]: !module[key] },
        })
      ).unwrap();
      dispatch(fetchTenantModules(module.tenant));
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  // Son 5 route & history
  const shownRoutes =
    Array.isArray(module.routes) && module.routes.length > 0
      ? module.routes.slice(-5)
      : [];
  const shownHistory =
    Array.isArray(module.history) && module.history.length > 0
      ? module.history.slice(-5)
      : [];

  return (
    <Card onClick={onClick}>
      <CardHeader>
        <IconWrapper>
          <IconComponent />
        </IconWrapper>
        <ModuleInfo>
          <LabelText title={moduleLabel}>
            {highlightMatch(moduleLabel, search)}
          </LabelText>
          <NameText title={module.name || module.module}>
            {highlightMatch(module.name || module.module, search)}
          </NameText>
        </ModuleInfo>
        <Actions>
          <TrashButton
            onClick={handleDeleteClick}
            title={t("delete", "Delete Module")}
          >
            <Trash2 size={18} />
          </TrashButton>
        </Actions>
      </CardHeader>

      <Divider />

      {/* Tüm toggle'lar: enabled, sidebar, analytics, dashboard (varsa) */}
      <StatusGroup>
        <StatusItem>
          <span>{t("enabled", "Enabled")}</span>
          <ModuleStatusToggle
            isActive={!!module.enabled}
            onToggle={() => handleToggle("enabled")}
          />
        </StatusItem>
        <StatusItem>
          <span>{t("visibleInSidebar", "Sidebar")}</span>
          <ModuleStatusToggle
            isActive={!!module.visibleInSidebar}
            onToggle={() => handleToggle("visibleInSidebar")}
          />
        </StatusItem>
        <StatusItem>
          <span>{t("useAnalytics", "Analytics")}</span>
          <ModuleStatusToggle
            isActive={!!module.useAnalytics}
            onToggle={() => handleToggle("useAnalytics")}
          />
        </StatusItem>
        {"showInDashboard" in module && (
          <StatusItem>
            <span>{t("showInDashboard", "Dashboard")}</span>
            <ModuleStatusToggle
              isActive={!!module.showInDashboard}
              onToggle={() => handleToggle("showInDashboard")}
            />
          </StatusItem>
        )}
      </StatusGroup>

      <MetaInfo>
        <small>{t("createdAt", "Created at")}:</small>
        <TimeText>
          {module.createdAt
            ? new Date(module.createdAt).toLocaleString(lang)
            : "-"}
        </TimeText>
        <small>{t("updatedAt", "Updated at")}:</small>
        <TimeText>
          {module.updatedAt
            ? new Date(module.updatedAt).toLocaleString(lang)
            : "-"}
        </TimeText>
      </MetaInfo>

      {shownRoutes.length > 0 && (
        <>
          <Divider />
          <RouteList>
            {shownRoutes.map((r, idx) => (
              <li key={idx}>
                <code>{r.method}</code>
                <span>{r.path}</span>
              </li>
            ))}
            {Array.isArray(module.routes) && module.routes.length > 5 && (
              <li className="more">...{t("andMore", "and more")}</li>
            )}
          </RouteList>
        </>
      )}

      {shownHistory.length > 0 && (
        <>
          <Divider />
          <RouteList>
            <li>
              <strong>{t("history", "Change History")}:</strong>
            </li>
            {shownHistory.map((h, idx) => (
              <li key={idx}>
                <span>
                  {h.date ? new Date(h.date).toLocaleString(lang) : "-"}
                  {h.version && <b> v{h.version}</b>}
                  {h.by && ` (${h.by})`}
                  {h.note && `: ${h.note}`}
                </span>
              </li>
            ))}
            {Array.isArray(module.history) && module.history.length > 5 && (
              <li className="more">...{t("andMore", "and more")}</li>
            )}
          </RouteList>
        </>
      )}

      <CardFooter>
        <SwaggerLink
          href={`/api-docs/#/${module.name || module.module}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe size={16} />
          {t("swagger", "Swagger")}
        </SwaggerLink>
      </CardFooter>
    </Card>
  );
}

// --- Styled Components ---
const Card = styled.div`
  background: ${({ theme }) => theme.cards.background};
  border: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  box-sizing: border-box;
  transition: box-shadow ${({ theme }) => theme.transition.fast};
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    cursor: pointer;
    z-index: 2;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-width: 0;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const ModuleInfo = styled.div`
  flex: 1 1 0;
  min-width: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const TrashButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.danger};
  transition: opacity ${({ theme }) => theme.transition.fast};
  &:hover {
    opacity: 0.7;
  }
`;

const LabelText = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NameText = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Highlight = styled.span`
  background-color: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0 2px;
  animation: highlightFlash 0.8s ease-in-out;
  @keyframes highlightFlash {
    from {
      background-color: transparent;
    }
    to {
      background-color: ${({ theme }) => theme.colors.warning};
    }
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
  margin: 0.3rem 0;
`;

const StatusGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.7rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MetaInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const TimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const RouteList = styled.ul`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
  li {
    display: flex;
    gap: 0.3rem;
    code {
      font-weight: ${({ theme }) => theme.fontWeights.semiBold};
      color: ${({ theme }) => theme.colors.primary};
      white-space: nowrap;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.more {
      font-style: italic;
      opacity: 0.7;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SwaggerLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.link};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transition.fast};
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.linkHover};
  }
`;
