import { Router, Route } from "@solidjs/router";
import { onMount } from "solid-js";
import Home from "./pages/Home";
import Fibonacci from "./pages/Fibonacci";
import Sql from "./pages/Sql";

export default function App() {
  const base = import.meta.env.BASE_URL;
  onMount(() => {
    console.log("✅ JS 실행됨");
  });

  return (
    <div>
      <Router base={base}>
        <Route path="/" component={Home} />
        <Route path="/fibonacci" component={Fibonacci} />
        <Route path="/sql" component={Sql} />
      </Router>
    </div>
  );
}
