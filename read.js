const file = await Deno.open("data.txt", { read: true, write: true });
const readableStream = file.readable;
const reader = readableStream.getReader();

const decoder = new TextDecoder();
const { value, done } = await reader.read();

console.log(decoder.decode(value),done);

file.close();