import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-n-drop-box',
  imports: [],
  templateUrl: './drag-n-drop-box.html',
  styleUrl: './drag-n-drop-box.css'
})
export class DragNDropBox {

  /* "use strict";
  function dragNdrop(event) {
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("preview");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
  } 
  function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
  }
  function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
  } */
}
