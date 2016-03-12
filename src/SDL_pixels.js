var ref = require('ref');
var ffi = require('ffi');
var Struct = require('ref-struct');
var ArrayType = require('ref-array');
var SDL_stdinc = require('./SDL_stdinc.js');

// basic type
var void_type = ref.types.void;
var bool = ref.types.bool;
var int = ref.types.int;
var uint32 = ref.types.uint32;
var uint16 = ref.types.uint16;
var uint8 = ref.types.uint8;
var float = ref.types.float;
var string = ref.types.CString;

// basic pointer
var void_ptr = ref.refType(void_type);
var int_ptr = ref.refType(int);
var uint32_ptr = ref.refType(uint32);
var uint16_ptr = ref.refType(uint16);
var uint8_ptr = ref.refType(uint8);

// global define
var ENUM_PIXELTYPE = {
    SDL_PIXELTYPE_UNKNOWN: 0,
    SDL_PIXELTYPE_INDEX1: 1,
    SDL_PIXELTYPE_INDEX4: 2,
    SDL_PIXELTYPE_INDEX8: 3,
    SDL_PIXELTYPE_PACKED8: 4,
    SDL_PIXELTYPE_PACKED16: 5,
    SDL_PIXELTYPE_PACKED32: 6,
    SDL_PIXELTYPE_ARRAYU8: 7,
    SDL_PIXELTYPE_ARRAYU16: 8,
    SDL_PIXELTYPE_ARRAYU32: 9,
    SDL_PIXELTYPE_ARRAYF16: 10,
    SDL_PIXELTYPE_ARRAYF32: 11
};
var ENUM_BITMAPORDER = {
    SDL_BITMAPORDER_NONE: 0,
    SDL_BITMAPORDER_4321: 1,
    SDL_BITMAPORDER_1234: 2
};
var ENUM_PACKEDORDER = {
    SDL_PACKEDORDER_NONE: 0,
    SDL_PACKEDORDER_XRGB: 1,
    SDL_PACKEDORDER_RGBX: 2,
    SDL_PACKEDORDER_ARGB: 3,
    SDL_PACKEDORDER_RGBA: 4,
    SDL_PACKEDORDER_XBGR: 5,
    SDL_PACKEDORDER_BGRX: 6,
    SDL_PACKEDORDER_ABGR: 7,
    SDL_PACKEDORDER_BGRA: 8
};
var ENUM_ARRAYORDER = {
    SDL_ARRAYORDER_NONE: 0,
    SDL_ARRAYORDER_RGB: 1,
    SDL_ARRAYORDER_RGBA: 2,
    SDL_ARRAYORDER_ARGB: 3,
    SDL_ARRAYORDER_BGR: 4,
    SDL_ARRAYORDER_BGRA: 5,
    SDL_ARRAYORDER_ABGR: 6
}
var ENUM_PACKEDLAYOUT = {
    SDL_PACKEDLAYOUT_NONE: 0,
    SDL_PACKEDLAYOUT_332: 1,
    SDL_PACKEDLAYOUT_4444: 2,
    SDL_PACKEDLAYOUT_1555: 3,
    SDL_PACKEDLAYOUT_5551: 4,
    SDL_PACKEDLAYOUT_565: 5,
    SDL_PACKEDLAYOUT_8888: 6,
    SDL_PACKEDLAYOUT_2101010: 7,
    SDL_PACKEDLAYOUT_1010102: 8
}
var SDL_DEFINE_PIXELFOURCC = function(A, B, C, D) {
	return SDL_stdinc.SDL_FOURCC(A, B, C, D);
};
var SDL_DEFINE_PIXELFORMAT = function(type, order, layout, bits, bytes) {
    return ((1 << 28) | ((type) << 24) | ((order) << 20) | ((layout) << 16) | ((bits) << 8) | ((bytes) << 0))
};
var SDL_PIXELFLAG = function(X) {
	return (((X) >> 28) & 0x0F);
};
var SDL_PIXELTYPE = function(X) {
	return (((X) >> 24) & 0x0F);
};
var SDL_PIXELORDER = function(X) {
	return (((X) >> 20) & 0x0F);
};
var SDL_PIXELLAYOUT = function(X) {
	return (((X) >> 16) & 0x0F);
};
var SDL_BITSPERPIXEL = function(X) {
	return (((X) >> 8) & 0x0F);
};
var SDL_BYTESPERPIXEL = function(X) {
	return (SDL_ISPIXELFORMAT_FOURCC(X) ?
		((((X) == ENUM_PIXELFORMAT.SDL_PIXELFORMAT_YUY2) ||
			((X) == ENUM_PIXELFORMAT.SDL_PIXELFORMAT_UYVY) ||
			((X) == ENUM_PIXELFORMAT.SDL_PIXELFORMAT_YVYU)) ? 2 : 1) : (((X) >> 0) & 0xFF));
};
var SDL_ISPIXELFORMAT_INDEXED = function(format) {
	return (!SDL_ISPIXELFORMAT_FOURCC(format) &&
		((SDL_PIXELTYPE(format) == ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX1) ||
		(SDL_PIXELTYPE(format) == ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX4) ||
		(SDL_PIXELTYPE(format) == ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX8)));
};
var SDL_ISPIXELFORMAT_ALPHA = function(format) {
	return (!SDL_ISPIXELFORMAT_FOURCC(format) &&
		((SDL_PIXELORDER(format) == ENUM_PACKEDORDER.SDL_PACKEDORDER_ARGB) ||
		(SDL_PIXELORDER(format) == ENUM_PACKEDORDER.SDL_PACKEDORDER_RGBA) ||
		(SDL_PIXELORDER(format) == ENUM_PACKEDORDER.SDL_PACKEDORDER_ABGR) ||
		(SDL_PIXELORDER(format) == ENUM_PACKEDORDER.SDL_PACKEDORDER_BGRA)));
};
var SDL_ISPIXELFORMAT_FOURCC = function(format) {
	return ((format) && (SDL_PIXELFLAG(format) != 1));
};
var ENUM_PIXELFORMAT = {
	SDL_PIXELFORMAT_UNKNOWN: 0,
    SDL_PIXELFORMAT_INDEX1LSB : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX1, ENUM_BITMAPORDER.SDL_BITMAPORDER_4321, 0, 1, 0),
    SDL_PIXELFORMAT_INDEX1MSB : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX1, ENUM_BITMAPORDER.SDL_BITMAPORDER_1234, 0, 1, 0),
    SDL_PIXELFORMAT_INDEX4LSB : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX4, ENUM_BITMAPORDER.SDL_BITMAPORDER_4321, 0, 4, 0),
    SDL_PIXELFORMAT_INDEX4MSB : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX4, ENUM_BITMAPORDER.SDL_BITMAPORDER_1234, 0, 4, 0),
    SDL_PIXELFORMAT_INDEX8 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_INDEX8, 0, 0, 8, 1),
    SDL_PIXELFORMAT_RGB332 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED8, ENUM_PACKEDORDER.SDL_PACKEDORDER_XRGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_332, 8, 1),
    SDL_PIXELFORMAT_RGB444 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_XRGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_4444, 12, 2),
    SDL_PIXELFORMAT_RGB555 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_XRGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_1555, 15, 2),
    SDL_PIXELFORMAT_BGR555 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_XBGR, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_1555, 15, 2),
    SDL_PIXELFORMAT_ARGB4444 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_ARGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_4444, 16, 2),
    SDL_PIXELFORMAT_RGBA4444 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_RGBA, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_4444, 16, 2),
    SDL_PIXELFORMAT_ABGR4444 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_ABGR, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_4444, 16, 2),
    SDL_PIXELFORMAT_BGRA4444 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_BGRA, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_4444, 16, 2),
    SDL_PIXELFORMAT_ARGB1555 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_ARGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_1555, 16, 2),
    SDL_PIXELFORMAT_RGBA5551 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_RGBA, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_5551, 16, 2),
    SDL_PIXELFORMAT_ABGR1555 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_ABGR, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_1555, 16, 2),
    SDL_PIXELFORMAT_BGRA5551 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_BGRA, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_5551, 16, 2),
    SDL_PIXELFORMAT_RGB565 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_XRGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_565, 16, 2),
    SDL_PIXELFORMAT_BGR565 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED16, ENUM_PACKEDORDER.SDL_PACKEDORDER_XBGR, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_565, 16, 2),
    SDL_PIXELFORMAT_RGB24 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_ARRAYU8, ENUM_ARRAYORDER.SDL_ARRAYORDER_RGB, 0, 24, 3),
    SDL_PIXELFORMAT_BGR24 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_ARRAYU8, ENUM_ARRAYORDER.SDL_ARRAYORDER_BGR, 0, 24, 3),
    SDL_PIXELFORMAT_RGB888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_XRGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 24, 4),
    SDL_PIXELFORMAT_RGBX8888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_RGBX, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 24, 4),
    SDL_PIXELFORMAT_BGR888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_XBGR, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 24, 4),
    SDL_PIXELFORMAT_BGRX8888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_BGRX, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 24, 4),
    SDL_PIXELFORMAT_ARGB8888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_ARGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 32, 4),
    SDL_PIXELFORMAT_RGBA8888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_RGBA, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 32, 4),
    SDL_PIXELFORMAT_ABGR8888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_ABGR, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 32, 4),
    SDL_PIXELFORMAT_BGRA8888 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_BGRA, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_8888, 32, 4),
    SDL_PIXELFORMAT_ARGB2101010 : SDL_DEFINE_PIXELFORMAT(ENUM_PIXELTYPE.SDL_PIXELTYPE_PACKED32, ENUM_PACKEDORDER.SDL_PACKEDORDER_ARGB, ENUM_PACKEDLAYOUT.SDL_PACKEDLAYOUT_2101010, 32, 4),

    SDL_PIXELFORMAT_YV12 : SDL_DEFINE_PIXELFOURCC('Y', 'V', '1', '2'),
    SDL_PIXELFORMAT_IYUV : SDL_DEFINE_PIXELFOURCC('I', 'Y', 'U', 'V'),
    SDL_PIXELFORMAT_YUY2 : SDL_DEFINE_PIXELFOURCC('Y', 'U', 'Y', '2'),
    SDL_PIXELFORMAT_UYVY : SDL_DEFINE_PIXELFOURCC('U', 'Y', 'V', 'Y'),
    SDL_PIXELFORMAT_YVYU : SDL_DEFINE_PIXELFOURCC('Y', 'V', 'Y', 'U')
}
var SDL_Color = Struct({
	r: uint8,
	g: uint8,
	b: uint8,
	a: uint8
});
var SDL_Color_Ptr = ref.refType(SDL_Color);

var SDL_Palette = Struct({
	ncolors: int,
	colors: SDL_Color_Ptr,
	version: uint32,
	refcount: int
});
var SDL_Palette_Ptr = ref.refType(SDL_Palette);
var SDL_PixelFormat = Struct({
	format: uint32,
	palette: SDL_Palette_Ptr,
	BitsPerPixel: uint8,
	BytesPerPixel: uint8,
	padding: ArrayType(uint8, 2), // uint8[2]
	Rmask: uint32,
	Gmask: uint32,
	Bmask: uint32,
	Amask: uint32,
	Rloss: uint8,
	Gloss: uint8,
	Bloss: uint8,
	Aloss: uint8,
	Rshift: uint8,
	Gshift: uint8,
	Bshift: uint8,
	Ashift: uint8,
	refcount: int
});
var SDL_PixelFormat_Ptr = ref.refType(SDL_PixelFormat);
SDL_PixelFormat.defineProperty('next', SDL_PixelFormat_Ptr);

// global function
var library = __dirname + '/lib/' + process.platform + '/' + process.arch + '/libSDL2-2.0' + ffi.LIB_EXT;
var SDL_pixels = ffi.Library(library, {
	SDL_GetPixelFormatName: [ string, [ uint32 ] ],
	SDL_PixelFormatEnumToMasks: [ bool, [ uint32, int_ptr, uint32_ptr, uint32_ptr, uint32_ptr, uint32_ptr ] ],
	SDL_MasksToPixelFormatEnum: [ int, [ uint32, uint32, uint32, uint32 ] ],
	SDL_AllocFormat: [ SDL_PixelFormat_Ptr, [ uint32 ] ],
	SDL_FreeFormat: [ void_type, [ SDL_PixelFormat_Ptr ] ],
	SDL_AllocPalette: [ SDL_Palette_Ptr, [ int ] ],
	SDL_SetPixelFormatPalette: [ int, [ SDL_PixelFormat_Ptr, SDL_Palette_Ptr ] ],
	SDL_SetPaletteColors: [ int, [ SDL_Palette_Ptr, SDL_Color_Ptr, int, int ] ],
	SDL_FreePalette: [ void_type, [ SDL_PixelFormat_Ptr ] ],
	SDL_MapRGB: [ uint32, [ SDL_PixelFormat_Ptr, uint8, uint8, uint8 ] ],
	SDL_MapRGBA: [ uint32, [ SDL_PixelFormat_Ptr, uint8, uint8, uint8, uint8 ] ],
	SDL_GetRGB: [ void_type, [ SDL_PixelFormat_Ptr, uint8_ptr, uint8_ptr, uint8_ptr ] ],
	SDL_GetRGBA: [ void_type, [ SDL_PixelFormat_Ptr, uint8_ptr, uint8_ptr, uint8_ptr, uint8_ptr ] ],
	SDL_CalculateGammaRamp: [ void_type, [ float, uint16_ptr ] ]
});

// export global
SDL_pixels.SDL_Color = SDL_Color;
SDL_pixels.SDL_Palette = SDL_Palette;
SDL_pixels.SDL_PixelFormat = SDL_PixelFormat;

var ENUM = [
	ENUM_PIXELTYPE,
	ENUM_BITMAPORDER,
	ENUM_PACKEDORDER,
	ENUM_ARRAYORDER,
	ENUM_PACKEDLAYOUT,
	ENUM_PIXELFORMAT
];
for(var key1 in ENUM) {
	for(var key2 in ENUM[key1]) {
		SDL_pixels[key2] = ENUM[key1][key2];
	}
}
SDL_pixels.SDL_DEFINE_PIXELFOURCC = SDL_DEFINE_PIXELFOURCC;
SDL_pixels.SDL_DEFINE_PIXELFORMAT = SDL_DEFINE_PIXELFORMAT;
SDL_pixels.SDL_PIXELFLAG = SDL_PIXELFLAG;
SDL_pixels.SDL_PIXELTYPE = SDL_PIXELTYPE;
SDL_pixels.SDL_PIXELORDER = SDL_PIXELORDER;
SDL_pixels.SDL_PIXELLAYOUT = SDL_PIXELLAYOUT;
SDL_pixels.SDL_BITSPERPIXEL = SDL_BITSPERPIXEL;
SDL_pixels.SDL_BYTESPERPIXEL = SDL_BYTESPERPIXEL;
SDL_pixels.SDL_ISPIXELFORMAT_INDEXED = SDL_ISPIXELFORMAT_INDEXED;
SDL_pixels.SDL_ISPIXELFORMAT_ALPHA = SDL_ISPIXELFORMAT_ALPHA;
SDL_pixels.SDL_ISPIXELFORMAT_FOURCC = SDL_ISPIXELFORMAT_FOURCC;

module.exports = SDL_pixels;
