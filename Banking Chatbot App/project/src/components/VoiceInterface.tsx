import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceInterfaceProps {
  onVoiceInput: (text: string) => void;
  onSpeakResponse: (text: string) => void;
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ onVoiceInput, onSpeakResponse }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
  }, [onVoiceInput]);

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const speakText = (text: string) => {
    if (synthesis && !isSpeaking) {
      // Stop any ongoing speech
      synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      synthesis.speak(utterance);
      onSpeakResponse(text);
    }
  };

  const stopSpeaking = () => {
    if (synthesis && isSpeaking) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Auto-speak bot responses
  useEffect(() => {
    const handleBotResponse = (text: string) => {
      // Clean text for speech (remove emojis and special characters)
      const cleanText = text.replace(/[^\w\s.,!?-]/g, '').replace(/\n+/g, '. ');
      if (cleanText.length > 0 && cleanText.length < 500) { // Don't speak very long responses
        speakText(cleanText);
      }
    };

    // This would be called when a bot response is received
    // For now, we'll expose it through the prop
    onSpeakResponse = handleBotResponse;
  }, [synthesis, isSpeaking]);

  if (!recognition && !synthesis) {
    return null; // Voice features not supported
  }

  return (
    <div className="flex items-center space-x-2">
      {recognition && (
        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-2 rounded-full transition-all duration-200 ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      )}

      {synthesis && (
        <button
          onClick={isSpeaking ? stopSpeaking : () => {}}
          className={`p-2 rounded-full transition-all duration-200 ${
            isSpeaking 
              ? 'bg-blue-500 text-white animate-pulse' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={isSpeaking ? 'Stop speaking' : 'Voice responses enabled'}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {isListening && (
        <div className="flex items-center space-x-1 text-red-500 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="ml-2">Listening...</span>
        </div>
      )}
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}