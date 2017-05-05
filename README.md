# svg2imageset
batch converts svg files to xcode image sets ready to be dropped in your iOS project.

# Requirements

svg2imageset requires `libsrvg2` to resize SVG files.

Install it with `sudo apt-get install librsvg2-bin` on Linux or with `brew install librsvg` on OSX.

# Install

    $ npm install -g svg2imageset

# Usage

    $ svg2imageset -x 24 -y 24 -o icons/ svg/*.svg

# Options

- **width** `-x` `--width`

  Width of the @1x image (used then to generate the @2x and @3x versions)

- **height** `-y` `--height`

  Height of the @1x image (used then to generate the @2x and @3x versions)

- **output** `-o` `--output`

  Destination folder.

# Output

For each one of the svgs in the input folder, svg2imageset will generate a folder with the 1x, 2x and 3x images as well as the Contents.json file describing the imageset. 

Once finished you can take each folder and just drop it to your Images.xcassets folder on Xcode.

---

This library was inspired on [svg-resizer](https://github.com/vieron/svg-resizer)