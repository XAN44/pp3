import Footer from '@/components/Footer'

export default async function AlleventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative grid h-screen max-h-full">
      {children}
      <div className="">
        <Footer />
      </div>
    </main>
  )
}
