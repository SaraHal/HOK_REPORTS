import archiver from 'archiver'
import streamBuffers from 'stream-buffers';

export const getZip = files => {
    const outputStreamBuffer = new streamBuffers.WritableStreamBuffer({
        initialSize: (1000 * 1024),   // start at 1000 kilobytes.
        incrementAmount: (1000 * 1024) // grow by 1000 kilobytes each time buffer overflows.
    });
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.pipe(outputStreamBuffer);
    files.forEach(file => {
        archive.append(file.buffer, { name: file.fileName });
    })

    archive.finalize();


    return new Promise((resolve, reject) => {
        outputStreamBuffer.on('finish', function () {
            resolve(outputStreamBuffer.getContents());
        });
    });


}