use futures::stream::StreamExt;
use mongodb::bson::doc;
use serde::{Deserialize, Serialize};
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

#[derive(Debug, Clone)]
pub struct BookServiceImpl {
    pub db: mongodb::Database,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Book {
    #[serde(default)] // Defaults to None if missing during deserialization
    pub id: Option<u32>,
    pub file_name: String,
    pub file_content: Vec<u8>,
}

#[tonic::async_trait]
impl BookService for BookServiceImpl {
    async fn upload_file(
        &self,
        request: Request<UploadFileRequest>,
    ) -> Result<Response<UploadFileResponse>, Status> {
        let req = request.into_inner();
        let file_name = req.file_name.clone();
        println!(
            "Uploading file: {} ({} bytes)",
            req.file_name,
            req.file_content.len()
        );

        let db = &self.db;

        db.collection("books")
            .insert_one(Book {
                id: None,
                file_name: req.file_name,
                file_content: req.file_content,
            })
            .await
            .expect("Failed to insert book");

        let response = UploadFileResponse {
            message: format!("File {} uploaded successfully", file_name),
            success: true,
        };

        Ok(Response::new(response))
    }

    async fn get_books(
        &self,
        _request: Request<GetBooksRequest>,
    ) -> Result<Response<GetBooksResponse>, Status> {
        let mut cursor = self
            .db
            .collection::<Book>("books")
            .find(doc! {})
            .await
            .map_err(|e| Status::internal(e.to_string()))?;

        let mut books = Vec::new();

        while let Some(book) = cursor.next().await {
            match book {
                Ok(b) => books.push(book::Book {
                    id: b.id.unwrap_or(0) as i32,
                    name: b.file_name,
                }),
                Err(e) => return Err(Status::internal(e.to_string())),
            }
        }

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
    let addr = "127.0.0.1:8008".parse()?;

    let mongo_client = mongodb::Client::with_uri_str("mongodb://localhost:27017").await?;
    let db = mongo_client.database("books");

    let book_service = BookServiceImpl { db };

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
