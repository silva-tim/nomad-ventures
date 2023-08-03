import { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { PiHeartFill } from 'react-icons/pi';

export default function BlogPostCard() {
  const [underline, setUnderline] = useState(false);

  function handleUnderline() {
    setUnderline(!underline);
  }

  return (
    <div className="h-48 border-b border-black mt-3 cursor-pointer">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          {/* <div className="w-10 h-10">
            <img
              className="w-full h-full object-cover rounded-full border-green-400 border"
              src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B"
              alt="Default avatar"
            />
          </div> */}
          <span>Tim Silva</span>
        </div>
        <div className="flex">
          <PiHeartFill className="text-2xl mr-1" />
          <span>232</span>
        </div>
      </div>
      <div
        className="flex h-32"
        onMouseEnter={handleUnderline}
        onMouseLeave={handleUnderline}>
        <div className="basis-1/3 h-full">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1689081777651-eef75a48e959?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80"
            alt=""
          />
        </div>
        <div className="py-3 px-4 font-lato flex flex-wrap">
          <div className="basis-full">
            <h1
              className={`${underline && `underline`} text-2xl font-extrabold`}>
              What I Learned in China
            </h1>
            <h2 className="text-xl font-medium">
              And what you could learn there too.
            </h2>
          </div>
          <div className="flex bg-secondary items-center rounded-lg px-2">
            <FaLocationDot className="mr-1" />
            <span className="text-sm">China</span>
          </div>
        </div>
      </div>
    </div>
  );
}
