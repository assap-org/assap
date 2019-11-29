//Code based on:
//https://github.com/justadudewhohacks/face-api.js/issues/231#issuecomment-476888897


export function serialize(data) {
  const json = JSON.stringify(data.map(res => res.descriptor ));
  return json;
}

export function deserialize(data) {
  let obj = new Array(Object.values(JSON.parse(data.toString())))
  let arrayDescriptor = new Array(obj[0].length)
  let i = 0
  obj[0].forEach((entry) => {
    arrayDescriptor[i++] = new Float32Array(Object.values(entry))
  });
  return arrayDescriptor;
}
