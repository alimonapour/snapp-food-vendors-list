export const makeNumbersFarsi = (str: string | number | undefined) => {
  if (typeof str === "number" || typeof str === "string") {
    str = str.toString()
  } else {
    return ""
  }

  var farsiNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
  for (var i = 0; i < 10; i++) {
    str = str.replace(RegExp(i.toString(), "g"), farsiNumbers[i])
  }
  return str
}
