import React from "react";
import { useNavigate } from "react-router";

function Dropdown() {
  const navigate = useNavigate();
  const handleSelectionChange = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      <div className=" w-80 bg-white shadow-lg rounded-3xl p-4 ml-4 mt-5 text-center">
        <label
          htmlFor="dropdown-calc-list"
          className=" flex justify-center font-mini font-bold text-3xl mb-3 text-gray-800"
        >
          {" "}
          Options{" "}
        </label>
        <select
          onChange={handleSelectionChange}
          className=" text-center w-full py-3 px-6 rounded-3xl bg-white border-4 border-gray-400 text-gray-800 font-bold font-mini focus:border-blue-500 focus:outline-none hover:border-blue-500"
        >
          <option
            value="/bmi-calculator"
            className="w-full py-3 px-6 bg-white border-4 border-gray-400 text-gray-800 font-bold font-mini focus:border-blue-500 focus:outline-none hover:border-blue-500"
          >
            BMI Calculator
          </option>
          <option
            value="/bmr-calculator"
            className="w-full py-3 px-6 bg-white border-4 border-gray-400 text-gray-800 font-bold font-mini focus:border-blue-500 focus:outline-none hover:border-blue-500"
          >
            BMR Calculator
          </option>
          <option
            value="/calorie-calculator"
            className=" text-center w-full py-3 px-6 bg-white border-4 border-gray-400 text-gray-800 font-bold font-mini focus:border-blue-500 focus:outline-none hover:border-blue-500"
          >
            Calorie Calculator
          </option>
          <option
            value="/diet-sample"
            className=" text-center w-full py-3 px-6 bg-white border-4 border-gray-400 text-gray-800 font-bold font-mini focus:border-blue-500 focus:outline-none hover:border-blue-500"
          >
            Diet Plan
          </option>
        </select>
      </div>
    </>
  );
}

export default Dropdown;
