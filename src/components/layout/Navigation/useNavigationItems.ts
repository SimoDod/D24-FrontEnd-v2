import {
  faGear,
  faHome,
  faLightbulb,
  faRightFromBracket,
  faScrewdriver,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { routePaths } from "../../../routerConfig";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

type MenuItem = {
  label: string;
  icon: IconDefinition;
  isActive?: boolean;
  onClick: () => void;
};

const useNavigationItems = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useLogout();
  const { pathname } = useLocation();

  const navMenuItems: MenuItem[] = [
    {
      label: t(routePaths.dashboard.label),
      icon: faHome,
      isActive: routePaths.dashboard.path === pathname,
      onClick: () => navigate(routePaths.dashboard.path),
    },
    {
      label: t(routePaths.gettingStarted.label),
      icon: faLightbulb,
      isActive: routePaths.gettingStarted.path === pathname,
      onClick: () => navigate(routePaths.gettingStarted.path),
    },
    {
      label: t(routePaths.adminPanel.label),
      icon: faScrewdriver,
      isActive: routePaths.adminPanel.path === pathname,
      onClick: () => navigate(routePaths.adminPanel.path),
    },
  ];

  const profileMenuItems: MenuItem[] = [
    {
      label: t("profileMenu.profile"),
      icon: faUser,
      onClick: () => {},
    },
    {
      label: t("profileMenu.settings"),
      icon: faGear,
      onClick: () => {},
    },
    {
      label: t("profileMenu.logout"),
      icon: faRightFromBracket,
      onClick: () => logout(),
    },
  ];

  return { navMenuItems, profileMenuItems };
};

export default useNavigationItems;
