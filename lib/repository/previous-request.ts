const previousRequestPath = './files/previous_image_request.json';

export const getPreviousRequest = async () => {
  try {
    return await Bun.file(previousRequestPath).json<{ page: number; index: number }>();
  } catch (err) {
    return null;
  }
};

export const storePreviousRequest = async (page: number, index: number) => {
  await Bun.write(previousRequestPath, JSON.stringify({ page, index }));
};
