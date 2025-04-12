use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci_rust(n: u32) -> u32 {
    if n < 2 {
        n
    } else {
        fibonacci_rust(n - 1) + fibonacci_rust(n - 2)
    }
}

use serde_json;
use sqlite_wasm_rs as ffi;
use std::ffi::{CStr, CString};
use std::ptr;

type SqliteResult<T> = Result<T, String>;
/// 온메모리 데이터베이스 열기 함수
fn open_db() -> SqliteResult<*mut ffi::sqlite3> {
    let mut db: *mut ffi::sqlite3 = ptr::null_mut();
    let filename = CString::new(":memory:").unwrap();
    let ret = unsafe { ffi::sqlite3_open(filename.as_ptr(), &mut db) };
    if ret != ffi::SQLITE_OK {
        Err("Failed to open DB".to_string())
    } else {
        Ok(db)
    }
}

/// SELECT 쿼리를 실행하여 결과를 Vec<Vec<String>> 형태로 반환하는 함수
fn execute_query(db: *mut ffi::sqlite3, query: &str) -> SqliteResult<Vec<Vec<String>>> {
    let c_query = CString::new(query).unwrap();
    let mut stmt: *mut ffi::sqlite3_stmt = ptr::null_mut();
    let prepare_rc =
        unsafe { ffi::sqlite3_prepare_v2(db, c_query.as_ptr(), -1, &mut stmt, ptr::null_mut()) };

    if prepare_rc != ffi::SQLITE_OK {
        return Err(format!("Failed to prepare query, code: {}", prepare_rc));
    }

    let mut rows: Vec<Vec<String>> = Vec::new();
    loop {
        let step_rc = unsafe { ffi::sqlite3_step(stmt) };
        if step_rc == ffi::SQLITE_ROW {
            let col_count = unsafe { ffi::sqlite3_column_count(stmt) };
            let mut row: Vec<String> = Vec::with_capacity(col_count as usize);
            for i in 0..col_count {
                let text_ptr = unsafe { ffi::sqlite3_column_text(stmt, i) } as *const i8;
                let col_val = if text_ptr.is_null() {
                    "NULL".to_string()
                } else {
                    let c_str = unsafe { CStr::from_ptr(text_ptr) };
                    c_str.to_string_lossy().into_owned()
                };
                row.push(col_val);
            }
            rows.push(row);
        } else if step_rc == ffi::SQLITE_DONE {
            break;
        } else {
            unsafe {
                ffi::sqlite3_finalize(stmt);
            }
            return Err(format!("Query execution failed, code: {}", step_rc));
        }
    }
    unsafe {
        ffi::sqlite3_finalize(stmt);
    }
    Ok(rows)
}

/// 결과 행들을 JSON 문자열로 직렬화하는 함수
fn convert_rows_to_json(rows: Vec<Vec<String>>) -> SqliteResult<String> {
    serde_json::to_string(&rows).map_err(|e| e.to_string())
}

static mut DB: *mut ffi::sqlite3 = std::ptr::null_mut();

#[wasm_bindgen]
pub fn init_db() -> String {
    unsafe {
        if !DB.is_null() {
            return "DB already initialized".into();
        }

        match open_db() {
            Ok(db) => {
                DB = db;
                "DB initialized".into()
            }
            Err(e) => format!("Failed to init DB: {}", e),
        }
    }
}

/// WASM 모듈에서 호출 가능한 함수: 쿼리 실행 후 결과를 JSON 문자열로 리턴
#[wasm_bindgen]
pub fn run_query(query: String) -> String {
    unsafe {
        if DB.is_null() {
            return "DB not initialized".into();
        }

        let rows = execute_query(DB, &query);
        match rows {
            Ok(rows) => match convert_rows_to_json(rows) {
                Ok(json) => json,
                Err(e) => format!("Serialization error: {}", e),
            },
            Err(e) => format!("Query execution failed: {}", e),
        }
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
