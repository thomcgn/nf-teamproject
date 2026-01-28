import "./styles/index.scss";
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/constants.ts";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";

function App() {
  return (
      <Routes>
          <Route path={APP_ROUTES.index} element={<MainPage/>}/>

          {/* MUST be last */}
          <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
