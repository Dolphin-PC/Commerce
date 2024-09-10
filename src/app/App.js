import { jsx as _jsx } from "react/jsx-runtime";
import { RootProvider } from "./providers/RootProvider";
import { Router } from "./routers";
function App() {
    return (_jsx(RootProvider, { children: _jsx(Router, {}) }));
}
export default App;
