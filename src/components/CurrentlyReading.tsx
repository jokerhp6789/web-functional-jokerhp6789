/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const currentSentence = sentences?.[currentSentenceIdx];

  return (
    <div data-testid="currently-reading">
      <p id="current-sentence" testID="current-sentence">
        {currentSentence?.length
          ? currentSentence.split(' ').map((word, index) => {
              return <span>{word}</span>;
            })
          : null}
      </p>
      <div>
        {sentences.map((sen) => {
          return ` ${sen}`;
        })}
      </div>
    </div>
  );
};
