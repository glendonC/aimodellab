import OpenAI from 'openai';

// Initialize OpenAI client with NVIDIA NIM configuration
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1'
});

export type RefactorRequest = {
  code: string;
  prompt: string;
};

export type RefactorResponse = {
  code: string;
  explanation: string;
};

export class LlamaRefactor {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      baseURL: "https://api.openai.com/v1",
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async refactorCode(request: RefactorRequest): Promise<RefactorResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert at refactoring Python ML code for optimization. Provide the refactored code in a code block and explain your changes."
          },
          {
            role: "user",
            content: `Refactor this code:\n\`\`\`python\n${request.code}\n\`\`\`\n\nRequest: ${request.prompt}`
          }
        ],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024
      });

      const response = completion.choices[0]?.message?.content || '';
      const [code, explanation] = this.parseResponse(response);

      return { code, explanation };
    } catch (error) {
      console.error('Refactor failed:', error);
      throw error;
    }
  }

  private parseResponse(response: string): [string, string] {
    const codeMatch = response.match(/```python\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trim() : '';
    const explanation = response.replace(/```python\n[\s\S]*?```/, '').trim();
    return [code, explanation];
  }
}