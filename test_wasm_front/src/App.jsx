import { Router, Route, A } from "@solidjs/router";
import Home from "./pages/Home";
import Fibonacci from "./pages/Fibonacci";
import Sql from "./pages/Sql";

export default function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/fibonacci" component={Fibonacci} />
        <Route path="/sql" component={Sql} />
      </Router>
    </div>
  );
}
