import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/home.css'
import './css/bookpage.css'
import "./css/searchpage.css"
import './css/profile.css'
import './css/reviewpage.css'
import './css/contribute.css'
import App from './app'


createRoot(document.getElementById('root'))
    .render(<App />)