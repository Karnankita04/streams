const file = await Deno.open("written_data.txt", { write: true, create: true });
const writableStream = file.writable;
const writer = writableStream.getWriter();
const encoder = new TextEncoder();

const content = encoder.encode("Ankita karn");
await writer.write(content);