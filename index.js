const fs = require( "fs" );
const { createCanvas } = require( "canvas" );

function getRandomColor() {
	return Math.floor( Math.random() * 16777215 ).toString( 16 );
}

function getContrastingColor( bgColor ){
	var r = parseInt( bgColor.substr( 0, 2 ), 16 );
	var g = parseInt( bgColor.substr( 2, 2 ), 16 );
	var b = parseInt( bgColor.substr( 4, 2 ), 16 );
	var yiq = ( ( r * 299 ) + ( g * 587 ) + ( b * 114 ) ) / 1000;
	return ( yiq >= 128 ) ? "black" : "white";
}

function generateInitialsAvatar( { size, initials } ) {
	const canvas = createCanvas( size, size );
	const ctx = canvas.getContext( "2d" );

	// circle
	// ctx.arc( size / 2, size / 2, size * .45, 0, Math.PI * 2 );
	// ctx.fill();

	const bgColor = getRandomColor();
	ctx.fillStyle = "#" + bgColor;
	ctx.fillRect( 0, 0, size, size );

	// text
	const textColor = getContrastingColor( bgColor );
	ctx.fillStyle = textColor;
	ctx.font = ( size * .5 ) + "px Arial";
	ctx.textAlign = "center";
	ctx.fillText( initials, ( size * .5 ), ( size * .68 ) );

	const out = fs.createWriteStream( __dirname + "/test.png" );
	const stream = canvas.createPNGStream();
	stream.pipe( out );
	out.on( "finish", () =>  console.log( "Avatar was created!" ) );
}

generateInitialsAvatar( { size: 100, initials: "JS" } );
