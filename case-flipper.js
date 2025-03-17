const inputFile = await Deno.open("input.txt", { read: true });
const outputFile = await Deno.open("output.txt", { write: true });

const readableStream = inputFile.readable;

const decoderStream = new TextDecoderStream();
const encoderStream = new TextEncoderStream();

const letterTransform = (word) => {
  let transformedWord = "";

  for (const char of word) {
    if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
      transformedWord += String.fromCharCode(char.charCodeAt() + 32);
    } else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
      transformedWord += String.fromCharCode(char.charCodeAt() - 32);
    } else {
      transformedWord += char;
    }
  }

  return transformedWord;
};

const caseTransform = new TransformStream({
  transform(chunk, controller) {
    const chunkData = chunk.split("\n").map(letterTransform).join("\n");

    controller.enqueue(chunkData);
  },
});

await readableStream
  .pipeThrough(decoderStream)
  .pipeThrough(caseTransform)
  .pipeThrough(encoderStream)
  .pipeTo(outputFile.writable);
