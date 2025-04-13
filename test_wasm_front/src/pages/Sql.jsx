import { createSignal, onMount } from "solid-js";
import initWasm, {
  run_query as runQuery,
  init_db as initDb,
} from "../../test_wasm_rust/pkg/test_wasm_rust";

const exampleQueries = [
  `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,age INTEGER);`,
  `SELECT name FROM sqlite_master WHERE type='table';`,
  `INSERT INTO users (name, age) VALUES ('Alice', 30);`,
  `INSERT INTO users (name, age) VALUES ('Bob', 25), ('Charlie', 35);`,
  `SELECT * FROM users;`,
  `SELECT * FROM users WHERE id = 1;`,
  `SELECT * FROM users WHERE age > 30;`,
  `UPDATE users SET age = 31 WHERE id = 1;`,
  `UPDATE users SET age = 40 WHERE name = 'Bob';`,
  `DELETE FROM users WHERE id = 2;`,
  `DELETE FROM users;`,
  `DROP TABLE IF EXISTS users;`,
  `SELECT name FROM sqlite_master WHERE type='table';`,
];

const testQuery = () => {
  exampleQueries.forEach((query) => {
    console.log(`Executing query: ${query}\nresult: ${runQuery(query)}`);
  });
};

export default function Sql() {
  const [query, setQuery] = createSignal("");
  const [result, setResult] = createSignal("");

  onMount(async () => {
    await initWasm();
    initDb();
    testQuery();
  });

  const handleRunQuery = () => {
    try {
      const output = runQuery(query());
      setResult(output);
    } catch (e) {
      setResult(`Error: ${e}`);
    }
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        "font-family": "sans-serif",
        "max-width": "800px",
        margin: "0 auto",
      }}
    >
      <h2>🧪 SQL 실행기</h2>
      <textarea
        rows={15}
        cols={100}
        value={query()}
        onInput={(e) => setQuery(e.currentTarget.value)}
        placeholder={`예시: ${JSON.stringify(exampleQueries, null, 2)
          .replace("[", "")
          .replace("]", "")}`}
      />
      <br />
      <button onClick={handleRunQuery} style={{ "margin-top": "0.5rem" }}>
        실행
      </button>

      <h3>결과</h3>
      <pre>{result()}</pre>
    </div>
  );
}
