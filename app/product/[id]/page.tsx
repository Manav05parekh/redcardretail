import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ProductDetail from "@/components/product-detail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  return (
    <main>
      <Navbar />
      <ProductDetail productId={id} />
      <Footer />
    </main>
  );
}
