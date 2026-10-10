import Image from "next/image"
import { Button } from "@heroui/react"
import Link from "next/link"
const Banner = () => {
  const date=new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
    timeZone: 'Asia/Dhaka',
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between container mx-auto items-center border border-gray-200/60 bg-white rounded-2xl m-3">
      <div className="flex flex-col gap-2 p-3">
        <p className=" w-56 rounded-2xl bg-green-100  mb-6 p-2">{date}</p>
        <h1 className="font-bold text-3xl">আজকের বাজারের দাম এক নজরে</h1>
        <span>
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </span>
        <Link href="/#সব-পণ্য" className="mt-3.5">
          <Button>সব পণ্য দেখুন</Button>
        </Link>
      </div>
      <Image src="/bazar-hero.png" height={500} width={500} alt="hero" />
    </div>
  );
};

export default Banner;