import { registerApplication, start } from "single-spa";

// const applications = constructApplications({
//   routes,
//   loadApp: ({ name }) => import(/* webpackIgnore: true */ name),
// });
// // // Delay starting the layout engine until the styleguide CSS is loaded
// const layoutEngine = constructLayoutEngine({
//   routes,
//   applications,
//   active: false,
// });

// applications.forEach(registerApplication);
registerApplication({
  name: "@react-mf/navbar",
  app: () => import(/* webpackIgnore: true */ "@react-mf/navbar"),
  activeWhen: ["/"],
});
registerApplication({
  name: "@react-mf/people",
  app: () => import("@react-mf/people"),
  activeWhen: (location) => {
    // 在 /people 路径或当应用已被手动激活时激活
    return (
      location.pathname.startsWith("/people") ||
      window.activatedApps?.includes("@react-mf/people")
    );
  },
});
registerApplication({
  name: "@react-mf/planets",
  app: () => import("@react-mf/planets"),
  activeWhen: (location) => {
    // 在 /people 路径或当应用已被手动激活时激活
    return (
      location.pathname.startsWith("/planets") ||
      window.activatedApps?.includes("@react-mf/planets")
    );
  },
});
window.activatedApps = window.activatedApps || [];

window.activateApp = function (appName) {
  if (!window.activatedApps.includes(appName)) {
    window.activatedApps.push(appName);
    // 触发 single-spa 重新检查应用状态
    window.dispatchEvent(new Event("single-spa:routing-event"));
  }
};
import(/* webpackIgnore: true */ "@react-mf/styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  // layoutEngine.activate();
  start();
});
