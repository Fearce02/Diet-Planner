import React, { useState } from "react";

function ActivityForm({}) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [res, setRes] = useState(null);
  const [activity, setActivity] = useState("sedentary");
  const [goal, setGoal] = useState("maintainance");

  const handleSubmission = (e) => {
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
      case "mild-weight-gain":
        finalCal = baseCal + 250;
        break;
      case "weight-gain":
        finalCal = baseCal + 550;
        break;
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

    setRes(finalCal.toFixed(0));
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
              <option value="mild-weight-gain">
                {" "}
                Mild Weight Gain 0.25/week{" "}
              </option>
              <option value="weight-gain"> Weight Gain 0.5kg/week </option>
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
          <div className="flex justify-center mt-5 font-bold font-mini">
            {res && <p>Your Daily Caloric Intake is : {res} Calories </p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default ActivityForm;
