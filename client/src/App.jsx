import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { GettingStarted } from "./routes/GettingStarted";
import { Lesson } from "./routes/Lesson";
import { Leaderboard } from "./routes/Leaderboard";
import { Signup } from "./routes/Signup";
import { Signin } from "./routes/Signin";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute/";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/learn"
        element={
          <ProtectedRoute>
            <GettingStarted />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:languageId"
        element={
          <ProtectedRoute>
            <Lesson />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:languageId/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
