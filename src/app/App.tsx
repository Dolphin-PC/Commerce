import { RootProvider } from "./providers/RootProvider";
import { Router } from "./routers";

function App() {
  return (
    <RootProvider>
      <Router />
    </RootProvider>
  );
}

export default App;
