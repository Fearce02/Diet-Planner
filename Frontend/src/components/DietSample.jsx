import { useState } from "react";
import axios from "axios";

function DietSample() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [Diet, setDiet] = useState("");
  const [style, setStyle] = useState("");
  const [BMR, setBMR] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [goal, setGoal] = useState("maintainance");
  const [loading, setLoading] = useState(false);
  const [chatres, setChatRes] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!age || !height || !weight) {
      alert("Please Fill in all the fields");
      return;
    }

    const agetonum = Number(age);
    const weightoNum = Number(weight);
    const heighttoNum = Number(height);

    let bmr;
    if (gender === "male") {
      bmr = 10 * weightoNum + 6.25 * heighttoNum - 5 * agetonum + 5;
    } else if (gender === "female") {
      bmr = 10 * weightoNum + 6.25 * heighttoNum - 5 * agetonum - 161;
    }

    let ActivityCalculation = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      extreme: 1.725,
    };

    const baseCal = bmr * ActivityCalculation[activity.toLowerCase()];

    let finalCal;
    switch (goal) {
      case "maintainance":
        finalCal = baseCal;
        break;
      case "mild-weight-loss":
        finalCal = baseCal - 250;
        break;
      case "weight-loss":
        finalCal = baseCal - 550;
        break;
      case "extreme-weight-loss":
        finalCal = baseCal - 1000;
        break;

      default:
        finalCal = baseCal;
    }

    setBMR(finalCal.toFixed(0));
    setLoading(true);

    try {
      const AiResponse = await axios.post("http://localhost:3000/diet-sample", {
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        Diet: Diet,
        style: style,
        activity: activity,
        goal: goal,
        BMR: finalCal,
      });
      console.log(AiResponse);

      const formatResponse = (response) => {
        return response
          .replace(/(\d+ calories)/g, "<b>$1</b>")
          .replace(/\n/g, "<br/>")
          .replace(/(Carbs: \d+g)/g, "<i>$1</i>")
          .replace(/(Protein: \d+g)/g, "<i>$1</i>")
          .replace(/(Fats: \d+g)/g, "<b>$1</b>")
          .replace(/Diet Style: (.*?)<\/b>/g, "<b>Diet Style: $1</b>")
          .replace(/BMR: (\d+)/g, "<b>BMR: $1</b>");
      };

      const textResponse = AiResponse.data.dietSample;
      const FormattedResponse = formatResponse(textResponse);

      setChatRes(FormattedResponse);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setChatRes("Error generating a diet Plan please try again");
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center m-18">
        <form
          onSubmit={handleSubmission}
          className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md shadow-gray-300"
        >
          <div className="flex flex-col mb-4">
            <label
              htmlFor="setAge"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Age
            </label>
            <input
              type="number"
              name="age-inp"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your Age"
              className=" text-center w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            />
          </div>
          <div id="gender-checkbox" className="flex flex-col mb-4">
            <label
              htmlFor="Gender-Selection"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Gender{" "}
            </label>
            <div
              id="selection-radio"
              className="flex justify-center space-x-4 mt-2 bg-white w-100 py-3 px-3 rounded-3xl border-4 border-gray-400"
            >
              <label htmlFor="gender-male" className="flex items-center">
                <input
                  type="radio"
                  id="gender-male"
                  name="gender"
                  value="male"
                  onChange={() => setGender("male")}
                  className="form-radio h-5 w-5 text-blue-600 border-4 border-gray-400 rounded-full focus:ring focus:ring-blue-500 focus:ring-opacity-50 "
                />
                <span className="ml-2 text-gray-800 font-medium">Male</span>
              </label>
              <label htmlFor="gender-female" className="flex items-center">
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value="female"
                  onChange={() => setGender("female")}
                  className="form-radio h-5 w-5 text-blue-600 border-4 border-gray-400 rounded-full focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <span className="ml-2 text-gray-800 font-medium">Female</span>
              </label>
            </div>
          </div>
          <div id="diet-checkbox" className="flex flex-col mb-4">
            <label
              htmlFor="Diet-Selection"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Diet Type{" "}
            </label>
            <div
              id="selection-radio"
              className="flex justify-center space-x-4 mt-2 bg-white w-100 py-3 px-3 rounded-3xl border-4 border-gray-400"
            >
              <label htmlFor="diet-vegetarian" className="flex items-center">
                <input
                  type="radio"
                  id="veg-diet"
                  name="Vegetarian"
                  value="vegetarian"
                  onChange={(e) => setDiet(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600 border-4 border-gray-400 rounded-full focus:ring focus:ring-blue-500 focus:ring-opacity-50 "
                />
                <span className="ml-2 text-gray-800 font-medium">
                  Vegetarian
                </span>
              </label>
              <label htmlFor="diet-nonvegetarian" className="flex items-center">
                <input
                  type="radio"
                  id="nonveg-diet"
                  name="NonVegetarian"
                  value="nonvegetarian"
                  onChange={(e) => setDiet(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600 border-4 border-gray-400 rounded-full focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <span className="ml-2 text-gray-800 font-medium">
                  Non-Vegetarian
                </span>
              </label>
            </div>
          </div>
          <div id="diet-styles" className="flex flex-col mb-4">
            <label
              htmlFor="dietStyle-label"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Select Diet Style{" "}
            </label>
            <select
              name=""
              id="diet-styles"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="text-center w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            >
              <option value="indian-style"> Indian-Style </option>
              <option value="Keto"> Keto-Diet </option>
              <option value="western-style"> Western Style </option>
            </select>
          </div>
          <div id="height-div" className="flex flex-col mb-4">
            <label
              htmlFor="height-label"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Height{" "}
            </label>
            <input
              type="number"
              placeholder="Enter your Height in cms"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min={0}
              className="text-center w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            />
          </div>
          <div id="weight-div" className="flex flex-col mb-4">
            <label
              htmlFor="weight-label"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Weight{" "}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your Weight in KG"
              min={0}
              className="text-center w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            />
          </div>

          <div id="goals" className="flex flex-col mb-4">
            <label
              htmlFor="goal-label"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              {" "}
              Select Your Goal{" "}
            </label>
            <select
              name=""
              id="goals-list"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="text-center w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            >
              <option value="maintainance"> Maintain Weight </option>
              <option value="mild-weight-loss">
                Mild Weight loss 0.25kg/week
              </option>
              <option value="weight-loss"> Weight Loss 0.5kg/week</option>
              <option value="extreme-weight-loss">
                Extreme Weight loss 1kg/week
              </option>
            </select>
          </div>
          <div id="activity-levels" className="flex flex-col mb-4">
            <label
              htmlFor="acitivty-label"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              Select Your Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value.toLowerCase())}
              className=" text-center w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            >
              <option value="sedentary">
                Sedentary : Little or no Exercise
              </option>
              <option value="light">
                Light Exercise: 1 - 2 Times per Week
              </option>
              <option value="moderate">
                Moderate Exercise: 4-5 times per week
              </option>
              <option value="extreme">
                Exremely Active: Exercise upto 6 times a week
              </option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="classNamemd:w-32 bg-blue-500 hover:bg-blue-dark text-white font-bold font-mini py-2 px-6 rounded-lg mt-3 hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
      <div className="chat-box mt-8 bg-gray-100 p-4 rounded-lg">
        <div className="response-box bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2">Diet Plan</h3>
          {loading ? (
            <div className="text-center">
              <span className="animate-spin text-blue-600 font-bold">
                Loading...
              </span>
            </div>
          ) : (
            <div
              className="text-gray-900 font-mono font-semibold"
              dangerouslySetInnerHTML={{ __html: chatres }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DietSample;
