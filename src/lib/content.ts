const API_URL = 'http://localhost:5174/content';

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */

const fetchContent = async (url = API_URL): Promise<string> => {
  return fetch(url)
    .then(async (res) => {
      const json = await res?.json?.();
      return json;
    })
    .then((data) => {
      const parse = parseContentIntoSentences(data?.content);
      return parse;
    })
    .catch((error) => {
      return '<s>There is an error</s>';
    }) as any;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  const replaced = content.replace('<speak>', '').replace('</speak>', '');
  const arrStr = replaced.split('<s>');
  const sentences: Array<string> = [];

  arrStr.forEach((str) => {
    const s = str.replace('</s>', '');
    sentences.push(s);
  });

  return sentences.filter((i) => !!i);
};

export { fetchContent, parseContentIntoSentences };
