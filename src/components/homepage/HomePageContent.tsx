"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function HomePageContent() {
  return (
    <>
      <div>
        <div>
          {/* content header */}
          <div className="text-2xl font-bold">
            <h1>เราอยากบอกกับคุณว่า</h1>
            <div className="divider divider-neutral w-48 mx-auto"></div>
          </div>
          <div className="font-semibold text-lg">
            <div>
              <span className="text-red-600">เรา</span>
              คือพื้นที่ที่แสดงเรื่องราวต่างๆที่เกี่ยวข้องกับการ
              <span className="text-green-600">ท่องเที่ยว</span>
              และ
              <span className="text-green-600">ชุมชน</span>
            </div>
            <div className="mt-3">
              <h1>
                เพื่อให้
                <span className="text-red-600">ทุกคน</span>
                มีส่วนร่วมด้วยกัน สร้างบทความเกี่ยวกับการเดินทางและ
                <span className="text-green-600">กิจกรรม</span>
                ต่างๆที่น่าสนใจ
              </h1>
            </div>
          </div>
          {/* content main */}
          <div
            className="
            mt-12 
            grid grid-cols-2 gap-x-2 gap-y-3
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-2"
          >
            {/* card 1 */}
            <div className="container grid flex-grow w-80 group  ">
              <div className="  transform transition duration-1000 ease-in-out delay-100 hover:scale-110 ">
                <div className=" rounded-xl shadow-lg overflow-hidden grid place-items-center justify-center">
                  <div className="relative pt-3 p-3">
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
                      <div className="absolute left-1/2  transform -translate-x-1/2 translate-y-10 opacity-100 transition duration-700 ease-in-out group-hover:delay-100 group-hover:opacity-0 group-hover:-translate-y-2">
                        <h1> BLOG </h1>
                        <p>dssadadqfaslkasdklsanl</p>
                      </div>
                      <div className=" mt-3 transition duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">BLOG</h1>
                        <p className="  whitespace-nowrap  mb-1 opacity-0 transition-opacity duration-700 delay-150 ease-in-out group-hover:opacity-100 group-hover:delay-100">
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
            <div className="container grid flex-grow w-80 group  ">
              <div className="  transform transition duration-1000 ease-in-out delay-100 hover:scale-110 ">
                <div className=" rounded-xl shadow-lg overflow-hidden grid place-items-center justify-center">
                  <div className="relative pt-3 p-3">
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
                      <div className="absolute left-1/2  transform -translate-x-1/2 translate-y-10 opacity-100 transition duration-700 ease-in-out group-hover:delay-100 group-hover:opacity-0 group-hover:-translate-y-2">
                        <h1> EVENT </h1>
                      </div>
                      <div className=" mt-3 transition duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">EVENT</h1>
                        <p className="mb-1 opacity-0 transition-opacity duration-700 delay-150 ease-in-out group-hover:opacity-100 group-hover:delay-100">
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
            <div className="container grid flex-grow w-80 group  ">
              <div className="  transform transition duration-1000 ease-in-out delay-100 hover:scale-110 ">
                <div className=" rounded-xl shadow-lg overflow-hidden grid place-items-center justify-center">
                  <div className="relative pt-3 p-3">
                    <figure>
                      <Image
                        className="opacity-100"
                        src="/col3.png"
                        alt="blog"
                        quality={100}
                        width={400}
                        height={250}
                      />
                    </figure>
                    <div className=" items-center text-center ">
                      <div className="absolute left-1/2  transform -translate-x-1/2 translate-y-10 opacity-100 transition duration-700 ease-in-out group-hover:delay-100 group-hover:opacity-0 group-hover:-translate-y-2">
                        <h1> PRODUCT </h1>
                      </div>
                      <div className=" mt-3 transition duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">PRODUCT</h1>
                        <p className="mb-1 opacity-0 transition-opacity duration-700 delay-150 ease-in-out group-hover:opacity-100 group-hover:delay-100">
                          ชุมชนร้านค้าของเรา <br />
                          มีสินค้าใหม่ล่าสุดให้คุณได้ช้อป!
                          <br />
                          พบกับสินค้าหลากหลายชนิด
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card 4 */}
            <div className="container grid flex-grow w-80 group  ">
              <div className="  transform transition duration-1000 ease-in-out delay-100 hover:scale-110 ">
                <div className=" rounded-xl shadow-lg overflow-hidden grid place-items-center justify-center">
                  <div className="relative pt-3 p-3">
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
                      <div className="absolute left-1/2  transform -translate-x-1/2 translate-y-10 opacity-100 transition duration-700 ease-in-out group-hover:delay-100 group-hover:opacity-0 group-hover:-translate-y-2">
                        <h1> SOCIAL</h1>
                      </div>
                      <div className=" mt-3 transition duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:delay-100">
                        <h1 className="font-bold">SOCIAL</h1>
                        <p className="mb-1 opacity-0 transition-opacity duration-700 delay-150 ease-in-out group-hover:opacity-100 group-hover:delay-100">
                          ขอบคุณทุกคนที่ติดตามเรา! <br />
                          เรารักที่จะแบ่งปันเนื้อหาที่สนุกสนานและเป็นข้อมูลกับคุณ
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
  );
}
