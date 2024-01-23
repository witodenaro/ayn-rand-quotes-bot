import GoogleImages from 'google-images';
import { getPreviousRequest, storePreviousRequest } from './repository/previous-request';

const { GOOGLE_CSE_ID, GOOGLE_API_KEY } = Bun.env;

if (!GOOGLE_API_KEY) throw new Error('GOOGLE_API_KEY is not defined');
if (!GOOGLE_CSE_ID) throw new Error('GOOGLE_CSE_ID is not defined');

const imagesClient = new GoogleImages(GOOGLE_CSE_ID, GOOGLE_API_KEY);

const RESULTS_PER_PAGE = 10;

export const fetchNextImage = async () => {
  const previousRequest = (await getPreviousRequest()) || { page: 1, index: 0 };

  const indexToUse = previousRequest.index === RESULTS_PER_PAGE - 1 ? 0 : previousRequest.index + 1;
  const pageToFetch = indexToUse === 0 ? previousRequest.page + 1 : previousRequest.page;

  const image = await fetchImage(pageToFetch, indexToUse);

  await storePreviousRequest(pageToFetch, indexToUse);

  return image;
};

export const fetchImage = async (page: number, index: number) => {
  console.log(`Fetching Ayn Rand Image on page ${page}, index ${index}`);

  const images = await imagesClient.search('Ayn Rand', {
    page: page,
    type: 'face',
  });

  return images[index];
};
