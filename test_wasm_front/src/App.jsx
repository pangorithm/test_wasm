import { createSignal } from "solid-js";
import { fibonacci as fibonacciJS } from "./lib/common";
import initWasm, { fibonacci as fibonacciRust } from "../pkg/test_wasm_rust";

export default function App() {
  const [input, setInput] = createSignal(10);
  const [jsResult, setJsResult] = createSignal(null);
  const [rustResult, setRustResult] = createSignal(null);
  const [jsTime, setJsTime] = createSignal(null);
  const [rustTime, setRustTime] = createSignal(null);

  const maxInput = 40;

  const run = async () => {
    await initWasm();

    const n = input();

    const jsStart = performance.now();
    const jsVal = fibonacciJS(n);
    const jsEnd = performance.now();

    const rustStart = performance.now();
    const rustVal = fibonacciRust(n);
    const rustEnd = performance.now();

    setJsResult(jsVal);
    setRustResult(rustVal);
    setJsTime(jsEnd - jsStart);
    setRustTime(rustEnd - rustStart);
  };

  return (
    <div style={{ padding: "2rem", "font-family": "sans-serif" }}>
      <h1>Fibonacci 비교 (JS vs Rust WASM)</h1>
      <label>
        숫자 입력({maxInput} 이하):
        <input
          type="number"
          value={input()}
          onInput={(e) => setInput(Math.min(parseInt(e.currentTarget.value), maxInput))}
          min="0"
          max={maxInput}
        />
      </label>
      <button onClick={run}>실행</button>

      <div style={{ "margin-top": "1rem" }}>
        <h2>결과</h2>
        <table
          border="1"
          cellpadding="8"
          style={{ "border-collapse": "collapse", "margin-top": "1rem" }}
        >
          <colgroup>
            <col style={{ width: "150px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "150px" }} />
          </colgroup>
          <thead>
            <tr>
              <th>구현 방식</th>
              <th>결과</th>
              <th>소요 시간 (ms)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JavaScript</td>
              <td>{jsResult()}</td>
              <td>{jsTime()?.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Rust (WASM)</td>
              <td>{rustResult()}</td>
              <td>{rustTime()?.toFixed(3)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
