import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, BarChart3 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const surveyQuestions: Question[] = [
  {
    id: 1,
    question: "What's the biggest challenge you face when trying to decide what to cook?",
    options: [
      "I never know what I'm in the mood for",
      "I don't have the right ingredients",
      "I get overwhelmed by too many options",
      "I'm not confident in the kitchen",
      "I usually just end up ordering food"
    ]
  },
  {
    id: 2,
    question: "Do you ever find yourself stuck with a few random ingredients and no idea how to use them?",
    options: [
      "Yes, all the time",
      "Occasionally",
      "Rarely",
      "No, I usually know what to make"
    ]
  },
  {
    id: 3,
    question: "How confident are you in your cooking skills?",
    options: [
      "I'm a total beginner",
      "I can follow basic recipes",
      "I'm comfortable experimenting",
      "I'm experienced and love to cook"
    ]
  },
  {
    id: 4,
    question: "What usually stops you from cooking at home more often?",
    options: [
      "Not enough time",
      "I don't know what to make",
      "Cooking feels too complicated",
      "Grocery shopping is a hassle",
      "I don't enjoy cooking"
    ]
  },
  {
    id: 5,
    question: "When you're hungry, how do you decide what to eat?",
    options: [
      "I check what ingredients I have",
      "I scroll social media or Google recipes",
      "I go with my usual go-to meal",
      "I order takeout or delivery",
      "I ask someone else what they want"
    ]
  },
  {
    id: 6,
    question: "Have you tried searching for recipes based on ingredients you already have?",
    options: [
      "Yes, but the results weren't helpful",
      "Yes, and it worked okay",
      "No, I didn't know that was possible",
      "No, I usually just search by meal type or cuisine"
    ]
  }
];

const ForkIcon = () => (
  <svg 
    className="w-8 h-8 text-white" 
    viewBox="0 0 100 100" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m96.8836746 19.0683708c-.7995605-.799551-2.0988235-.799551-2.7984314-.0999432l-16.8905258 16.8905202c-.4997177.899498-1.6990433 1.0993843-2.4985962.5996628-.7995529-.4997177-1.0993805-1.6990471-.5996628-2.4985962.0999451-.1998901.2998352-.3997765.5996628-.5996628l16.8905182-16.8905201c.7995605-.799552.7995605-1.9988785 0-2.6984854-.7995529-.799552-1.9988785-.799552-2.6984787 0l-16.9904633 16.7905741c-.6996078.8994961-1.9988785.9994392-2.8983765.2998314-.6996078-.8994942-.4997177-2.1987667.2998352-2.8983727l16.8905182-16.8905201c.7995529-.799552.7995529-1.9988785 0-2.6984854-.7995529-.799552-1.9988785-.799552-2.6984787 0l-16.8905334 16.8905192c-.6996002.8994942-1.9988785.9994392-2.8983727.2998314-.6996078-.8994961-.4997215-2.1987667.2998314-2.8983727l16.990471-16.7905764c.7995529-.7995515.7995529-1.9988782 0-2.6984856l-.0999451-.0999436c-.6996078-.6996076-1.798996-.7995512-2.5985413-.0999439l-10.2942276 8.3952875c-10.6939964 8.7950659-13.9921455 13.3924837-13.9921455 20.888279 0 4.2975845-.899498 8.5951767-4.9971962 12.5929337-13.1925964 12.8927601-31.0825558 23.286929-43.9753199 40.77711-3.3980932 4.5974197-3.0982614 7.5957336-.5996637 9.9943924 2.398654 2.3986511 5.3969717 2.7984314 9.9943905-.5996628 17.3902397-12.8927689 27.8843498-30.7827225 40.6771698-43.9753227 3.997757-4.0976982 8.2953453-4.8972511 12.5929298-4.9971924 7.4957962 0 12.0932159-3.3980942 20.8882828-14.0920925l8.4952316-10.2942238c.5996628-.7995491.4997177-1.8989334-.1998825-2.5985394z"/>
  </svg>
);

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
  };

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;
  const currentAnswer = answers[surveyQuestions[currentQuestion]?.id];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center border border-gray-700">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-gray-300 text-lg">Your responses have been recorded successfully.</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Your Responses
            </h3>
            <div className="space-y-4 text-left">
              {surveyQuestions.map((question) => (
                <div key={question.id} className="border-l-4 border-orange-500 pl-4">
                  <p className="text-sm text-gray-400 mb-1">{question.question}</p>
                  <p className="font-medium text-white">{answers[question.id]}</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleRestart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
          >
            Take Survey Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 max-w-2xl w-full border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
              <ForkIcon />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Cooking Survey</h1>
              <p className="text-gray-300">Help us understand your cooking habits</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Question</div>
            <div className="text-xl font-semibold text-white">
              {currentQuestion + 1} of {surveyQuestions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-semibold text-white">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">
            {surveyQuestions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {surveyQuestions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500 ${
                  currentAnswer === option
                    ? 'border-white bg-gray-800'
                    : 'border-white bg-gray-900'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${surveyQuestions[currentQuestion].id}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={() => handleAnswerSelect(surveyQuestions[currentQuestion].id, option)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    currentAnswer === option
                      ? 'border-white bg-white'
                      : 'border-white'
                  }`}>
                    {currentAnswer === option && (
                      <div className="w-2 h-2 bg-black rounded-full" />
                    )}
                  </div>
                  <span className={`text-white ${
                    currentAnswer === option ? 'font-medium' : ''
                  }`}>
                    {option}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
              currentQuestion === 0
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`flex items-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
              !currentAnswer
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {currentQuestion === surveyQuestions.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;