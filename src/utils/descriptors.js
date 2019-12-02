//Code based on:
//https://github.com/justadudewhohacks/face-api.js/issues/231#issuecomment-476888897


export function serialize(data, label) {
  const json = JSON.stringify({descriptors: data.map(res => res.descriptor ), label});
  return json;
}

export function deserialize(data) {
  const {label, descriptors} = JSON.parse(data)
  let obj = new Array(Object.values(descriptors))
  let arrayDescriptor = new Array(obj[0].length)
  let i = 0
  obj[0].forEach((entry) => {
    arrayDescriptor[i++] = new Float32Array(Object.values(entry))
  });
  return {descriptors: arrayDescriptor, label};
}
