const inputFile = await Deno.open("data.txt", { read: true });
const outputFile = await Deno.open("written_data.txt", { write: true });

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
    controller.enqueue(letterTransform(chunk));
  },
});

await readableStream
  .pipeThrough(decoderStream)
  .pipeThrough(caseTransform)
  .pipeThrough(encoderStream)
  .pipeTo(outputFile.writable);
