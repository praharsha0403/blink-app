#!/bin/bash
export BINDGEN_EXTRA_CLANG_ARGS="-I$(brew --prefix ffmpeg)/include -I$(xcode-select -p)/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/include"
export PKG_CONFIG_PATH="$(brew --prefix)/lib/pkgconfig:$(brew --prefix ffmpeg)/lib/pkgconfig"
export LIBCLANG_PATH="$(brew --prefix llvm)/lib"

cd "$(dirname "$0")"
pnpm tauri build "$@"
