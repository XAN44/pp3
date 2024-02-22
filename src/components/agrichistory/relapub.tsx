import { Text } from '@chakra-ui/react'
import { Divider } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image'

export default function Relapub() {
  return (
    <div className="flex items-center justify-center">
      <div className=" w-9/12 text-center  ">
        <Text
          color="black"
          as="u"
          fontSize="xx-large"
          align="center"
          justifyContent="center"
        >
          AGRIC
        </Text>

        <div className="grid text-start">
          <Text as="b" color="red" fontSize="2xl">
            ข่าวสาร
          </Text>

          {/*  */}

          <div className="flex justify-between">
            <Text className="mb-3 mt-3">
              เปิดให้ทดสอบใช้งานเต็มระบบ ในวันที่ 10 เมษายน พ.ศ. 2567
            </Text>
            <Text className="mb-3 mt-3">โดย Admin 1 มีนาคม พ.ศ. 2567</Text>
          </div>
          <Divider className="my-1 w-[1200px] ring-0 ring-black " />

          {/*  */}

          <div className="flex justify-between">
            <Text className="mb-3 mt-3">
              ประกาศ กิจกรรมรักษาชุมชนบางทราย ในวันที่ 15 เมษายน พ.ศ. 2567
            </Text>
            <Text className="mb-3 mt-3">โดย Admin 5 มีนาคม พ.ศ. 2567</Text>
          </div>
          <Divider className="my-1 w-[1200px] ring-0 ring-black " />
          {/*  */}
          <div className="mt-3 flex flex-col space-y-3">
            <Text fontSize="x-large" as="b" color="red">
              ช่องทางติดตามเพิ่มเติมของเรา
            </Text>
            <div className="grid grid-flow-col grid-rows-3 place-items-start items-start justify-start gap-3">
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width="32"
                  height="32"
                />
                : FACEBOOK
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image
                  src="/youtube.png"
                  alt="youtube"
                  width="32"
                  height="32"
                />
                : YOUTUBE
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image
                  src="/twitter.png"
                  alt="youtube"
                  width="32"
                  height="32"
                />
                : TWITTER
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image src="/ig.png" alt="youtube" width="32" height="32" />:
                INSTRAGRAM
              </Text>
              <Text className="btn btn btn-prim flex place-items-center justify-center gap-3 text-center">
                <Image src="/tiktok.png" alt="youtube" width="32" height="32" />
                : TIKTOK
              </Text>
              <Text className="flex place-items-center justify-center gap-3 text-center">
                <Image src="/email.png" alt="youtube" width="32" height="32" />:
                email
              </Text>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}
