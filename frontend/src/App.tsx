import "./styles/index.scss";
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/constants.ts";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import MainLayout from "./components/organisms/MainLayout";
import AboutPage from "./pages/AboutPage";
import {ToastProvider} from "./components/organisms/Toast/context.tsx";
import CreateRecipePage from "./pages/CreateReceiptePage";

function App() {
  return (
      <ToastProvider>
          <MainLayout >
              <Routes>
                  <Route path={APP_ROUTES.index} element={<MainPage/>}/>

                  <Route path={APP_ROUTES.receipts.create} element={<CreateRecipePage/>}/>
                  <Route path={APP_ROUTES.about.index} element={<AboutPage/>}/>
                  {/* MUST be last */}
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </MainLayout>
      </ToastProvider>
  )
}

export default App
