import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-n-drop-box',
  imports: [CommonModule],
  templateUrl: './drag-n-drop-box.html',
  styleUrl: './drag-n-drop-box.css'
})
export class DragNDropBox {
  @Output() fileSelected = new EventEmitter<Blob>();
  
  isDragging = false;
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    this.selectedFile = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    // Convert to Blob and emit
    this.convertToBlob(file);
  }

  private convertToBlob(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: file.type });
      this.fileSelected.emit(blob);
    };
    reader.readAsArrayBuffer(file);
  }

  clearFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
  }
}