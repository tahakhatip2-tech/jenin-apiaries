import { createFileRoute } from "@tanstack/react-router";
import { ProductForm, emptyProduct } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/_authenticated/admin/products/new")({
  component: () => <ProductForm initial={emptyProduct} mode="create" />,
});
