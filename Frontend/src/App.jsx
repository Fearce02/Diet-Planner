import React from "react";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Form from "./components/Form.jsx";
import ActivityForm from "./components/Acitivity.jsx";
import Layout from "./Layout/Layout.jsx";
import DietSample from "./components/DietSample.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route path="/" element={<Form calculationType={"bmi"} />} />
          <Route
            path="bmi-calculator"
            element={<Form calculationType={"bmi"} />}
          />
          <Route
            path="bmr-calculator"
            element={<Form calculationType={"bmr"} />}
          />
          <Route path="calorie-calculator" element={<ActivityForm />} />
          <Route path="diet-sample" element={<DietSample />} />
        </Route>
      </>
    )
  );

  return (
    <div className=" flex flex-col w-full min-h-screen bg-slate-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
