import "./styles/index.scss";
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/contstans.ts";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Routes>
          <Route path={APP_ROUTES.index} element={<div>Home</div>}/>

          {/* MUST be last */}
          <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
