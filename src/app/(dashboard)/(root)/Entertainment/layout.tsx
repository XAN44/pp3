import Footer from '../../../../components/Footer'
import FooterEn from './components/fotteren'

export default async function EntertainmenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="  h-full max-h-screen  max-w-full bg-black ">
      {children}
    </main>
  )
}
