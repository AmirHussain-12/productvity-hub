import * as React from "react";
import { Routes, Route } from 'react-router-dom';

import Notes from './notes';
import Task from "./task";

import './styles/App.css';

const App = () => (
  <Routes>
    <Route path="notes/*" element={<Notes resource="notes" />} />
    <Route path="tasks/*" element={<Task resource="tasks" />} />
  </Routes>
);

export default App;
