require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const openaikey = process.env.OPENAI_API_KEY;

app.post("/diet-sample", async (req, res) => {
  const { age, height, weight, gender, Diet, style, activity, goal, BMR } =
    req.body;

  if (
    !age ||
    !height ||
    !weight ||
    !gender ||
    !Diet ||
    !activity ||
    !goal ||
    !BMR
  ) {
    return res.status(400).json({
      msg: "Missing fields please try again",
    });
  }

  const chatprompt = `Create a personalised ${Diet.toLowerCase()} diet plan with ${style} style for a ${age} year old ${gender} weighing ${weight} and ${height} cms tall. 
   whose activity level is ${activity} and his goal is ${goal}
   The calorie intake should be around ${BMR.toFixed(
     0
   )}calories. Provide a meal with specifiq quantities and macros like fats, carbs and protien`;

  try {
    const response = await axios.post(
      `https://api.openai.com/v1/chat/completions`,
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant, which provides diet samples",
          },
          {
            role: "user",
            content: chatprompt,
          },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${openaikey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices && response.data.choices[0].message.content) {
      res.json({
        dietSample: response.data.choices[0].message.content.trim(),
      });
    } else {
      throw new Error("Unexpected error");
    }
  } catch (error) {
    console.error(`Error with your API Key`, error);
    res.status(500).json({
      msg: "Error Generating diet plan",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
