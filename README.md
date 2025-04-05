npm create vite@latest test_wasm_front -- --template solid

cargo install wasm-pack
cargo new --lib test_wasm_rust
cd test_wasm_rust
wasm-pack build --target web
mv pkg ../test_wasm_front
