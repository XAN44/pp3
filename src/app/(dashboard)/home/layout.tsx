import HomePageHeader from '../../../components/homepage/HomePageHeader'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-full w-full">
      <HomePageHeader />

      {children}
    </main>
  )
}
