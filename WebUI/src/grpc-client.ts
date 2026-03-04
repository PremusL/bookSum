import { BookServiceClient } from './generated/BookServiceClientPb';
import { UploadFileRequest, GetBooksRequest } from './generated/book_pb';

const RUST_GRPC_URL = 'http://localhost:8008'; // Default URL, can be configured via env vars

class GrpcClient {
  private client: BookServiceClient;

  constructor() {
    this.client = new BookServiceClient(RUST_GRPC_URL);
  }

  async getBooks(): Promise<{ books: string[] }> {
    return new Promise((resolve, reject) => {
      const req = new GetBooksRequest();
      this.client.getBooks(req, {}, (err, response) => {
        if (err) {
          console.error('gRPC Error:', err);
          reject(err);
        } else {
          resolve({
            books: response.getBooksList()
          });
        }
      });
    });
  }

  async uploadFile(file: File): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const fileContent = e.target?.result;
        if (fileContent instanceof ArrayBuffer) {
          const req = new UploadFileRequest();
          req.setFileName(file.name);
          req.setFileContent(new Uint8Array(fileContent));

          this.client.uploadFile(req, {}, (err, response) => {
            if (err) {
              console.error('gRPC Error:', err);
              reject(err);
            } else {
              resolve({
                success: response.getSuccess(),
                message: response.getMessage()
              });
            }
          });
        } else {
          reject(new Error('Failed to read file content'));
        }
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsArrayBuffer(file);
    });
  }
}

export const grpcClient = new GrpcClient();
