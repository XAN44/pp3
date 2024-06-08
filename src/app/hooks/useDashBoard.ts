import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const useDashBoard = () => {
  const pathname = usePathname()
  const useRouter = useMemo(
    () => [
      {
        label: 'กิจกรรมที่คุณเข้าร่วม',
        href: '/active',
        active: pathname === '/active',
      },
      // {
      //   label: 'กิจกรรมที่คุณเป็นเจ้าของ',
      //   href: '/ownerActive',
      //   active: pathname === '/ownerActive',
      // },
    ],
    [pathname]
  )
  return useRouter
}

export default useDashBoard
