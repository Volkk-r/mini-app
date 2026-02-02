import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./router/routes";
import { MyEventsProvider } from "./context/MyEventsContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <MyEventsProvider>
        <HashRouter >
          <AppRoutes />
        </HashRouter>
      </MyEventsProvider>
    </UserProvider>
  );
}

export default App;
