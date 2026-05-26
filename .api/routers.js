
// Files Imports
import * as configure from "@api/configure";
import * as API_000 from "@api/root/src/server/api/auth/callback/[provider]/GET.ts";
import * as API_001 from "@api/root/src/server/api/auth/get-session/GET.ts";
import * as API_002 from "@api/root/src/server/api/auth/request-password-reset/POST.ts";
import * as API_003 from "@api/root/src/server/api/auth/reset-password/POST.ts";
import * as API_004 from "@api/root/src/server/api/auth/sign-in/email/POST.ts";
import * as API_005 from "@api/root/src/server/api/auth/sign-in/social/POST.ts";
import * as API_006 from "@api/root/src/server/api/auth/sign-out/POST.ts";
import * as API_007 from "@api/root/src/server/api/auth/sign-up/email/POST.ts";
import * as API_008 from "@api/root/src/server/api/commerce/create-checkout-session/POST.ts";
import * as API_009 from "@api/root/src/server/api/contact/POST.ts";
import * as API_010 from "@api/root/src/server/api/debug/users/GET.ts";
import * as API_011 from "@api/root/src/server/api/health/GET.ts";
import * as API_012 from "@api/root/src/server/api/newsletter/POST.ts";
import * as API_013 from "@api/root/src/server/api/portal/documents/GET.ts";
import * as API_014 from "@api/root/src/server/api/portal/documents/POST.ts";
import * as API_015 from "@api/root/src/server/api/portal/documents/[id]/DELETE.ts";
import * as API_016 from "@api/root/src/server/api/portal/employees/GET.ts";
import * as API_017 from "@api/root/src/server/api/portal/employees/POST.ts";
import * as API_018 from "@api/root/src/server/api/portal/employees/[id]/PUT.ts";
import * as API_019 from "@api/root/src/server/api/portal/employees/[id]/DELETE.ts";
import * as API_020 from "@api/root/src/server/api/portal/reviews/GET.ts";
import * as API_021 from "@api/root/src/server/api/portal/reviews/POST.ts";
import * as API_022 from "@api/root/src/server/api/portal/reviews/[id]/PUT.ts";
import * as API_023 from "@api/root/src/server/api/portal/stats/GET.ts";
import * as API_024 from "@api/root/src/server/api/portal/time-off/GET.ts";
import * as API_025 from "@api/root/src/server/api/portal/time-off/POST.ts";
import * as API_026 from "@api/root/src/server/api/portal/time-off/[id]/PUT.ts";

// Public RESTful API Methods and Paths
// This section describes the available HTTP methods and their corresponding endpoints (paths).
// GET    /api/auth/callback/:provider/             src/server/api/auth/callback/[provider]/GET.ts
// GET    /api/auth/get-session/                    src/server/api/auth/get-session/GET.ts
// POST   /api/auth/request-password-reset/         src/server/api/auth/request-password-reset/POST.ts
// POST   /api/auth/reset-password/                 src/server/api/auth/reset-password/POST.ts
// POST   /api/auth/sign-in/email/                  src/server/api/auth/sign-in/email/POST.ts
// POST   /api/auth/sign-in/social/                 src/server/api/auth/sign-in/social/POST.ts
// POST   /api/auth/sign-out/                       src/server/api/auth/sign-out/POST.ts
// POST   /api/auth/sign-up/email/                  src/server/api/auth/sign-up/email/POST.ts
// POST   /api/commerce/create-checkout-session/    src/server/api/commerce/create-checkout-session/POST.ts
// POST   /api/contact/                             src/server/api/contact/POST.ts
// GET    /api/debug/users/                         src/server/api/debug/users/GET.ts
// GET    /api/health/                              src/server/api/health/GET.ts
// POST   /api/newsletter/                          src/server/api/newsletter/POST.ts
// GET    /api/portal/documents/                    src/server/api/portal/documents/GET.ts
// POST   /api/portal/documents/                    src/server/api/portal/documents/POST.ts
// DELETE /api/portal/documents/:id/                src/server/api/portal/documents/[id]/DELETE.ts
// GET    /api/portal/employees/                    src/server/api/portal/employees/GET.ts
// POST   /api/portal/employees/                    src/server/api/portal/employees/POST.ts
// PUT    /api/portal/employees/:id/                src/server/api/portal/employees/[id]/PUT.ts
// DELETE /api/portal/employees/:id/                src/server/api/portal/employees/[id]/DELETE.ts
// GET    /api/portal/reviews/                      src/server/api/portal/reviews/GET.ts
// POST   /api/portal/reviews/                      src/server/api/portal/reviews/POST.ts
// PUT    /api/portal/reviews/:id/                  src/server/api/portal/reviews/[id]/PUT.ts
// GET    /api/portal/stats/                        src/server/api/portal/stats/GET.ts
// GET    /api/portal/time-off/                     src/server/api/portal/time-off/GET.ts
// POST   /api/portal/time-off/                     src/server/api/portal/time-off/POST.ts
// PUT    /api/portal/time-off/:id/                 src/server/api/portal/time-off/[id]/PUT.ts

const internal  = [
  API_000.default  && { cb: API_000.default , method: "get"    , route: "/auth/callback/:provider/"          , url: "/api/auth/callback/:provider/"          , source: "src/server/api/auth/callback/[provider]/GET.ts"          },
  API_001.default  && { cb: API_001.default , method: "get"    , route: "/auth/get-session/"                 , url: "/api/auth/get-session/"                 , source: "src/server/api/auth/get-session/GET.ts"                  },
  API_002.default  && { cb: API_002.default , method: "post"   , route: "/auth/request-password-reset/"      , url: "/api/auth/request-password-reset/"      , source: "src/server/api/auth/request-password-reset/POST.ts"      },
  API_003.default  && { cb: API_003.default , method: "post"   , route: "/auth/reset-password/"              , url: "/api/auth/reset-password/"              , source: "src/server/api/auth/reset-password/POST.ts"              },
  API_004.default  && { cb: API_004.default , method: "post"   , route: "/auth/sign-in/email/"               , url: "/api/auth/sign-in/email/"               , source: "src/server/api/auth/sign-in/email/POST.ts"               },
  API_005.default  && { cb: API_005.default , method: "post"   , route: "/auth/sign-in/social/"              , url: "/api/auth/sign-in/social/"              , source: "src/server/api/auth/sign-in/social/POST.ts"              },
  API_006.default  && { cb: API_006.default , method: "post"   , route: "/auth/sign-out/"                    , url: "/api/auth/sign-out/"                    , source: "src/server/api/auth/sign-out/POST.ts"                    },
  API_007.default  && { cb: API_007.default , method: "post"   , route: "/auth/sign-up/email/"               , url: "/api/auth/sign-up/email/"               , source: "src/server/api/auth/sign-up/email/POST.ts"               },
  API_008.default  && { cb: API_008.default , method: "post"   , route: "/commerce/create-checkout-session/" , url: "/api/commerce/create-checkout-session/" , source: "src/server/api/commerce/create-checkout-session/POST.ts" },
  API_009.default  && { cb: API_009.default , method: "post"   , route: "/contact/"                          , url: "/api/contact/"                          , source: "src/server/api/contact/POST.ts"                          },
  API_010.default  && { cb: API_010.default , method: "get"    , route: "/debug/users/"                      , url: "/api/debug/users/"                      , source: "src/server/api/debug/users/GET.ts"                       },
  API_011.default  && { cb: API_011.default , method: "get"    , route: "/health/"                           , url: "/api/health/"                           , source: "src/server/api/health/GET.ts"                            },
  API_012.default  && { cb: API_012.default , method: "post"   , route: "/newsletter/"                       , url: "/api/newsletter/"                       , source: "src/server/api/newsletter/POST.ts"                       },
  API_013.default  && { cb: API_013.default , method: "get"    , route: "/portal/documents/"                 , url: "/api/portal/documents/"                 , source: "src/server/api/portal/documents/GET.ts"                  },
  API_014.default  && { cb: API_014.default , method: "post"   , route: "/portal/documents/"                 , url: "/api/portal/documents/"                 , source: "src/server/api/portal/documents/POST.ts"                 },
  API_015.default  && { cb: API_015.default , method: "delete" , route: "/portal/documents/:id/"             , url: "/api/portal/documents/:id/"             , source: "src/server/api/portal/documents/[id]/DELETE.ts"          },
  API_016.default  && { cb: API_016.default , method: "get"    , route: "/portal/employees/"                 , url: "/api/portal/employees/"                 , source: "src/server/api/portal/employees/GET.ts"                  },
  API_017.default  && { cb: API_017.default , method: "post"   , route: "/portal/employees/"                 , url: "/api/portal/employees/"                 , source: "src/server/api/portal/employees/POST.ts"                 },
  API_018.default  && { cb: API_018.default , method: "put"    , route: "/portal/employees/:id/"             , url: "/api/portal/employees/:id/"             , source: "src/server/api/portal/employees/[id]/PUT.ts"             },
  API_019.default  && { cb: API_019.default , method: "delete" , route: "/portal/employees/:id/"             , url: "/api/portal/employees/:id/"             , source: "src/server/api/portal/employees/[id]/DELETE.ts"          },
  API_020.default  && { cb: API_020.default , method: "get"    , route: "/portal/reviews/"                   , url: "/api/portal/reviews/"                   , source: "src/server/api/portal/reviews/GET.ts"                    },
  API_021.default  && { cb: API_021.default , method: "post"   , route: "/portal/reviews/"                   , url: "/api/portal/reviews/"                   , source: "src/server/api/portal/reviews/POST.ts"                   },
  API_022.default  && { cb: API_022.default , method: "put"    , route: "/portal/reviews/:id/"               , url: "/api/portal/reviews/:id/"               , source: "src/server/api/portal/reviews/[id]/PUT.ts"               },
  API_023.default  && { cb: API_023.default , method: "get"    , route: "/portal/stats/"                     , url: "/api/portal/stats/"                     , source: "src/server/api/portal/stats/GET.ts"                      },
  API_024.default  && { cb: API_024.default , method: "get"    , route: "/portal/time-off/"                  , url: "/api/portal/time-off/"                  , source: "src/server/api/portal/time-off/GET.ts"                   },
  API_025.default  && { cb: API_025.default , method: "post"   , route: "/portal/time-off/"                  , url: "/api/portal/time-off/"                  , source: "src/server/api/portal/time-off/POST.ts"                  },
  API_026.default  && { cb: API_026.default , method: "put"    , route: "/portal/time-off/:id/"              , url: "/api/portal/time-off/:id/"              , source: "src/server/api/portal/time-off/[id]/PUT.ts"              }
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

