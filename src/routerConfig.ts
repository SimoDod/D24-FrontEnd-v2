export const routePaths = {
  authentication: { label: "", path: "/authentication" },
  dashboard: {
    label: "navMenu.dashboard",
    path: "/",
    reportPath: "/report/",
    reportNumber: "/report/:reportNumber",
    pathNew: "/report/new",
    new: "new",
  },
  gettingStarted: { label: "navMenu.gettingStarted", path: "/getting-started" },
  adminPanel: {
    label: "navMenu.adminPanel",
    path: "/admins",
  },
  notFound: {
    path: "/404",
  },
} as const;
