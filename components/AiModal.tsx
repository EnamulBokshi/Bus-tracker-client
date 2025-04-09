"use client"
import React from 'react';
import { Bot } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { askAI } from '@/lib/actions/askai';


const AiModal =  () => {

  const [question, setQuestion] = React.useState<string>('');
  const [response, setResponse] = React.useState<Response>({} as Response);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState('');


  const handleQuestionSubmit = async () => {
    if (question.trim() === '') {
      setError('Please enter a question.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse({} as Response);
    setQuestion('');

    try {
      const response = await askAI(question);
      console.log("AI Response:", response);
      if (response) {
        setResponse(response);
        setQuestion('');
      } else {
        setError('No response from the AI.');
      }

    } catch (err) {
      setError('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="fixed top-4 right-4 z-50">
        <a className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 border border-white/20 backdrop-blur-md ring-1 ring-white/30">
          <Bot className="w-5 h-5 animate-pulse drop-shadow" />
          Ask AI
        </a>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl text-white">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-white">💬 Ask me about DIU Bus</SheetTitle>
          <SheetDescription className="text-white/70">
            Your smart bus assistant is listening...
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 p-4 animate-fade-in">
          <textarea
            className="w-full h-32 p-4 text-white bg-white/10 border border-white/20 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 resize-none"
            placeholder="E.g., When is the next bus from Campus 3?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleQuestionSubmit();
              }
            }}
          ></textarea>

          <button onClick={handleQuestionSubmit} className="self-end px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-md ring-1 ring-white/20">
            🚀 Ask
          </button>

        </div>
        <div className="p-4">
          {error && <p className="text-white/90 italic animate-pulse">{'Dude! you forgot to add your questions!! 🙂🙂'}</p>}
        </div>
        <div className="p-4 border-t border-white/10 mt-2">
          <h2 className="text-lg font-semibold text-white mb-1">🤖 AI Response:</h2>
          <div className="text-white/90 italic animate-pulse">
            {/* Response Placeholder */}
            {loading ? 'Typing...' : response || 'Ask me anything about DIU Bus!'}
            {/* {loading ? 'Typing...' : response instanceof Response ? JSON.stringify(response) : response || 'Ask me anything about DIU Bus!'} */}

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AiModal;
