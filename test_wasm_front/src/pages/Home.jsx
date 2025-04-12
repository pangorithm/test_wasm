import { A } from "@solidjs/router";

export default function Home() {
  return (
    <div>
      <h1>Test WASM</h1>
      <ul>
        <li>
          <A href="/fibonacci">피보나치 함수 성능 비교</A>
        </li>
        <li>
          <A href="/sql">sql on browser</A>
        </li>
      </ul>
    </div>
  );
}
