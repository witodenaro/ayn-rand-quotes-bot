const chatIdsPath = './files/chat_ids.json';

export const saveChatId = async (userId: number, chatId: number) => {
  const chatIds = await getChatIds();

  const updatedChatIds = {
    ...chatIds,
    [userId]: chatId,
  };

  await Bun.write(chatIdsPath, JSON.stringify(updatedChatIds));
};

export const getChatIds = async () => {
  try {
    return await Bun.file(chatIdsPath).json<Record<number, number>>();
  } catch (err) {
    return {};
  }
};
