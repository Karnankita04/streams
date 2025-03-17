const file = await Deno.open("data.txt", { read: true, write: true });
const outputFile = await Deno.open("written_data.txt", { write: true });
const readableStream = file.readable;

readableStream.pipeTo(outputFile.writable);