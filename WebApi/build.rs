fn main() {
    tonic_build::compile_protos("../proto/book.proto").expect("Failed to compile protos");
}
