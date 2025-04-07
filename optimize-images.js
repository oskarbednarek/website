const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

(async () => {
    // Optimize JPG and PNG images
    await imagemin(['images/*.{jpg,png}'], {
        destination: 'images/optimized',
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ]
    });

    // Convert images to WebP format
    await imagemin(['images/*.{jpg,png}'], {
        destination: 'images/webp',
        plugins: [
            imageminWebp({ quality: 75 })
        ]
    });

    console.log('Images optimized successfully');
})();