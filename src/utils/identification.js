import * as faceapi from 'face-api.js';

export function screenshot(canvas, videoEl, img) {
  canvas.width = videoEl.videoWidth;
  canvas.height = videoEl.videoHeight;
  canvas.getContext('2d').drawImage(videoEl, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/webp');
}

export function identify(descriptors, detects, canvas){
  const faceMatcher = new faceapi.FaceMatcher(descriptors)

  detects.forEach(({ detection, descriptor }) => {
    const label = faceMatcher.findBestMatch(descriptor).toString()
    console.log('label', label);
    const options = { label }
    const drawBox = new faceapi.draw.DrawBox(detection.box, options)
    drawBox.draw(canvas)
  })
}
