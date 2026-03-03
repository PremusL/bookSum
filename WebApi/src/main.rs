use tonic::{transport::Server, Request, Response, Status};
use tower_http::cors::{Any, CorsLayer};

pub mod book {
    tonic::include_proto!("book");
}

use book::book_service_server::{BookService, BookServiceServer};
use book::{
    DeleteBookRequest, DeleteBookResponse, GetBooksRequest, GetBooksResponse, UploadFileRequest,
    UploadFileResponse,
};

#[derive(Debug, Default)]
pub struct BookServiceImpl;

#[tonic::async_trait]
impl BookService for BookServiceImpl {
    async fn upload_file(
        &self,
        request: Request<UploadFileRequest>,
    ) -> Result<Response<UploadFileResponse>, Status> {
        let req = request.into_inner();
        println!(
            "Uploading file: {} ({} bytes)",
            req.file_name,
            req.file_content.len()
        );

        let response = UploadFileResponse {
            message: format!("File {} uploaded successfully", req.file_name),
            success: true,
        };

        Ok(Response::new(response))
    }

    async fn get_books(
        &self,
        _request: Request<GetBooksRequest>,
    ) -> Result<Response<GetBooksResponse>, Status> {
        let books = vec![
            "Book 1".to_string(),
            "Book 2".to_string(),
            "Book 3".to_string(),
        ];

        let response = GetBooksResponse { books };

        Ok(Response::new(response))
    }

    async fn delete_book(
        &self,
        request: Request<DeleteBookRequest>,
    ) -> Result<Response<DeleteBookResponse>, Status> {
        let req = request.into_inner();
        println!("Deleting book: {}", req.book_id);

        let response = DeleteBookResponse {
            success: true,
            message: format!("Book {} deleted successfully", req.book_id),
        };

        Ok(Response::new(response))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "127.0.0.1:8001".parse()?;
    let book_service = BookServiceImpl::default();

    println!("gRPC server starting at {}", addr);

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_headers(Any)
        .allow_methods(Any);

    let service = tonic_web::enable(BookServiceServer::new(book_service));

    Server::builder()
        .accept_http1(true)
        .layer(cors)
        .add_service(service)
        .serve(addr)
        .await?;

    Ok(())
}
