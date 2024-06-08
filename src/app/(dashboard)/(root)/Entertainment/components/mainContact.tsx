import { Text } from '@chakra-ui/react'
import useContact from './mainContactIndex'
import { Avatar, Image } from '@nextui-org/react'

const MainContact = () => {
  const u = useContact()
  return (
    <>
      <div className="h-full w-full bg-black">
        <div
          className="
        mt-16 
        w-full
        max-w-full grid-cols-3
        items-center 
        justify-center 
        space-x-6 
        p-14 md:grid lg:flex
      "
        >
          {u.map((d, index) => (
            <div className="m-3 " key={index}>
              <div className="mb-3 ">
                <Image src={d.img} alt={d.contact} width={850} height={340} />
              </div>
              <div className="grid  ">
                <Text as="b" fontSize="larger" color="whitesmoke">
                  {d.label}
                </Text>
                <Text as="b" color="whitesmoke" fontStyle="initial">
                  {d.label1}
                </Text>
                <div className="flex gap-3 ">
                  <Text as="p" color="white">
                    {d.contact}
                  </Text>
                  <Avatar src={d.contactLogo} className="h-6 w-6 text-tiny" />
                  <Text as="p" color="white">
                    {d.contactWith}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid text-center">
          <Text color="whitesmoke" as="b" fontSize="x-large">
            คุณสามารถเลือกหาบทความได้ที่นี่
          </Text>
          <Text as="b" fontSize="large" color="whitesmoke">
            เนื้อหาใหม่ของเราพร้อมแล้ว! ไปอ่านกันเลย
          </Text>
        </div>

        <div className="mt-6  flex justify-center gap-3 space-x-3 ">
          <div className="basis-1/4 rounded-lg">
            <Image src="article.png" alt="" />
          </div>
          <div className="basis-1/4 rounded-lg bg-white p-3">
            วันนี้เรามีความตั้งใจที่จะพาทุกท่านไปเที่ยวสนุกสนานในบทความนี้!
            เราเข้าใจและรู้ว่าการเที่ยวนั้นเป็นหนึ่งในความสุขที่หลายคนกำลังมองหาอยู่
            และคำถามที่ทุกคนตั้งใจถามกันจริงๆ คือ &quot; ต้องไปที่ไหนดี?
            อยากเที่ยวให้สนุก &quot;
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-3 space-x-3">
          <div className="basis-1/4 rounded-lg bg-white p-3">
            วันนี้เรามีความตั้งใจที่จะพาทุกท่านไปเที่ยวสนุกสนานในบทความนี้!
            เราเข้าใจและรู้ว่าการเที่ยวนั้นเป็นหนึ่งในความสุขที่หลายคนกำลังมองหาอยู่
            และคำถามที่ทุกคนตั้งใจถามกันจริงๆ คือ &quot; ต้องไปที่ไหนดี?
            อยากเที่ยวให้สนุก &quot;
          </div>
          <div className="basis-1/4 rounded-lg">
            <Image src="article.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainContact
