"use client";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic, MicOff } from "lucide-react";
import { useEffect } from "react";

interface QueryInputProps {
  onQueryChange: (value: string) => void;
}

const Dictaphone = ({ onQueryChange }: QueryInputProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    onQueryChange(transcript);
  }, [transcript, onQueryChange]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {listening ? (
        <button onClick={SpeechRecognition.stopListening}>
          <Mic />
        </button>
      ) : (
        <button onClick={() => SpeechRecognition.startListening()}>
          <MicOff />
        </button>
      )}
    </div>
  );
};
export default Dictaphone;
