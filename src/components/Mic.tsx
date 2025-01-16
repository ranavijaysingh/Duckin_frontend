declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }

  var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };

  var webkitSpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionError {
  error: string;
  message: string;
}

import { Mic, Pause } from "lucide-react";
import React, { useState, useEffect } from "react";

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  useEffect(() => {
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => transcriptSegment);
        } else {
          interimTranscript += transcriptSegment;
        }
      }
      setTranscript((prev) => prev + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error("Speech recognition error", event);
      setError(`Error occurred in speech recognition: ${event.error}`);
    };

    console.log("recognition", recognition);
    return () => {
      recognition.stop();
    };
  }, [recognition]);

  const startRecording = () => {
    setIsRecording(true);
    setError(null);
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
  };

  const switchRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div>
      <button onClick={() => switchRecord()}>
        {isRecording ? <Pause /> : <Mic />}
      </button>
      <p>{transcript}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SpeechToText;
