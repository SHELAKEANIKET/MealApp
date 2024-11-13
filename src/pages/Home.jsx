import React from "react";
import ShowMeal from "../components/ShowMeal";

function Home() {
  return (
    <div className="mb-14">
      <div className="object-contain relative">
        <img
          src="https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1lYWwlMjBiYWNrZ3JvdW5kfGVufDB8MHwwfHx8Mg%3D%3D"
          alt="header-image"
          className="w-full h-full lg:h-[540px] object-cover object-center relative"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white lg:text-8xl text-3xl font-bold font-[Oswald] text-center tracking-wide italic">
          Enjoy <span className="text-primary">healthy</span> and <span className="text-primary">delicious</span> food.
        </div>
      </div>
      <ShowMeal />
    </div>
  );
}

export default Home;
