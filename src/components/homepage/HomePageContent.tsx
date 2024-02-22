'use client'
import Image from 'next/image'

export default function HomePageContent() {
  return (
    <>
      <div>
        <div>
          {/* content header */}
          <div className="text-2xl font-bold">
            <h1>เราอยากบอกกับคุณว่า</h1>
            <div className="divider divider-neutral mx-auto w-48"></div>
          </div>

          {/* content main */}
          <div
            className="
            mt-12 
            grid grid-cols-3 gap-x-2 gap-y-3
            sm:grid-cols-1 
            md:grid-cols-3 
            lg:grid-cols-3"
          >
            {/* card 1 */}
            <div className="group container grid w-80 flex-grow  ">
              <div className="  transform transition delay-100 duration-1000 ease-in-out hover:scale-110 ">
                <div className=" grid place-items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <div className="relative p-3 pt-3">
                    <figure>
                      <Image
                        className="opacity-100"
                        src="/col1.png"
                        alt="blog"
                        quality={100}
                        width={400}
                        height={250}
                      />
                    </figure>
                    <div className=" items-center text-center ">
                      <div className="absolute left-1/2  -translate-x-1/2 translate-y-10 transform opacity-100 transition duration-700 ease-in-out group-hover:-translate-y-2 group-hover:opacity-0 group-hover:delay-100">
                        <h1> BLOG </h1>
                      </div>
                      <div className=" mt-3 opacity-0 transition duration-700 ease-out group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">BLOG</h1>
                        <p className="  mb-1  whitespace-nowrap opacity-0 transition-opacity delay-150 duration-700 ease-in-out group-hover:opacity-100 group-hover:delay-100">
                          ยินดีต้อนรับสู่บล็อกของเรา <br />
                          ที่ซึ่งเราจะแชร์เรื่องราวต่างๆที่พบเจอ
                          <br />
                          คุณจะพบเนื้อหาที่สนุกสนาน
                          <br />
                          และมีข้อมูลมากมายที่จะอ่านและเรียนรู้
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card 2 */}
            <div className="group container grid w-80 flex-grow  ">
              <div className="  transform transition delay-100 duration-1000 ease-in-out hover:scale-110 ">
                <div className=" grid place-items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <div className="relative p-3 pt-3">
                    <figure>
                      <Image
                        className="opacity-100"
                        src="/col2.png"
                        alt="blog"
                        quality={100}
                        width={400}
                        height={250}
                      />
                    </figure>
                    <div className=" items-center text-center ">
                      <div className="absolute left-1/2  -translate-x-1/2 translate-y-10 transform opacity-100 transition duration-700 ease-in-out group-hover:-translate-y-2 group-hover:opacity-0 group-hover:delay-100">
                        <h1> Activity </h1>
                      </div>
                      <div className=" mt-3 opacity-0 transition duration-700 ease-out group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">Activity</h1>
                        <p className="mb-1 opacity-0 transition-opacity delay-150 duration-700 ease-in-out group-hover:opacity-100 group-hover:delay-100">
                          เตรียมตัวให้พร้อมสำหรับงาน Event
                          <br />
                          ที่จะถึงเร็วๆนี้
                          งานนี้จะเป็นงานที่น่าสนุกสนานอย่างแน่นอน
                          คุณจะพบเนื้อหาที่สนุกสนาน <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card 3 */}
            <div className="group container grid w-80 flex-grow  ">
              <div className="  transform transition delay-100 duration-1000 ease-in-out hover:scale-110 ">
                <div className=" grid place-items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <div className="relative p-3 pt-3">
                    <figure>
                      <Image
                        className="opacity-100"
                        src="/col4.png"
                        alt="blog"
                        quality={100}
                        width={400}
                        height={250}
                      />
                    </figure>
                    <div className=" items-center text-center ">
                      <div className="absolute left-1/2  -translate-x-1/2 translate-y-10 transform opacity-100 transition duration-700 ease-in-out group-hover:-translate-y-2 group-hover:opacity-0 group-hover:delay-100">
                        <h1> Social </h1>
                      </div>
                      <div className=" mt-3 opacity-0 transition duration-700 ease-out group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">Social</h1>
                        <p className="mb-1 opacity-0 transition-opacity delay-150 duration-700 ease-in-out group-hover:opacity-100 group-hover:delay-100">
                          เตรียมตัวให้พร้อมสำหรับงาน Event
                          <br />
                          ที่จะถึงเร็วๆนี้
                          งานนี้จะเป็นงานที่น่าสนุกสนานอย่างแน่นอน
                          คุณจะพบเนื้อหาที่สนุกสนาน <br />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
