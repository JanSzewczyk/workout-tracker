import OpenIA from "openai";

const apenai = new OpenIA({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const { exerciseName } = await request.json();

  if (!exerciseName) {
    return Response.json({ message: "Exercise name is required" }, { status: 400 });
  }

  const prompt = `
  You are a fitness coach.
  You are given an exercise, provide clear instructions on how to perform the exercise. Include if any equipment is needed.
  Explain the exercise in detail and for a beginner.
  
  The exercise name is: ${exerciseName}
  
  use following format:
  
  ## Equipment Required 
  
  ## Instructions 
  
  ### Tips
  
  ### Variations 
  
  ### Safety 
  
  Keep spacing between the heading and the content.
  
  Always use heading and subheadings.
  `;

  try {
    const response = await apenai.chat.completions.create({
      model: "gbt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });
    return Response.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching AI guidance:", error);
    return Response.json(
      { message: "Sorry, we could not fetch AI guidance at this time. Please try again later." },
      { status: 500 }
    );
  }
}
