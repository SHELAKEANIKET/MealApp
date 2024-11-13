import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import { BsDot } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";

function MealDetails() {
  const { id } = useParams();
  const [mealInfo, setMealInfo] = useState("");

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await res.json();
      setMealInfo(data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // Extract ingredients with their measurements
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = mealInfo[`strIngredient${i}`];
    const measure = mealInfo[`strMeasure${i}`];

    // Only include non-empty ingredients and measurements
    if (
      ingredient &&
      ingredient.trim() !== "" &&
      measure &&
      measure.trim() !== ""
    ) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  // Extract tags
  const tags = [];
  const totalTags = mealInfo?.strTags + " ";

  let currTag = "";
  for (let i = 0; i < totalTags?.length; i++) {
    if (totalTags.charAt(i) == "," || totalTags.charAt(i) == " ") {
      tags.push(currTag);
      currTag = "";
    } else {
      currTag += totalTags.charAt(i);
    }
  }

  return (
    <div className="my-20 mx-4 lg:mx-20">
      <div className="my-10 flex justify-center items-start flex-col">
        <div className="flex justify-center items-center flex-col gap-1.5">
          <h1 className="text-2xl text-primary font-bold tracking-wide">
            Meal Details
          </h1>
          <span className="h-[2.5px] w-28 bg-primary"></span>
        </div>

        <div className="flex justify-center items-start flex-col lg:flex-row gap-5 border border-borderColor p-5 my-5">
          <div className="flex justify-center items-center w-full lg:w-2/5">
            <img
              src={mealInfo.strMealThumb}
              alt={mealInfo.strMealThumb}
              className="shadow-lg rounded-lg w-[380px]"
            />
          </div>
          <div className="flex justify-center items-start flex-col gap-3 w-full lg:w-3/5">
            <div className="flex justify-center items-center py-2 gap-2">
              <div>
                <GiMeal className="size-8 text-primary" />
              </div>
              <h1 className="font-bold text-xl md:text-2xl text-primary">
                {mealInfo.strMeal}
              </h1>
            </div>
            <div className="flex justify-start items-center gap-2">
              <h2 className="font-semibold text-xl text-black">
                <span className="text-primary">Tags :</span>
              </h2>
              <ul className="flex justify-start items-center gap-2">
                {tags.map((tag, index) => (
                  <div key={index}>
                    <li className="border py-1 px-2 border-borderColor rounded font-medium">
                      {tag}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="font-semibold text-xl text-primary">
                Video :
              </span>
              <div className="flex justify-center items-center gap-2 flex-shrink-0">
                <FaYoutube className="size-5 text-red-600" />
                <a href={mealInfo.strYoutube} className="font-medium text-base">
                  Watch On YouTube
                </a>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-primary">
              Ingredients :
            </h2>
            <ul className="flex justify-start items-center flex-wrap gap-3">
              {ingredients.map((item, index) => (
                <div className="flex justify-center items-center" key={index}>
                  <div>
                    <BsDot className="size-5 font-semibold text-primary" />
                  </div>
                  <li key={index} className="text-base font-semibold">
                    {item}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start flex-col gap-4 ">
        <div className="flex justify-center items-center flex-col gap-1.5 ">
          <h1 className="text-xl text-primary font-bold tracking-wide">
            Instructions
          </h1>
          <span className="h-[2px] w-24 bg-primary"></span>
        </div>
        <p className="text-black text-lg">{mealInfo.strInstructions}</p>
      </div>
    </div>
  );
}

export default MealDetails;
