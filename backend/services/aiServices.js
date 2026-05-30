// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const analyzeComplaint = async (text) => {

//   const response = await client.chat.completions.create({
//     model: "gpt-4.1-mini",

//     messages: [
//       {
//         role: "system",
//         content: `
// You categorize hostel complaints.

// Allowed categories:
// - Electrical
// - Plumbing
// - Internet
// - Cleaning
// - Furniture
// - Mess
// - Security
// - Maintenance
// - Other

// Allowed priorities:
// - High
// - Medium
// - Low

// Return ONLY valid JSON.

// Example:
// {
//   "category":"Electrical",
//   "priority":"High"
// }
// `
//       },

//       {
//         role: "user",
//         content: text
//       }
//     ]
//   });

//   return JSON.parse(response.choices[0].message.content);
// };

// export const generateAnnouncementAI = async (prompt) => {

//   const response = await client.chat.completions.create({
//     model: "gpt-4.1-mini",

//     messages: [
//       {
//         role: "system",
//         content: `
// Generate professional hostel announcements.

// Keep them:
// - formal
// - concise
// - student-friendly
// - proper formatting

// `
//       },

//       {
//         role: "user",
//         content: prompt
//       }
//     ]
//   });

//   return response.choices[0].message.content;
// };

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const analyzeComplaint = async (text) => {
  try {
    const result = await model.generateContent(`
You categorize hostel complaints.

Allowed categories:
Electrical
Plumbing
Internet
Cleaning
Furniture
Mess
Security
Maintenance
Other

Allowed priorities:
High
Medium
Low

IMPORTANT:
Return ONLY valid JSON.
Do not use markdown.
Do not use bullet points.
Do not explain.

Example:
{
  "category": "Plumbing",
  "priority": "High"
}

Complaint:
${text}
`);

    const response = result.response.text();

    console.log("RAW:", response);

    const cleanedResponse = response
      .replace("```json", "")
      .replace("```", "")
      .trim();

    console.log("CLEANED:", cleanedResponse);

    try {
  return JSON.parse(cleanedResponse);
} catch (err) {
  console.log("Gemini returned invalid JSON:", cleanedResponse);

  return {
    category: "Other",
    priority: "Medium",
  };
}

  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    console.error(err.stack);

    return {
      category: "General",
      priority: "Medium",
    };
  }
};

// export const analyzeComplaint = async (text) => {
//   const result = await model.generateContent(`
// You categorize hostel complaints.

// Allowed categories:
// Electrical
// Plumbing
// Internet
// Cleaning
// Furniture
// Mess
// Security
// Maintenance
// Other

// Allowed priorities:
// High
// Medium
// Low

// Return ONLY valid JSON.

// Complaint:
// ${text}
// `);

//   const response = result.response.text();

// const cleanedResponse = response
//   .replace("```json", "")
//   .replace("```", "")
//   .trim();

// return JSON.parse(cleanedResponse);
// };

export const generateAnnouncementAI = async (prompt) => {

  const result = await model.generateContent(`
Generate a professional hostel announcement.

Requirements:
- Formal
- Concise
- Student-friendly

Topic:
${prompt}
`);

  return result.response.text();
};