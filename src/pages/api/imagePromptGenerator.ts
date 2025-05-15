import QuestionFormModel from "@/schemas/questions.schema";
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";
import { ObjectId } from "mongodb";

const model = "gpt-4o-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
interface RequestBody {
  quizId: string;
  originalPrompt?: string;
  userPrompt?: string;
}

const promptStructure = [
  {
    role: "system",
    content:
      "You are an image prompt generator for fal.ai that always generates high-resolution image prompts.",
  },
  { role: "user", content: "PromptWithQuestions" },
];
export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const { quizId, originalPrompt, userPrompt } =
        (await request.body) as RequestBody;
      if (!quizId || !ObjectId.isValid(quizId)) {
        return res.json({ error: "QuizId is not valid or empty" });
      }
      
      console.log("Original and user prompt provided", originalPrompt, userPrompt);
      
      const questions = await QuestionFormModel.findOne(
        { quizId },
        { questionAnswer: 1, _id: 0 } // Projection to retrieve only questionAnswer
      ).lean();

      console.log("Questions:", questions, typeof questions?.questionAnswer);
      if (!questions) {
        return res.json({ error: "Error in fetching questions" });
      }
      const initialQuestions = questions?.questionAnswer;
      const questionPrompt = `
        You are an AI assistant tasked with creating detailed image generation prompt for fal.ai according product descriptions for an e-commerce website.
        Based on the following product features and answers, generate a concise and persuasive product description that can be used to entice customers and enhance product listings:

        1. Question: ${initialQuestions[0]?.question ?? ""}, Answer: ${
        initialQuestions[0]?.answer ?? ""
      }
        2. Question: ${initialQuestions[1]?.question ?? ""}, Answer: ${
        initialQuestions[1]?.answer ?? ""
      }
        3. Question: ${initialQuestions[2]?.question ?? ""}, Answer: ${
        initialQuestions[2]?.answer ?? ""
      }
        4. Question: ${initialQuestions[3]?.question ?? ""}, Answer: ${
        initialQuestions[3]?.answer ?? ""
      }

        Combine these details into a single, compelling product description that highlights the product's unique selling points and appeals to the target audience.
        Combine these details into a single, coherent prompt that describes the desired image in a way that fal.ai can understand and use for image generation.

       Generate a prompt for fal.ai like the below examples:
        1 - A glamorous young woman with long, wavy blonde hair and smokey eye makeup, posing in a luxury hotel room. She’s wearing a sparkly gold cocktail dress and holding up a white card with “/u/GlamGirl23” written on it in elegant calligraphy. Soft, warm lighting creates a luxurious atmosphere.
        2 - A elegant female ballet dancer in a white tutu and pointe shoes, performing an arabesque pose in a grand theater. Her hair is in a perfect bun, and her makeup is stage-ready. She’s gracefully holding a delicate, swan-shaped card with “/u/PirouettePrincess” written in flowing script. The rich red velvet curtains and ornate gold decorations of the theater create a luxurious backdrop.
        3 - A charismatic speaker is captured mid-speech. He has short, tousled brown hair that’s slightly messy on top. He has a round circle face, clean shaven, adorned with rounded rectangular-framed glasses with dark rims, is animated as he gestures with his left hand. He is holding a black microphone in his right hand, speaking passionately. The man is wearing a light grey sweater over a white t-shirt. He’s also wearing a simple black lanyard hanging around his neck. The lanyard badge has the text “Anakin AI”. Behind him, there is a blurred background with a white banner containing logos and text (including Anakin AI), a professional conference setting.
        4 - "Close-up portrait of a child with bright, vivid emotions, their eyes wide and sparkling with joy, a genuine, infectious smile spreading across their face. The sunlight dances on their features, highlighting the rosy cheeks and creating a warm, radiant glow. The background is slightly out of focus, enhancing the child's exuberant expression and the feeling of pure, unfiltered happiness".
        5 - "Capture a serene lake reflecting a dense forest during golden hour. The composition should emphasize symmetry, with the horizon line perfectly dividing the image. Use a DSLR camera with a wide-angle lens, setting the aperture to f/8 for depth of field, ISO 100 for clarity, and a shutter speed of 1/125 to capture natural lighting. The color palette should include deep greens, soft oranges, and gentle blues to highlight the warm, peaceful atmosphere".
        6 - Capture the fleeting moment when strangers share a spontaneous laugh at a street corner in a bustling city. Focus on the joyful expressions, diverse clothing styles, and the vibrant, textured background of urban graffiti and bustling pedestrians. Use a Canon EOS R5 at 1/500s, f/2.8, ISO 400 to capture the motion and emotion vividly. The atmosphere should convey the energy and diversity of city life, with the warm hues of a setting sun casting long shadows
        7 - A charismatic speaker is captured mid-speech. He has short, tousled brown hair that's slightly messy on top. He has a round circle face, clean shaven, adorned with rounded rectangular-framed glasses with dark rims, is animated as he gestures with his left hand. He is holding a black microphone in his right hand, speaking passionately.  The man is wearing a light grey sweater over a white t-shirt. He's also wearing a simple black lanyard hanging around his neck. The lanyard badge has the text "Anakin AI".  Behind him, there is a blurred background with a white banner containing logos and text (including Anakin AI), a professional conference setting.
        8 - A close-up portrait of a seasoned female journalist in her late 50s. She has short salt-and-pepper hair, keen hazel eyes behind rectangular glasses, and subtle laugh lines. Her expression is one of intense focus as she interviews someone off-camera. Soft, natural lighting from a nearby window illuminates her face, highlighting her determined demeanor. She's wearing a crisp white blouse and a navy blazer.
        9 - An elderl Indigenous man in his late 80s sits on a weathered wooden bench, gazing thoughtfully at a distant mountain range. His face is a roadmap of deep wrinkles, telling stories of a life well-lived. He has long, silver hair tied back in a neat braid, and his dark eyes hold a wealth of wisdom. He's wearing traditional clothing adorned with intricate beadwork. The golden light of sunset bathes the scene in warm hues, creating a serene and powerful atmosphere.
        10 - A stunning and vibrant artwork of London cityscape, showcasing the iconic Big Ben clock tower as the focal point. The tower stands tall and majestic, with a glowing orange and yellow sunset casting a warm glow over the scene. To the left, a classic red telephone booth adds a touch of traditional British charm, its reflection mirrored in the wet, glistening streets. The streets have a dreamy, watercolor-like quality, with muted grays, vibrant reds, and splashes of blue in the reflections of the buildings and sky. The overall composition is reminiscent of a movie scene, capturing the essence of London in a captivating and artistic way., photo, cinematic, poster, vibrant, painting, illustration, portrait photography
        `;

      const messages = promptStructure.map((message) => {
        if (message.role === "user") {
          return { ...message, content: questionPrompt };
        }
        return message;
      });
      if (originalPrompt) {
        messages.push({
          role: "assistant",
          content: originalPrompt,
        });
      }
      if (userPrompt) {
        messages.push({
          role: "user",
          content: userPrompt,
        });
      }
      // console.log("Prompt:", messages)
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages as OpenAI.Chat.ChatCompletionMessage[],
      });
      const processedResult = completion.choices[0].message.content ?? "";
      // Return the processed result
      console.log("Process result:", processedResult);
      return res.status(200).json({
        success: true,
        message: processedResult,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      const errorMessage = "Failed to process request";
      return res.json({ error: errorMessage });
    }
  } else {
    return res.json({ error: "Method not allowed" });
  }
}
