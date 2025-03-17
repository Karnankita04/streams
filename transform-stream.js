const inputFile = await Deno.open("data.txt", { read: true });
const outputFile = await Deno.open("written_data.txt", { write: true });
const readableStream = inputFile.readable;

const encoderStream = new TextEncoderStream();
const decoderStream = new TextDecoderStream();

const toUpperCaseTransform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

await readableStream
  .pipeThrough(decoderStream)
  .pipeThrough(toUpperCaseTransform)
  .pipeThrough(encoderStream)
  .pipeTo(outputFile.writable);
