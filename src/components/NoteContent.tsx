import React from "react";
import { GoClock, GoTag } from "react-icons/go";

export default function NoteContent() {
  return (
    <div className="pt-3 px-4 ">
      <h1 className="font-semibold text-2xl text-current-1">
        React Performance Optimization
      </h1>
      <div className="mt-4 flex flex-col gap-2 border-b border-divide pb-3">
        <div className=" text-current-2 grid grid-cols-[0.4fr_1fr] items-center  ">
          <div className="flex items-center gap-2  text-sm">
            <GoTag className="text-lg" />
            <p className="text-base">Tags</p>
          </div>
          <p>Dev, React</p>
        </div>
        <div className=" text-current-2 grid  grid-cols-[0.4fr_1fr] items-center  ">
          <div className="flex items-center gap-2  text-sm">
            <GoClock className="text-lg" />
            <p className="text-base">Last edited</p>
          </div>
          <p>29 Oct 2024</p>
        </div>
      </div>

      <div className="mt-3 text-current-2 text-sm">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          quisquam voluptatem aliquam mollitia quidem neque atque! Distinctio
          nobis aliquid sunt, minus mollitia dolore provident rerum ipsum omnis
          incidunt dicta quia!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          quisquam voluptatem aliquam mollitia quidem neque atque! Distinctio
          nobis aliquid sunt, minus mollitia dolore provident rerum ipsum omnis
          incidunt dicta quia!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          quisquam voluptatem aliquam mollitia quidem neque atque! Distinctio
          nobis aliquid sunt, minus mollitia dolore provident rerum ipsum omnis
          incidunt dicta quia!
        </p>
      </div>
    </div>
  );
}
