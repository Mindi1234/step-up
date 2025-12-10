// export async function POST(req: Request) {
//     try {
//         const { content } = await req.json();

//         const prompt = `
//         You are an assistant for a habit-buliding app called StepUp.
//         Analyze the following post:
//         - Is it related to progress, habits, self-improvement, challenge, milestone, achievement, or motivation?
//         - If not, return allowed: false with a short reason.
//         - If the tone is too negative, rewrite it in a more positive, encouraging tone.
//         - Respond strictly on JSON:
//         {
//         "allowed": boolean,
//         "reason": string | null,
//         "rewrite": string |null
//         }

//         Post:"""${content}"""
//         `;

//         const aiRes=await fetch(
//             ""
//         )
//     }
// }