import { lazy } from "react";
import { Fragment, Suspense } from "react";
import { LoadingScreen } from "./utils/loadingScreen";
import { Route, Routes } from "react-router-dom";
import { useValidateContext } from "./utils/customHooks";

const routesConfig: RoutesType[] = [
  {
    id: "root",
    path: "/*",
    //guard: GuardRole(["ADMIN"]),
    component: lazy(() => import("src/pages/mainPage")),
  },
  {
    id: "registerin",
    path: "/registerin",
    //guard: GuardRole(["ADMIN"]),
    component: lazy(() => import("src/pages/registerEntrace")),
  },
  {
    id: "waitlist",
    path: "/waitlist",
    //guard: GuardRole(["ADMIN"]),
    component: lazy(() => import("src/pages/waitList")),
  },
  {
    id: "registerout",
    path: "/registerout",
    //guard: GuardRole(["ADMIN"]),
    component: lazy(() => import("src/pages/registerExit")),
  },
  {
    id: "employeemanager",
    path: "/employeemanager",
    //guard: GuardRole(["ADMIN"]),
    component: lazy(() => import("src/pages/employeeManager")),
  },
];

const renderRoutes = (routes: RoutesType[]) => routes ? (
    <Suspense fallback={<LoadingScreen/>}>
      <Routes>
        {routes.map(route => {
          const Guard = route.guard || Fragment
          const Component = route.component
          return (
            <Route 
              key={route.id} 
              path={route.path ?? ""}
              element={
                <Guard>
                  {route.routes ? renderRoutes(route.routes): <Component/>}
                </Guard>
              }
            />
          )
        })}
      </Routes>
    </Suspense>
): null

const RenderRoutes = () => {
  useValidateContext()
  return renderRoutes(routesConfig)
}

export default RenderRoutes