import * as jspb from 'google-protobuf'



export class UploadFileRequest extends jspb.Message {
  getFileName(): string;
  setFileName(value: string): UploadFileRequest;

  getFileContent(): Uint8Array | string;
  getFileContent_asU8(): Uint8Array;
  getFileContent_asB64(): string;
  setFileContent(value: Uint8Array | string): UploadFileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileRequest): UploadFileRequest.AsObject;
  static serializeBinaryToWriter(message: UploadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileRequest;
  static deserializeBinaryFromReader(message: UploadFileRequest, reader: jspb.BinaryReader): UploadFileRequest;
}

export namespace UploadFileRequest {
  export type AsObject = {
    fileName: string,
    fileContent: Uint8Array | string,
  }
}

export class UploadFileResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): UploadFileResponse;

  getSuccess(): boolean;
  setSuccess(value: boolean): UploadFileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileResponse): UploadFileResponse.AsObject;
  static serializeBinaryToWriter(message: UploadFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileResponse;
  static deserializeBinaryFromReader(message: UploadFileResponse, reader: jspb.BinaryReader): UploadFileResponse;
}

export namespace UploadFileResponse {
  export type AsObject = {
    message: string,
    success: boolean,
  }
}

export class GetBooksRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBooksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBooksRequest): GetBooksRequest.AsObject;
  static serializeBinaryToWriter(message: GetBooksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBooksRequest;
  static deserializeBinaryFromReader(message: GetBooksRequest, reader: jspb.BinaryReader): GetBooksRequest;
}

export namespace GetBooksRequest {
  export type AsObject = {
  }
}

export class Book extends jspb.Message {
  getId(): number;
  setId(value: number): Book;

  getName(): string;
  setName(value: string): Book;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Book.AsObject;
  static toObject(includeInstance: boolean, msg: Book): Book.AsObject;
  static serializeBinaryToWriter(message: Book, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Book;
  static deserializeBinaryFromReader(message: Book, reader: jspb.BinaryReader): Book;
}

export namespace Book {
  export type AsObject = {
    id: number,
    name: string,
  }
}

export class GetBooksResponse extends jspb.Message {
  getBooksList(): Array<Book>;
  setBooksList(value: Array<Book>): GetBooksResponse;
  clearBooksList(): GetBooksResponse;
  addBooks(value?: Book, index?: number): Book;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBooksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBooksResponse): GetBooksResponse.AsObject;
  static serializeBinaryToWriter(message: GetBooksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBooksResponse;
  static deserializeBinaryFromReader(message: GetBooksResponse, reader: jspb.BinaryReader): GetBooksResponse;
}

export namespace GetBooksResponse {
  export type AsObject = {
    booksList: Array<Book.AsObject>,
  }
}

export class DeleteBookRequest extends jspb.Message {
  getBookId(): number;
  setBookId(value: number): DeleteBookRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteBookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteBookRequest): DeleteBookRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteBookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteBookRequest;
  static deserializeBinaryFromReader(message: DeleteBookRequest, reader: jspb.BinaryReader): DeleteBookRequest;
}

export namespace DeleteBookRequest {
  export type AsObject = {
    bookId: number,
  }
}

export class DeleteBookResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): DeleteBookResponse;

  getMessage(): string;
  setMessage(value: string): DeleteBookResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteBookResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteBookResponse): DeleteBookResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteBookResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteBookResponse;
  static deserializeBinaryFromReader(message: DeleteBookResponse, reader: jspb.BinaryReader): DeleteBookResponse;
}

export namespace DeleteBookResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

