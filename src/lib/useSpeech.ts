import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>('paused');
  const { play: playSpeech, load } = createSpeechEngine({
    onEnd: () => {},
    onBoundary: () => {},
    onStateUpdate: () => {},
  });

  useEffect(() => {
    if (playbackState === 'paused' || playbackState === 'ended') return;
    readData();
  }, [playbackState, sentences, currentWordRange, currentSentenceIdx]);

  const readData = () => {
    const currentSentence = sentences[currentSentenceIdx];
    if (!currentSentence) {
      setPlaybackState('ended');
      setCurrentSentenceIdx(0);
      setCurrentWordRange([0, 0]);
      return;
    }
    const wordArr = currentSentence.split(' ');
    let activeWord = '';
    const activeWordIndex = currentWordRange[0];
    const nextWordIndex = currentWordRange[1];
    activeWord = wordArr?.[activeWordIndex];
    setTimeout(() => {
      if (activeWord) {
        load(activeWord);
        playSpeech();
        setCurrentWordRange([nextWordIndex, nextWordIndex + 1]);
      } else {
        setCurrentSentenceIdx(currentSentenceIdx + 1);
        setCurrentWordRange([0, 1]);
      }
    }, 500);
  };

  const play = () => {
    setPlaybackState('playing');
    playSpeech();
  };
  const pause = () => {
    setPlaybackState('paused');
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
