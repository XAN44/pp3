import Image from "next/image";
import React from "react";

type Props = {};

export default function HomePageContent1({}: Props) {
  return (
    <>
      <div className="grid ">
        <h1 className="font-bold text-lg">
          เรามุ่งเน้นที่จะให้ผู้คนแบ่งปันข้อมูลที่มีประโยชน์แก่ชุมชนที่มีความต้องการในการค้นหาข้อมูล{" "}
          <br />
          รวมทั้งกิจกรรมต่างๆที่เกี่ยวข้องกับการเดินทางของพวกเขา
        </h1>
      </div>
      <div className="flex justify-center items-center place-items-center space-x-3">
        <div
          className=" 
        w-[490px] shadow-sm shadow-black
        rounded-lg 
        p-7 
        "
        >
          <p className="first-line:whitespace-normal">
            การท่องเที่ยวเป็นประสบการณ์ที่มีค่า แม้เราจะไม่อยู่ในที่นั้นตลอดเวลา
            แต่ความทรงจำและความประทับใจยังคงอยู่กับเราไปตลอด
          </p>
          <br />
          <p>
            เราเชื่อว่าผลงานของเรายังคงอยู่ในส่วนใหญ่ของคนที่ได้สัมผัส
            และเห็นคุณค่าจากการเข้ามาในที่นี้ <br />
            และเรายังคงสนับสนุนและช่วยเหลือชุมชนนั้นๆ ด้วย
            ทุกการท่องเที่ยวของคุณเป็นการสนับสนุนให้คนในที่นั้นมีอนาคตที่ดีขึ้น
          </p>
        </div>
        <div className=" ">
          <Image
            className="h-60"
            src="/colmain1.png"
            width={400}
            height={300}
            quality={100}
            alt="image"
          />
        </div>
      </div>
    </>
  );
}
