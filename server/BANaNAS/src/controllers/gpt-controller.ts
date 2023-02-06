import { Request, Response } from 'express';

export const gptController = async (req: Request, res: Response) => {
  try {
    const { data1what, data1where, data2what, data2where, rIndex } = req.body;

    const url =
      'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const prompt = `Given that the r-index of ${data1what} in ${data1where} and ${data2what} in ${data2where} is ${rIndex}, respond with a humerous, sarcastic conclusion about their relationship from the perspective of somebody from ${data1where}. Make sure to refrerence both countries in your response. keep the response under 75 words. Assume that any correlation means causation.`;
    // const prompt = `In the context of a satirical debate between two imaginary political figures, what would be an accusing punchline to emphasize the fact that ${data1where} ${data1what} has a ${rIndex} correlation index to the ${data2what} of the ${data2where}? It should be funny. Keep the response under 75 words`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    };

    const data = {
      prompt: prompt,
      max_tokens: 150,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    let conclusion = await response.json();
    console.log(conclusion);
    conclusion = conclusion.choices[0].text;
    conclusion = conclusion.slice(2);
    conclusion = conclusion.replace(/^"|"$/g, '');
    res.status(200).json({ conclusion });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
