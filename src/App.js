import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import {Home,VideoPage,PrivateRoute,Library,Login,History,SignUp} from "./pages";
import {Playlist} from "./pages/Library/Playlist";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <PrivateRoute path="/" element={<Home />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <PrivateRoute path="/library" element={<Library/>}/>
          <PrivateRoute path="/history" element={<History />} />
          <PrivateRoute path="/play-list/:playListId" element={<Playlist />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
