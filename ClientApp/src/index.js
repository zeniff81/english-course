import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LessonsState from './context/lessons/LessonsState';
import App from './App';
import { createRoot } from 'react-dom/client';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const container = document.querySelector('#root')
const root = createRoot(container)

root.render(<LessonsState>
  <BrowserRouter basename={baseUrl}> 
    <App />
  </BrowserRouter>
</LessonsState>);

