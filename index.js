// const rowEl = document.getElementById("rowId");
// const colEl = document.getElementById("columnId");
// const addBtn = document.getElementById("addBoxes");
// const contImgsDisplay = document.getElementById("contImgsDisplay");
// const imgDeleteDisplay = document.getElementById("imgDeleteDisplay");

// addBtn.addEventListener("click", () => {
//   contImgsDisplay.innerHTML = "";
//   contImgsDisplay.style.gridTemplateRows = `repeat(${rowEl.value}, 1fr)`;
//   contImgsDisplay.style.gridTemplateColumns = `repeat(${colEl.value}, 1fr)`;
//   createMatrix(rowEl.value, colEl.value);
// });

// function createMatrix(rowvalue, colvalue) {
//   let rows = rowvalue;
//   let cols = colvalue;
//   const nImgDivs = rows * cols;

//   // ondragstart = "drag(event)";

//   for (let i = 1; i <= nImgDivs; i++) {
//     const imgDiv = document.createElement("div");
//     imgDiv.setAttribute("ondragstart", "drag(event)");
//     imgDiv.setAttribute("draggable", "true");
//     imgDiv.setAttribute("id", `imgDiv${i}`);
//     imgDiv.classList.add("img-div-style");

//     // create img preview
//     const imgPreview = document.createElement("div");
//     imgPreview.setAttribute("id", `imgPreview${i}`);
//     imgPreview.style.display = "none";

//     // creating an empty div to choose file
//     const emptyDiv = document.createElement("input");
//     emptyDiv.setAttribute("type", "file");
//     emptyDiv.setAttribute("id", `emptyDiv${i}`);
//     emptyDiv.setAttribute("accept", "image/*");
//     emptyDiv.addEventListener("change", function () {
//       getImgData(i);
//     });
//     imgDiv.appendChild(emptyDiv);
//     imgDiv.appendChild(imgPreview);
//     contImgsDisplay.appendChild(imgDiv);
//   }

//   const rightSection = document.querySelector(".right-section");
//   console.log(rightSection);
// }

// function getImgData(i) {
//   const files = document.getElementById(`emptyDiv${i}`).files[0];
//   if (files) {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(files);
//     fileReader.addEventListener("load", function () {
//       document.getElementById(`emptyDiv${i}`).style.display = "none";
//       document.getElementById(`imgPreview${i}`).style.display = "block";
//       document.getElementById(`imgPreview${i}`).innerHTML =
//         '<img src="' + this.result + '" class="imgStyle" />';
//     });
//     document
//       .getElementById(`imgPreview${i}`)
//       .setAttribute("ondragstart", "drag(event)");
//     document.getElementById(`imgPreview${i}`).setAttribute("draggable", "true");
//   }
// }

// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }

// const deleteBtn = document.createElement("button");
// deleteBtn.style.display = "inline";
// deleteBtn.style.width = "130px";
// deleteBtn.textContent = "Delete";
// deleteBtn.addEventListener("click", function () {
//   document.getElementById(`emptyDiv${i}`).value = "";
//   document.getElementById(`emptyDiv${i}`).style.display = "block";
//   document.getElementById(`imgPreview${i}`).style.display = "none";
//   document.getElementById(`imgPreview${i}`).innerHTML = "";
//   imgDiv.appendChild(deleteBtn);
// });
const rowEl = document.getElementById("rowId");
const colEl = document.getElementById("columnId");
const addBtn = document.getElementById("addBoxes");
const contImgsDisplay = document.getElementById("contImgsDisplay");
const imgDeleteDisplay = document.getElementById("imgDeleteDisplay");

addBtn.addEventListener("click", () => {
  contImgsDisplay.innerHTML = "";
  contImgsDisplay.style.gridTemplateRows = `repeat(${rowEl.value}, 1fr)`;
  contImgsDisplay.style.gridTemplateColumns = `repeat(${colEl.value}, 1fr)`;
  createMatrix(rowEl.value, colEl.value);
});

function createMatrix(rowvalue, colvalue) {
  let rows = rowvalue;
  let cols = colvalue;
  const nImgDivs = rows * cols;

  for (let i = 1; i <= nImgDivs; i++) {
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("id", `imgDiv${i}`);
    imgDiv.classList.add("img-div-style");

    // create img preview
    const imgPreview = document.createElement("div");
    imgPreview.setAttribute("id", `imgPreview${i}`);
    imgPreview.style.display = "none";

    // creating an empty div to choose file
    const emptyDiv = document.createElement("input");
    emptyDiv.setAttribute("type", "file");
    emptyDiv.setAttribute("id", `emptyDiv${i}`);
    emptyDiv.setAttribute("accept", "image/*");
    emptyDiv.addEventListener("change", function () {
      getImgData(i);
    });
    imgDiv.appendChild(emptyDiv);
    imgDiv.appendChild(imgPreview);
    contImgsDisplay.appendChild(imgDiv);
  }
}

function getImgData(i) {
  const files = document.getElementById(`emptyDiv${i}`).files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      document.getElementById(`emptyDiv${i}`).style.display = "none";
      document.getElementById(`imgPreview${i}`).style.display = "block";
      document.getElementById(`imgPreview${i}`).innerHTML =
        '<img src="' + this.result + '" class="imgStyle" />';

      // Make the image draggable
      const imgPreview = document.getElementById(`imgPreview${i}`);
      const imgElement = imgPreview.querySelector("img");
      imgElement.setAttribute("draggable", "true");

      // Add event listener for dragstart
      imgElement.addEventListener("dragstart", function (event) {
        drag(event);
      });
    });
  }
}

function allowDrop(ev) {
  ev.preventDefault(); // Prevent default to allow drop
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id); // Store the dragged element's id
}

function drop(ev) {
  ev.preventDefault(); // Prevent the default behavior of the drop event
  var data = ev.dataTransfer.getData("text"); // Get the dragged element's id
  const draggedElement = document.getElementById(data); // Get the dragged div element

  // Check if the drop target is the delete display (left section)
  if (ev.target.id === "imgDeleteDisplay") {
    // Ensure the dragged element is a valid div that contains an image
    if (draggedElement && draggedElement.querySelector("img")) {
      // Only append if the left section is empty (to prevent multiple images)
      if (!imgDeleteDisplay.contains(draggedElement)) {
        // Clear previous content in delete section (ensure only one image is there)
        imgDeleteDisplay.innerHTML = "";

        // Append the dragged image to the delete display
        imgDeleteDisplay.appendChild(draggedElement);

        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.style.display = "inline";
        deleteBtn.style.width = "130px";
        deleteBtn.textContent = "Delete";

        // Add event listener to the delete button
        deleteBtn.addEventListener("click", function () {
          const imgId = draggedElement.id.replace("imgDiv", ""); // Extract the index
          document.getElementById(`emptyDiv${imgId}`).value = "";
          document.getElementById(`emptyDiv${imgId}`).style.display = "block";
          document.getElementById(`imgPreview${imgId}`).style.display = "none";
          document.getElementById(`imgPreview${imgId}`).innerHTML = "";
          imgDeleteDisplay.innerHTML = ""; // Clear the delete section
        });

        // Append the delete button to the imgDeleteDisplay
        imgDeleteDisplay.appendChild(deleteBtn);
      }
    }
  }
}

// Attach the allowDrop and drop event listeners to the left section
imgDeleteDisplay.addEventListener("dragover", allowDrop);
imgDeleteDisplay.addEventListener("drop", drop);
