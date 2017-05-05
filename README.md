# svg2imageset
batch converts svg files to xcode image sets ready to be dropped in your iOS project.

# Requirements

svg-resizer requires `libsrvg2` to resize SVG files.

Install it with `sudo apt-get install librsvg2-bin` on Linux or with `brew install librsvg` on OSX.

# Usage

    $ svg2imageset -x 24 -y 24 -o icons/ svg/*.svg

# Options

- **width** `-x` `--width`

  Width of the @1x image (used to create @2x and @3x)

- **height** `-y` `--height`

  Height of the @1x image (used to create @2x and @3x)

- **output** `-o` `--output`

  Destination folder.

This library is based on [svg-resizer](https://github.com/vieron/svg-resizer)