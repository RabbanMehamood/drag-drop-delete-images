const rowEl = document.getElementById("rowId");
const colEl = document.getElementById("columnId");
const addBtn = document.getElementById("addBoxes");
const contImgsDisplay = document.getElementById("contImgsDisplay");
const imgDeleteDisplay = document.getElementById("imgDeleteDisplay");

let previousImage = null; // Store reference of existing left-side image

contImgsDisplay.style.display = "grid";
contImgsDisplay.style.gap = "5px";

addBtn.addEventListener("click", () => {
  const rows = parseInt(rowEl.value, 10) || 1;
  const cols = parseInt(colEl.value, 10) || 1;

  contImgsDisplay.innerHTML = "";
  contImgsDisplay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  contImgsDisplay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  createMatrix(rows, cols);
});

function createMatrix(rows, cols) {
  const nImgDivs = rows * cols;

  for (let i = 1; i <= nImgDivs; i++) {
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("id", `imgDiv${i}`);
    imgDiv.classList.add("img-div-style");
    imgDiv.setAttribute("ondrop", "drop(event)");
    imgDiv.setAttribute("ondragover", "allowDrop(event)");

    const imgPreview = document.createElement("div");
    imgPreview.setAttribute("id", `imgPreview${i}`);
    imgPreview.style.display = "none";

    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("id", `emptyDiv${i}`);
    fileInput.setAttribute("accept", "image/*");
    fileInput.addEventListener("change", function () {
      getImgData(i);
    });

    imgDiv.appendChild(fileInput);
    imgDiv.appendChild(imgPreview);
    contImgsDisplay.appendChild(imgDiv);
  }
}

function getImgData(i) {
  const fileInput = document.getElementById(`emptyDiv${i}`);
  const file = fileInput.files[0];

  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = function () {
      const imgPreview = document.getElementById(`imgPreview${i}`);
      fileInput.style.display = "none";
      imgPreview.style.display = "block";

      imgPreview.innerHTML = `<img src="${this.result}" class="imgStyle" id="dragImg${i}" draggable="true" />`;
      const imgElement = imgPreview.querySelector("img");

      imgElement.addEventListener("dragstart", function (event) {
        drag(event);
      });

      fileInput.value = "";
    };
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const draggedId = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(draggedId);

  if (!draggedElement) return;

  // If dropping in delete section (left)
  if (
    ev.target.id === "imgDeleteDisplay" ||
    ev.target.closest("#imgDeleteDisplay")
  ) {
    if (draggedElement.tagName === "IMG") {
      // If there's already an image in delete section, move it back to right side
      if (previousImage) {
        const prevImgId = previousImage.id.replace("dragImg", "");
        document
          .getElementById(`imgDiv${prevImgId}`)
          .appendChild(previousImage);
      }

      imgDeleteDisplay.innerHTML = ""; // Clear previous content
      previousImage = draggedElement; // Store the new image in delete section

      // Wrap the image inside a div
      const wrapperDiv = document.createElement("div");
      wrapperDiv.appendChild(draggedElement);

      // Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.width = "130px";

      deleteBtn.addEventListener("click", function () {
        const imgId = draggedElement.id.replace("dragImg", "");
        const fileInput = document.getElementById(`emptyDiv${imgId}`);
        const imgPreview = document.getElementById(`imgPreview${imgId}`);

        fileInput.style.display = "block";
        imgPreview.style.display = "none";
        imgPreview.innerHTML = "";
        imgDeleteDisplay.innerHTML = "";
        previousImage = null;
      });

      // Create cancel button
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.marginLeft = "10px";

      cancelBtn.addEventListener("click", function () {
        const imgId = draggedElement.id.replace("dragImg", "");
        document.getElementById(`imgDiv${imgId}`).appendChild(draggedElement);
        imgDeleteDisplay.innerHTML = "";
        previousImage = null;
      });

      // Create resize slider
      const sizeSlider = document.createElement("input");
      sizeSlider.setAttribute("type", "range");
      sizeSlider.setAttribute("min", "50");
      sizeSlider.setAttribute("max", "200");
      sizeSlider.setAttribute("value", "150");
      sizeSlider.style.display = "block";
      sizeSlider.addEventListener("input", function () {
        draggedElement.style.width = sizeSlider.value + "px";
        draggedElement.style.height = sizeSlider.value + "px";
      });

      imgDeleteDisplay.appendChild(wrapperDiv);
      imgDeleteDisplay.appendChild(sizeSlider);
      imgDeleteDisplay.appendChild(deleteBtn);
      imgDeleteDisplay.appendChild(cancelBtn);
    }
  }
  // If dropping back into grid (right)
  else if (ev.target.classList.contains("img-div-style")) {
    ev.target.appendChild(draggedElement);
    previousImage = null; // Reset previous image since it's moved back
  }
}

// Attach event listeners
imgDeleteDisplay.addEventListener("dragover", allowDrop);
imgDeleteDisplay.addEventListener("drop", drop);
contImgsDisplay.addEventListener("dragover", allowDrop);
contImgsDisplay.addEventListener("drop", drop);
