
// Files Imports
import * as configure from "@api/configure";
import * as API_000 from "@api/root/src/server/api/commerce/create-checkout-session/POST.ts";
import * as API_001 from "@api/root/src/server/api/contact/POST.ts";
import * as API_002 from "@api/root/src/server/api/debug/users/GET.ts";
import * as API_003 from "@api/root/src/server/api/health/GET.ts";
import * as API_004 from "@api/root/src/server/api/newsletter/POST.ts";

// Public RESTful API Methods and Paths
// This section describes the available HTTP methods and their corresponding endpoints (paths).
// POST /api/commerce/create-checkout-session/    src/server/api/commerce/create-checkout-session/POST.ts
// POST /api/contact/                             src/server/api/contact/POST.ts
// GET  /api/debug/users/                         src/server/api/debug/users/GET.ts
// GET  /api/health/                              src/server/api/health/GET.ts
// POST /api/newsletter/                          src/server/api/newsletter/POST.ts

const internal  = [
  API_000.default  && { cb: API_000.default , method: "post" , route: "/commerce/create-checkout-session/" , url: "/api/commerce/create-checkout-session/" , source: "src/server/api/commerce/create-checkout-session/POST.ts" },
  API_001.default  && { cb: API_001.default , method: "post" , route: "/contact/"                          , url: "/api/contact/"                          , source: "src/server/api/contact/POST.ts"                          },
  API_002.default  && { cb: API_002.default , method: "get"  , route: "/debug/users/"                      , url: "/api/debug/users/"                      , source: "src/server/api/debug/users/GET.ts"                       },
  API_003.default  && { cb: API_003.default , method: "get"  , route: "/health/"                           , url: "/api/health/"                           , source: "src/server/api/health/GET.ts"                            },
  API_004.default  && { cb: API_004.default , method: "post" , route: "/newsletter/"                       , url: "/api/newsletter/"                       , source: "src/server/api/newsletter/POST.ts"                       }
].filter(it => it);

export const routers = internal.map((it) => {
  const { method, route, url, source } = it;
  return { method, url, route, source };
});

export const endpoints = internal.map(
  (it) => it.method?.toUpperCase() + "\t" + it.url
);

export const applyRouters = (applyRouter) => {
  internal.forEach((it) => {
    it.cb = configure.callbackBefore?.(it.cb, it) || it.cb;
    applyRouter(it);
  });
};

