import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SizeGuidePage() {
  const sizeChart = [
    { size: "XS", chest: '32-34"', length: '26"', fit: "Extra Slim" },
    { size: "S", chest: '34-36"', length: '27"', fit: "Slim" },
    { size: "M", chest: '38-40"', length: '28"', fit: "Regular" },
    { size: "L", chest: '42-44"', length: '29"', fit: "Regular" },
    { size: "XL", chest: '46-48"', length: '30"', fit: "Relaxed" },
    { size: "XXL", chest: '50-52"', length: '31"', fit: "Relaxed" },
  ]

  return (
    <main>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-light tracking-tight mb-8">Size Guide</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-tight mb-4">Measurements</h2>
          <p className="text-muted-foreground mb-6">
            All measurements are in inches. Find your perfect fit using this guide.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold">Size</th>
                  <th className="text-left py-3 px-3 font-semibold">Chest</th>
                  <th className="text-left py-3 px-3 font-semibold">Length</th>
                  <th className="text-left py-3 px-3 font-semibold">Fit Type</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-3 font-semibold">{row.size}</td>
                    <td className="py-3 px-3">{row.chest}</td>
                    <td className="py-3 px-3">{row.length}</td>
                    <td className="py-3 px-3">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tight mb-4">How to Measure</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Chest</h3>
              <p className="text-muted-foreground text-sm">
                Measure horizontally across your chest at the widest point. Keep the tape measure relaxed but snug.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Length</h3>
              <p className="text-muted-foreground text-sm">
                Measure from the highest point of your shoulder down to where you want the shirt to end.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
