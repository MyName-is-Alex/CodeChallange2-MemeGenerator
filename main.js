//select all the input fields
const inputImg = document.querySelector('#inputImg');
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput = document.querySelector('#bottomTextInput');
const fontSizeInput = document.querySelector('#fontSize');
const fontColorInput = document.querySelector('#fontColor');
const fontFamilyInput = document.querySelector('#fontFamily');
const eventListeners = document.querySelectorAll('.eventListener');
const memeNameInput = document.querySelector('#memeName');
//select download button
const downloadButton = document.querySelector('#downloadButton');
//select output field
const canvas = document.querySelector('#meme');

let image;
//if user didn t insert an image alert him to insert an image before typing
let imageState = false;

inputImg.addEventListener('change', () => {
  //obtain the image link
  const imageUrl = URL.createObjectURL(inputImg.files[0]);

  //create an <img> object and pass it the image link
  image = new Image();
  image.src = imageUrl;

  image.addEventListener('load', () => {
    createMeme(
      canvas,
      image,
      topTextInput.value,
      bottomTextInput.value,
      fontSizeInput.value,
      fontColorInput.value,
      fontFamilyInput.value,
      memeNameInput.value
    );
    imageState = true;
  });
});

//add event listeners
for (let i = 0; i < eventListeners.length; i++) {
  eventListeners[i].addEventListener('change', () => {
    if (imageState) {
      createMeme(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value,
        fontSizeInput.value,
        fontColorInput.value,
        fontFamilyInput.value,
        memeNameInput.value
      );
    } else {
      alert('You need to insert an image');
    }
  });
}

//add a function with parameters for all the meme options
const createMeme = function (
  canvas,
  image,
  topText,
  bottomText,
  fontSize,
  fontColor,
  fontFamily,
  memeName
) {
  //prepare canvas for image implementationlive
  const context = canvas.getContext('2d');
  const width = image.width;
  const height = image.height;
  const yOffset = height / 25;

  //display image
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0);

  context.strokeStyle = 'black';
  context.lineWidth = fontSize;
  context.fillStyle = fontColor;
  context.textAlign = 'center';
  context.lineJoin = 'round';
  context.font = `${fontSize}rem ${fontFamily}`;

  // Add top text
  context.textBaseline = 'top';
  context.strokeText(topText, width / 2, yOffset);
  context.fillText(topText, width / 2, yOffset);

  // Add bottom text
  context.textBaseline = 'bottom';
  context.strokeText(bottomText, width / 2, height - yOffset);
  context.fillText(bottomText, width / 2, height - yOffset);

  //change download button HREF
  downloadButton.href = canvas.toDataURL();

  //set downloaded file name
  downloadButton.download = `${memeName}`;
};
