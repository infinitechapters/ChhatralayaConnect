
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
    console.error("FULL ERROR:",err);
    // console.error(err);
    // console.error(err.stack);

    return {
      category: "General",
      priority: "Medium",
    };
  }
};

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