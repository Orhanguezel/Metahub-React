import React, { useState } from "react";
import styled from "styled-components";
import { Globe, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as MdIcons from "react-icons/md";
import { ModuleStatusToggle } from "@/modules/adminmodules";
import {
  updateAdminModule,
  updateTenantModuleSetting,
} from "@/modules/adminmodules/slices/adminModuleSlice";
import { useAppDispatch } from "@/store/hooks";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import { toast } from "react-toastify";

const dynamicIcon = (iconName) =>
  iconName && MdIcons[iconName] ? MdIcons[iconName] : MdIcons.MdSettings;

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

// --- SADELEŞTİRİLMİŞ ve temiz ayrımlı kart ---
export default function ModuleCard({
  module,
  search = "",
  type = "global", // "global" | "tenant"
  onShowDetail, // (modül, type) => { ... }
  onDelete, // sadece global
  onAfterAction,
}) {
  const { t } = useTranslation("adminModules");
  const lang = getCurrentLocale();
  const dispatch = useAppDispatch();
  const [updatingModuleKey, setUpdatingModuleKey] = useState(null);

  const isGlobal = type === "global";
  const moduleKey = isGlobal ? module.name : module.module;

  // Global meta: label çoklu dil, tenantta sadece name/module
  let moduleLabel = isGlobal
    ? (module.label?.[lang] && module.label[lang].trim()) ||
      (module.label?.en && module.label.en.trim()) ||
      module.name ||
      ""
    : moduleKey;

  const IconComponent = dynamicIcon(module.icon);

  // --- Sadece globalde silme ---
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (isGlobal && onDelete) onDelete(moduleKey);
  };

  // --- Toggle sadece mevcut alanlarda çalışır (globalde SADECE enabled!) ---
  const handleToggle = async (key) => {
    setUpdatingModuleKey(moduleKey);
    try {
      if (!isGlobal) {
        await dispatch(
          updateTenantModuleSetting({ module: moduleKey, [key]: !module[key] })
        ).unwrap();
      } else {
        await dispatch(
          updateAdminModule({
            name: moduleKey,
            updates: { [key]: !module[key] },
          })
        ).unwrap();
      }
      if (typeof onAfterAction === "function") onAfterAction();
    } catch (err) {
      toast.error("Güncelleme hatası!", err);
    } finally {
      setUpdatingModuleKey(null);
    }
  };

  // --- Karta tıklayınca parent'a "modül ve tipi" ilet ---
  const handleCardClick = () => {
    if (typeof onShowDetail === "function") {
      onShowDetail(module, type);
    }
  };

  // --- Sadece globalde route/history (short) göster ---
  const shownRoutes =
    isGlobal && Array.isArray(module.routes) && module.routes.length > 0
      ? module.routes.slice(-5)
      : [];
  const shownHistory =
    isGlobal && Array.isArray(module.history) && module.history.length > 0
      ? module.history.slice(-5)
      : [];

  return (
    <Card onClick={handleCardClick} tabIndex={0}>
      <CardHeader>
        <IconWrapper>
          <IconComponent />
        </IconWrapper>
        <ModuleInfo>
          <LabelText title={moduleLabel}>
            {highlightMatch(moduleLabel, search)}
          </LabelText>
          <NameText title={moduleKey}>
            {highlightMatch(moduleKey, search)}
          </NameText>
        </ModuleInfo>
        <CardBadges>
          {isGlobal ? (
            <BadgeGlobal title={t("global", "Global Meta")}>
              <Globe size={13} style={{ marginRight: 2 }} />
              {t("global", "Global")}
            </BadgeGlobal>
          ) : (
            <BadgeTenant>
              {module.tenant ? module.tenant : t("tenant", "Tenant")}
            </BadgeTenant>
          )}
        </CardBadges>
        <Actions>
          {isGlobal && (
            <TrashButton
              onClick={handleDeleteClick}
              title={t("delete", "Delete Module")}
            >
              <Trash2 size={18} />
            </TrashButton>
          )}
        </Actions>
      </CardHeader>

      <Divider />

      {/* --- TOGGLE GRUBU --- */}
      <StatusGroup>
        {/* GLOBAL: SADECE enabled */}
        {isGlobal && "enabled" in module && (
          <StatusItem>
            <span>{t("enabled", "Enabled")}</span>
            <ModuleStatusToggle
              isActive={!!module.enabled}
              onToggle={() => handleToggle("enabled")}
              disabled={updatingModuleKey === moduleKey}
            />
          </StatusItem>
        )}

        {/* TENANT: sadece modelde olan alanlar */}
        {!isGlobal && (
          <>
            {"enabled" in module && (
              <StatusItem>
                <span>{t("enabled", "Enabled")}</span>
                <ModuleStatusToggle
                  isActive={!!module.enabled}
                  onToggle={() => handleToggle("enabled")}
                  disabled={updatingModuleKey === moduleKey}
                />
              </StatusItem>
            )}
            {"visibleInSidebar" in module && (
              <StatusItem>
                <span>{t("visibleInSidebar", "Sidebar")}</span>
                <ModuleStatusToggle
                  isActive={!!module.visibleInSidebar}
                  onToggle={() => handleToggle("visibleInSidebar")}
                  disabled={updatingModuleKey === moduleKey}
                />
              </StatusItem>
            )}
            {"useAnalytics" in module && (
              <StatusItem>
                <span>{t("useAnalytics", "Analytics")}</span>
                <ModuleStatusToggle
                  isActive={!!module.useAnalytics}
                  onToggle={() => handleToggle("useAnalytics")}
                  disabled={updatingModuleKey === moduleKey}
                />
              </StatusItem>
            )}
            {"showInDashboard" in module && (
              <StatusItem>
                <span>{t("showInDashboard", "Dashboard")}</span>
                <ModuleStatusToggle
                  isActive={!!module.showInDashboard}
                  onToggle={() => handleToggle("showInDashboard")}
                  disabled={updatingModuleKey === moduleKey}
                />
              </StatusItem>
            )}
          </>
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

      {/* --- Sadece global meta'da route/history göster --- */}
      {isGlobal && shownRoutes.length > 0 && (
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

      {isGlobal && shownHistory.length > 0 && (
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
          href={`/api-docs/#/${moduleKey}`}
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

const CardBadges = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const BadgeTenant = styled.span`
  background: ${({ theme }) => theme.colors.info};
  color: #fff;
  font-size: 11px;
  border-radius: 7px;
  padding: 1px 8px;
  font-weight: 600;
`;

const BadgeGlobal = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 11px;
  border-radius: 7px;
  padding: 1px 8px;
  font-weight: 600;
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
