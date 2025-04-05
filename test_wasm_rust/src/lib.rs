use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci_rust(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci_rust(n - 1) + fibonacci_rust(n - 2),
    }
}

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
