import React from 'react'
import Lessons from './components/lessons/Lessons';
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import Tasks from './components/tasks/Tasks';
import Header from './components/layout/header/header';
import Footer from './components/layout/footer/footer';

import Content from './components/layout/content/Content';

import DisplayConversation from './components/display-conversation/DisplayConversation';
import DisplayFlashcards from './components/display-flashcards/DisplayFlashcards';
import DisplayListening from './components/display-listening/DisplayListening';
import FlashcardsTest from './components/display-flashcards/FlashcardsTest';
import FlashcardsPractice from './components/display-flashcards/FlashcardsPractice';
import ListeningTest from './components/display-listening/ListeningTest';
import ListeningPractice from './components/display-listening/ListeningPractice';
import UpdateWithExcel from './components/UpdateWithExcel/UpdateWithExcel';



function App({ history }) {  
  return (
      <div className="app">        
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<Lessons />} />
              <Route path="/home" element={<Lessons />} />
              <Route path="/index.html" element={<Lessons />} />
              <Route path="/lessons/:lessonId/tasks" element={<Tasks />} />
              <Route path="/lessons/:lessonId/conversation" element={<DisplayConversation />} />
              <Route path="/lessons/:lessonId/flashcards" element={<DisplayFlashcards />} />
              <Route path="/lessons/:lessonId/listening" element={<DisplayListening />} />
              <Route path="/lessons/:lessonId/flashcards/practice" element={<FlashcardsPractice />} />
              <Route path="/lessons/:lessonId/listening/practice" element={<ListeningPractice />} />
              <Route path="/lessons/:lessonId/flashcards/test" element={<FlashcardsTest />} />
              <Route path="/lessons/:lessonId/listening/test" element={<ListeningTest />} />
              <Route path="/lessons/updateWithExcel" element={<UpdateWithExcel />} />
            </Routes>
          </Content>          
          <Footer />
          <div className="margin-for-footer"></div>
      </div>
  );
}

export default App;
