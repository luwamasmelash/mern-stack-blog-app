import axios from "axios";

async function main(prompt) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-chat-v3-0324",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert blog writer.

Your job is to generate high-quality blog articles.

Strict rules:
- Return ONLY the blog article.
- Do NOT say "Sure", "Certainly", or "Here is your blog".
- Do NOT ask any questions.
- Do NOT add explanations or notes.
- Do NOT mention AI.
- Do NOT wrap the response in markdown code blocks.
- Start directly with the blog title.
- Write in a professional and engaging style.
- Use clear headings and subheadings.
- End with a conclusion.
- Output only the final blog article and nothing else.`,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 2000,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error(
            "OpenRouter Error:",
            error.response?.data || error.message
        );
        throw new Error("Failed to generate blog.");
    }
}

export default main;