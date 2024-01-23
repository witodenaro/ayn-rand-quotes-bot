const previousQuotePath = './files/previous_quote.json';

export const getPreviousQuote = async () => {
  try {
    return await Bun.file(previousQuotePath).json<{ page: number; index: number }>();
  } catch (err) {
    return null;
  }
};

export const storePreviousQuote = async (page: number, index: number) => {
  await Bun.write(previousQuotePath, JSON.stringify({ page, index }));
};
