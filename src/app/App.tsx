import RootComponent from "./Common/RootComponent";
import { RootProvider } from "./providers/RootProvider";
import { Router } from "./routers";

function App() {
  return (
    <RootProvider>
      <RootComponent />
      <Router />
    </RootProvider>
  );
}

export default App;
