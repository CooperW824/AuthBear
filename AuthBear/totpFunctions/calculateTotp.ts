import jsSHA from "jssha"

export default function getToken(key:string) {
	
	let epoch, time, shaObj, hmac, offset, otp
	let period = 30
	let digits = 6
	let timestamp =  Date.now()
	key = base32tohex(key)
	epoch = Math.floor(timestamp / 1000.0)
	time = leftpad(dec2hex(Math.floor(epoch / period)), 16, "0")
	shaObj = new jsSHA("SHA-1", "HEX")
	shaObj.setHMACKey(key, "HEX")
	shaObj.update(time)
	hmac = shaObj.getHMAC("HEX")
	offset = hex2dec(hmac.substring(hmac.length - 1))
	otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + ""
	otp = otp.substr(Math.max(otp.length - digits, 0), digits)
	return otp
}

function hex2dec(s:string) {
	return parseInt(s, 16)
}

function dec2hex(s:number) {
	return (s < 15.5 ? "0" : "") + Math.round(s).toString(16)
}

function base32tohex(base32:string) {
	let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
		bits = "",
		hex = ""

  console.log(base32);

	base32 = base32.replace("=", "")

	for (let i = 0; i < base32.length; i++) {
		let val = base32chars.indexOf(base32.charAt(i).toUpperCase())
		if (val === -1) throw new Error("Invalid base32 character in key")
		bits += leftpad(val.toString(2), 5, "0")
	}

	for (let i = 0; i + 8 <= bits.length; i += 8) {
		let chunk = bits.substr(i, 8)
		hex = hex + leftpad(parseInt(chunk, 2).toString(16), 2, "0")
	}
	return hex
}

function leftpad(str:string, len:number, pad:string) {
	if (len + 1 >= str.length) {
		str = Array(len + 1 - str.length).join(pad) + str
	}
	return str
}