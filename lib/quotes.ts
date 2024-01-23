import parse from 'node-html-parser';
import { getPreviousQuote, storePreviousQuote } from './repository/previous-quote';

const RESULTS_PER_PAGE = 30;

export const fetchNextQuote = async () => {
  const previousRequest = (await getPreviousQuote()) || { page: 1, index: 0 };

  const indexToUse = previousRequest.index === RESULTS_PER_PAGE - 1 ? 0 : previousRequest.index + 1;
  const pageToFetch = indexToUse === 0 ? previousRequest.page + 1 : previousRequest.page;

  const image = await fetchQuote(pageToFetch, indexToUse);

  await storePreviousQuote(pageToFetch, indexToUse);

  return image;
};

export const fetchQuote = async (page: number, index: number) => {
  console.log(`Fetching Ayn Rand Quote on page ${page}, index ${index}`);

  try {
    const response = await fetch(`https://www.goodreads.com/author/quotes/432.Ayn_Rand?page=${page}`);
    const html = await response.text();
    const dom = parse(html);

    const quotes = dom.querySelectorAll('.quote');

    const quote = quotes[index];

    const quoteText = quote.querySelector('.quoteText')?.textContent;

    if (!quoteText) return null;

    return quoteText.split(' ').filter(Boolean).join(' ').split('\n').filter(Boolean).join(' ');
  } catch (error) {
    console.log('Error fetching quote', error);
    return null;
  }
};
