import "./styles/index.scss";
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/contstans.ts";

function App() {
  return (
      <Routes>
          <Route path={APP_ROUTES.index} element={<div>Home</div>}/>
      </Routes>
  )
}

export default App
