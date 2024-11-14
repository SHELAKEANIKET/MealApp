import React, { useEffect, useState, useRef } from "react";
import CustomDropdown from "./CustomDropdown";
import { Link } from "react-router-dom";
import { areas } from "../data/areas";
import { categories } from "../data/categories";
import { FaSearch } from "react-icons/fa";

function ShowMeal() {
  const [mealData, setMealData] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Indian");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchMeal, setSearchMeal] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMeal();
  };

  //  Fetch meals based on selected area or category
  const fetchMeal = async () => {
    try {
      let url = "";
      if (searchMeal) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;
      } else if (selectedArea) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
      } else if (selectedCategory) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }

      if (url) {
        const res = await fetch(url);
        const data = await res.json();

        if (data.meals) {
          setMealData(data.meals);
          setNotFound(false);
        } else {
          setMealData([]);
          setNotFound(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [selectedArea, selectedCategory]);

  const handleFilterArea = (area) => {
    setSelectedArea(area);
    setSelectedCategory("");
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);
    setSelectedArea("");
  };

  if (mealData.length === 0) {
    return (
      <div className="flex justify-center items-center my-40 font-semibold text-lg">
        <div class="rounded-md h-12 w-12 border-4 border-t-4 border-primary animate-spin absolute"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col mx-3 lg:mx-20 my-14">
      <div className="flex justify-center items-center flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
          <form
            className="flex justify-center items-center gap-3 w-80 rounded-md border border-borderColor py-2 px-2 shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="text-black">
              <FaSearch />
            </div>
            <input
              className="bg-transparent outline-none text-base text-black placeholder:text-black placeholder:lg:text-black w-full pl-1 lg:pl-0"
              value={searchMeal}
              onChange={(e) =>
                setSearchMeal(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
              type="text"
              placeholder="Search Your Meal"
            />
          </form>
          <div className="flex justify-center items-center gap-5">
            <CustomDropdown
              options={areas}
              onSelect={handleFilterArea}
              name={"Select Area"}
            />
            <CustomDropdown
              options={categories}
              onSelect={handleFilterCategory}
              name={"Select Category"}
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-1.5">
          <h1 className="text-3xl font-semibold text-primary">
            {selectedCategory
              ? `${selectedCategory} Meals`
              : searchMeal
              ? `${searchMeal}`
              : `${selectedArea} Meals`}
          </h1>
          <span className="h-[2px] w-20 bg-primary"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2">
          {mealData &&
            mealData.map((meal) => (
              <Link
                to={`/meal/${meal.idMeal}`}
                className="flex justify-start items-center flex-col gap-3 shadow-md pb-3 rounded-xl overflow-hidden"
                key={meal.idMeal}
              >
                <div>
                  <img
                    src={meal.strMealThumb}
                    alt="meal image"
                    className="object-fill hover:scale-105 transition-all duration-200 w-80"
                  />
                </div>
                <h2 className="text-black text-lg font-medium text-center truncate w-full px-3">
                  {meal.strMeal}
                </h2>
              </Link>
            ))}
        </div>
      </div>
      <div>
        {notFound && (
          <p className="text-black text-lg font-medium text-center">
            ❌ Data Not found ❌
          </p>
        )}
      </div>
    </div>
  );
}

export default ShowMeal;
