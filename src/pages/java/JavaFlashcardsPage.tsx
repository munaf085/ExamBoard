import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, RefreshCw, Check, X, Shuffle, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JavaFlashcard } from '../../types';
import { markFlashcardKnown } from '../../utils/javaStorage';

// We'll try to import real flashcards, but provide a fallback if it fails or doesn't exist
let javaFlashcards: JavaFlashcard[] = [];
try {
  // @ts-ignore - might not exist yet
  const data = require('../../data/java/javaFlashcards');
  javaFlashcards = data.javaFlashcards || [];
} catch (e) {
  javaFlashcards = [
    {
      id: 'fc-1',
      moduleId: 'java-fundamentals',
      front: 'What is the main purpose of the JVM?',
      back: 'The JVM (Java Virtual Machine) executes Java bytecode. It provides a runtime environment and makes Java platform-independent.',
      tags: ['Architecture'],
      difficulty: 'Easy'
    },
    {
      id: 'fc-2',
      moduleId: 'java-data-types',
      front: 'What is auto-boxing in Java?',
      back: 'Auto-boxing is the automatic conversion that the Java compiler makes between the primitive types and their corresponding object wrapper classes (e.g., int to Integer).',
      tags: ['Primitives'],
      difficulty: 'Medium'
    },
    {
      id: 'fc-3',
      moduleId: 'java-strings',
      front: 'Why is String immutable in Java?',
      back: 'Security (used in class loading, DB connections), caching (String pool), synchronization (inherently thread-safe), and performance (hashcode caching).',
      tags: ['Immutability'],
      difficulty: 'Medium'
    },
    {
      id: 'fc-4',
      moduleId: 'java-oop-basics',
      front: 'Can we override static methods in Java?',
      back: 'No. Static methods belong to the class, not the object. If a subclass defines a static method with the same signature, it "hides" the parent method rather than overriding it.',
      tags: ['Methods'],
      difficulty: 'Medium'
    }
  ];
}

const JavaFlashcardsPage: React.FC = () => {
  const [cards, setCards] = useState<JavaFlashcard[]>(javaFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Weak Topics' | 'Random'>('All');
  const [knownCount, setKnownCount] = useState(0);

  useEffect(() => {
    // Reset index and flip state when filter changes
    setCurrentIndex(0);
    setIsFlipped(false);
    
    let filteredCards = [...javaFlashcards];
    if (filter === 'Random') {
      filteredCards.sort(() => Math.random() - 0.5);
    } else if (filter === 'Weak Topics') {
      // In a real app, we'd filter by weak topics from progress
      // For now just taking a subset
      filteredCards = filteredCards.slice(0, Math.ceil(filteredCards.length / 2));
    }
    
    setCards(filteredCards.length > 0 ? filteredCards : javaFlashcards);
  }, [filter]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (known: boolean) => {
    const currentCard = cards[currentIndex];
    
    if (known) {
      markFlashcardKnown(currentCard.id);
      setKnownCount(prev => prev + 1);
    }
    
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reached end, loop back or show summary
        setCurrentIndex(0);
      }
    }, 150); // slight delay to allow flip animation to start before content changes
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCards(prev => [...prev].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
    }, 200);
  };

  if (cards.length === 0) {
    return <div className="p-8 text-center text-slate-300 min-h-screen bg-slate-900">No flashcards found.</div>;
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <Link to="/java" className="text-slate-400 hover:text-white transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </Link>
        
        <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
          {(['All', 'Weak Topics', 'Random'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-slate-400">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="text-sm font-semibold text-green-400">
            {knownCount} Mastered
          </div>
          <button 
            onClick={handleShuffle}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Shuffle className="w-4 h-4" /> Shuffle
          </button>
        </div>

        {/* Flashcard Container */}
        <div className="relative w-full h-80 mb-8 cursor-pointer" onClick={handleFlip} style={{ perspective: '1000px' }}>
          <div 
            className="w-full h-full relative" 
            style={{ 
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', 
              transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)', 
              transformStyle: 'preserve-3d' 
            }}
          >
            {/* Front */}
            <div 
              className="absolute w-full h-full backface-hidden bg-slate-800 border-2 border-slate-700 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute top-4 left-4 bg-slate-900 px-3 py-1 rounded-full text-xs text-slate-400 border border-slate-700 flex items-center gap-2">
                <Layout className="w-3 h-3" />
                {currentCard.moduleId}
              </div>
              <div className="absolute top-4 right-4 bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-800/50">
                {currentCard.tags && currentCard.tags[0]}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mt-4 leading-tight">
                {currentCard.front}
              </h2>
              
              <div className="absolute bottom-6 text-slate-500 text-sm animate-pulse flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Click to flip
              </div>
            </div>

            {/* Back */}
            <div 
              className="absolute w-full h-full backface-hidden bg-slate-800 border-2 border-blue-600/50 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center overflow-y-auto"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="text-xl md:text-2xl text-slate-200 leading-relaxed">
                {currentCard.back}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={`flex justify-center gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
            className="flex-1 flex items-center justify-center gap-2 bg-red-900/30 hover:bg-red-900/50 border border-red-700/50 text-red-400 px-6 py-4 rounded-xl font-bold transition-all text-lg"
          >
            <X className="w-6 h-6" /> Review Again
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
            className="flex-1 flex items-center justify-center gap-2 bg-green-900/30 hover:bg-green-900/50 border border-green-700/50 text-green-400 px-6 py-4 rounded-xl font-bold transition-all text-lg"
          >
            <Check className="w-6 h-6" /> I Know This
          </button>
        </div>
      </div>
    </div>
  );
};

export default JavaFlashcardsPage;

