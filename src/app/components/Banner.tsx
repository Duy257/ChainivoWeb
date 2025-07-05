'use client';
import React from 'react';
import {Carousel} from 'antd';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="container mx-auto mt-4">
      <div className="flex space-x-2">
        <div className="w-2/3">
          <Carousel autoplay className="w-full h-auto">
            <div>
              <Image
                src="https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg"
                alt="Banner 1"
                width={820}
                height={288}
                crossOrigin="anonymous"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <Image
                src="https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg"
                alt="Banner 2"
                width={820}
                height={235}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <Image
                src="https://d3design.vn/uploads/Anh_bia_summer_sale_holiday_podium_display_on_yellow_background.jpg"
                alt="Banner 3"
                width={820}
                height={235}
                className="w-full h-auto object-cover"
              />
            </div>
          </Carousel>
        </div>
        <div className="w-1/3 flex flex-col space-y-2">
          <Image
            src="https://d3design.vn/uploads/5495874gh6y5356.jpg"
            alt="Sub-banner 1"
            width={400}
            height={116}
            className="w-full h-auto"
          />
          <Image
            src="https://d3design.vn/uploads/summer_4.jpg"
            alt="Sub-banner 2"
            width={400}
            height={116}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
