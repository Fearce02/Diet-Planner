import React, { useState } from "react";

function Form({ calculationType }) {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [res, setRes] = useState(undefined);
  const [calculate, setCalculated] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    let calculatedVal;
    if (calculationType === "bmi") {
      const heightinmeter = height / 100;
      calculatedVal = weight / (heightinmeter * heightinmeter);
      console.log(`BMI is : ${calculatedVal.toFixed(2)}`);
      setRes(calculatedVal.toFixed(2));
    } else if (calculationType === "bmr") {
      calculatedVal =
        gender === "male"
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;
      console.log(`BMR is ${calculatedVal}`);
      setRes(calculatedVal.toFixed(2));
    }
    setCalculated(true);
  };

  return (
    <>
      <div className="flex justify-center m-18 ">
        <form
          action="inputform"
          onSubmit={handleSubmission}
          className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md shadow-gray-300"
        >
          <div className="flex flex-col mb-4">
            <label
              htmlFor="setAge"
              className=" flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2 "
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
              className="w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            />
          </div>

          <div id="gender-checkbox" className="flex flex-col mb-4">
            <label
              htmlFor="Gender-Selection"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-4 py-2"
            >
              Gender
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
              className=" flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-3 py-2"
            >
              {" "}
              Height{" "}
            </label>
            <input
              type="number"
              placeholder="Height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min={0}
              className="w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            />
          </div>
          <div id="weight-div" className="flex flex-col mb-4">
            <label
              htmlFor="weight-label"
              className="flex justify-center text-normal text-lg sm:text-md font-bold font-mini text-gray-800 mt-2 w-30 h-10 rounded-3xl px-3 py-2"
            >
              {" "}
              Weight{" "}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight in KG"
              min={0}
              className="w-100 mt-2 py-3 px-3 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none hover:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="md:w-32 bg-blue-500 hover:bg-blue-dark text-white font-bold font-mini py-2 px-6 rounded-lg mt-3 hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Calculate
            </button>
          </div>
          <div className="flex justify-center mt-5 font-bold font-mini ">
            {calculate && (
              <p>
                Your {calculationType.toUpperCase()} is : {res}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
