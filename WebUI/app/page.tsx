'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { grpcClient } from "../src/grpc-client";

interface Book {
  id: string;
  name: string;
  file: File;
}

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log('File selected:', files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAddBooks = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const response = await grpcClient.uploadFile(selectedFile);
        
        if (response.success) {
          const newBook: Book = {
            id: Math.random().toString(36).substr(2, 9),
            name: selectedFile.name,
            file: selectedFile,
          };
          setBooks([...books, newBook]);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          console.log(response.message);
        } else {
          console.error("Upload failed", response.message);
        }
      } catch (err) {
        console.error("Error uploading file", err);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Book Library</h1>

        {books.length === 0 && !selectedFile ? (
          <button
            onClick={handleAddBooks}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Add New Books
          </button>
        ) : (
          <div className="w-full">
            {books.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Books</h2>
                <ul className="space-y-2">
                  {books.map((book) => (
                    <li key={book.id} className="text-gray-700 dark:text-gray-300">
                      📄 {book.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedFile && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Selected file:</p>
                <p className="text-gray-900 dark:text-white font-semibold mb-4">{selectedFile.name}</p>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                >
                  Upload
                </button>
              </div>
            )}

            <button
              onClick={handleAddBooks}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              Add More Books
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInput}
          className="hidden"
          accept=".pdf,.epub,.txt"
        />
      </main>

      {isDragging && (
        <div className="fixed inset-0 bg-blue-500/20 border-4 border-dashed border-blue-500 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white dark:bg-zinc-900 px-8 py-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Drop your files here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
