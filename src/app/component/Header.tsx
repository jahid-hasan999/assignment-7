import { Button } from '@heroui/react';
import Image from 'next/image';


const Header = () => {

  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
    timeZone: 'Asia/Dhaka',
  });
  return (
    <div className="bg-white">
      <div className=" flex justify-between container mx-auto my-2">
        <div className="flex gap-1.5">
          <Image
            className="bg-green-800 font-bold rounded-2xl"
            src="/logo-icon.png"
            alt="name"
            height={50}
            width={50}
          />
          <div>
            <span className="font-bold text-2xl text-black">বাজার দর</span>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <Button className=" border rounded-2xl p-1.5 ">সাইন ইন</Button>
          <Button className="  rounded-2xl p-1.5 bg-green-700">সাইন আপ</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
