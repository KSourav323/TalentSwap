import Landing from "./pages/landing.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Profile from "./pages/profile.jsx"
import Learner from "./pages/learner.jsx";
import Tutor from "./pages/tutor.jsx";
import Course from "./pages/course.jsx" 
import Manage from "./pages/manage.jsx"
import Notification from "./pages/notification.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Search from "./pages/search.jsx"


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import './style/App.css'

function App(){

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
            <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/search" element={<Search/>} />
              <Route path="/manage/:courseId" element={<Manage/>} />
              <Route path="/notification" element={<Notification/>} />
              <Route path="/course/:courseId" element={<Course/>} />
              <Route path="/learner" element={<ProtectedRoute element={Learner} />} />
              <Route path="/tutor" element={<ProtectedRoute element={Tutor} />} />
            </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
 