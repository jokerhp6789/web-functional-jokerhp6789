import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {
    currentWord,
    currentSentence,
    controls,
    play,
    playbackState,
    pause,
    currentSentenceIdx,
    currentWordRange,
  } = useSpeech(sentences);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetchContent();
    setSentences(res as any);
  }

  return (
    <div className="App">
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls
          loadNewContent={loadData}
          pause={pause}
          play={play}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
