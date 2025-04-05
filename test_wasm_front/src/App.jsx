import { createSignal } from "solid-js";
import { fibonacci as fibonacciJS } from "./lib/common";
import initWasm, { fibonacci as fibonacciRust } from "../pkg/test_wasm_rust";

export default function App() {
  const [input, setInput] = createSignal(10);
  const [jsResult1, setJsResult1] = createSignal(null);
  const [rustResult1, setRustResult1] = createSignal(null);
  const [jsTime1, setJsTime1] = createSignal(null);
  const [rustTime1, setRustTime1] = createSignal(null);
  const [jsResult2, setJsResult2] = createSignal(null);
  const [rustResult2, setRustResult2] = createSignal(null);
  const [jsTime2, setJsTime2] = createSignal(null);
  const [rustTime2, setRustTime2] = createSignal(null);

  const maxInput = 40;

  const run = async () => {
    await initWasm();
    const n = input();

    // Warmup 전
    let jsStart = performance.now();
    let jsVal = fibonacciJS(n);
    let jsEnd = performance.now();

    let rustStart = performance.now();
    let rustVal = fibonacciRust(n);
    let rustEnd = performance.now();

    setJsResult1(jsVal);
    setRustResult1(rustVal);
    setJsTime1(jsEnd - jsStart);
    setRustTime1(rustEnd - rustStart);

    // Warmup 후
    jsStart = performance.now();
    jsVal = fibonacciJS(n);
    jsEnd = performance.now();

    rustStart = performance.now();
    rustVal = fibonacciRust(n);
    rustEnd = performance.now();

    setJsResult2(jsVal);
    setRustResult2(rustVal);
    setJsTime2(jsEnd - jsStart);
    setRustTime2(rustEnd - rustStart);
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
              <td>JavaScript 워밍업 전</td>
              <td>{jsResult1()}</td>
              <td>{jsTime1()?.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Rust (WASM) 워밍업 전</td>
              <td>{rustResult1()}</td>
              <td>{rustTime1()?.toFixed(3)}</td>
            </tr>
            <tr>
              <td>JavaScript 워밍업 후</td>
              <td>{jsResult2()}</td>
              <td>{jsTime2()?.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Rust (WASM) 워밍업 후</td>
              <td>{rustResult2()}</td>
              <td>{rustTime2()?.toFixed(3)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
