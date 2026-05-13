import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeComplaint = async (text) => {

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    messages: [
      {
        role: "system",
        content: `
You categorize hostel complaints.

Allowed categories:
- Electrical
- Plumbing
- Internet
- Cleaning
- Furniture
- Mess
- Security
- Maintenance
- Other

Allowed priorities:
- High
- Medium
- Low

Return ONLY valid JSON.

Example:
{
  "category":"Electrical",
  "priority":"High"
}
`
      },

      {
        role: "user",
        content: text
      }
    ]
  });

  return JSON.parse(response.choices[0].message.content);
};

export const generateAnnouncementAI = async (prompt) => {

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    messages: [
      {
        role: "system",
        content: `
Generate professional hostel announcements.

Keep them:
- formal
- concise
- student-friendly
- proper formatting

`
      },

      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.choices[0].message.content;
};