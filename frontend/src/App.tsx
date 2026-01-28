import "./styles/index.scss";
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/constants.ts";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import MainLayout from "./components/organisms/MainLayout";

function App() {
  return (
      <MainLayout >
          <Routes>
              <Route path={APP_ROUTES.index} element={<MainPage/>}/>

              {/* MUST be last */}
              <Route path="*" element={<NotFound />} />
          </Routes>
      </MainLayout>

  )
}

export default App
