export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/issues/list",
    "/dashboard/issues/new",
    "/dashboard/issues/edit/:id+",
  ],
};
