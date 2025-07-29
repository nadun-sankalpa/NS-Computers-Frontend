import {Route, Routes} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import Login from "./view/pages/login/Login.tsx";
import Signup from "./view/pages/login/signup.tsx";

function App() {
  return(
      <Routes>
        <Route path="/*" element={<DefaultLayout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
  )
}

export default App