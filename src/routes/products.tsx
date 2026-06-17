// This file is the LAYOUT parent for /products/* routes.
// It only renders the child route via <Outlet />.
// The product listing page lives in products.index.tsx.
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: () => <Outlet />,
});
