import { Text } from '@chakra-ui/react'
import Link from 'next/link'

const ProfileInfoAbout = () => {
  return (
    <div className="grid items-center justify-center text-start">
      <div className="mt-3">
        <Text as="b" fontSize="x-large">
          เกี่ยวกับเรา
        </Text>
        <Text>
          <Link href="/myhis">ประวัติ</Link>
        </Text>
        <Text>
          <Link href="/publicrelations">ข่าวประชาสัมพันธ์</Link>
        </Text>
        <Text>
          <Link href="/workwithus">ร่วมงานกับเรา</Link>
        </Text>
      </div>
      <div className="mt-3">
        <Text as="b" fontSize="x-large">
          ศูนย์ช่วยเหลือ
        </Text>
        <Text>
          <Link href="/question">คำถามที่พบบ่อย</Link>
        </Text>
        <Text>
          <Link href="/workus">ติดต่อเรา</Link>
        </Text>
      </div>
      <div className="mt-3">
        <Text as="b" fontSize="x-large">
          กฏหมาย
        </Text>
        <Text>
          <Link href="/policy">นโยบายความเป็นส่วนตัว</Link>
        </Text>

        <Text>
          <Link href="/agreement">ข้อตกลงและเงื่อนไข</Link>
        </Text>
        <Text>
          <Link href="/whatiscookie">นโยบายการใช้คุกกี้</Link>
        </Text>
      </div>
    </div>
  )
}

export default ProfileInfoAbout
