// document.getElementById(): sử dụng DOM để tương tác với HTML, lấy input và trả về output.
// charAt(index): lấy ra kí tự thứ i trong chuỗi. (sử dụng charAt() an toàn hơn việc get index trực tiếp bằng toán tử [])
// charCodeAt(ihdex): lấy mã ASCII của kí tự thứ i.
// fromCharCode(ascii_number): in ra kí tự từ mã ASCII.
// toUpperCase(): chuyển đổi chuỗi sang in hoa.

//cong thuc Ci = (Pi + ki mod m) mod 26

function btnEncrypt() {
  document.getElementById("resultBruteforce").innerHTML = "";
  var plainText = document.getElementById("plainText").value;
  //kiem tra plain Text
  if (!plainText.trim()) {
    errorMsg.innerHTML = "Chưa nhập Plain text kìa! :D";
    return;
  }
  let key = document.getElementById("key").value.toUpperCase();
  if (
    (!isNaN(key) && key.length > 2) ||
    (isNaN(key) && key.length > 1) ||
    !key.trim()
  ) {
    errorMsg.innerHTML = "Khóa K bị rỗng hoặc sai!";
    return;
  }

  if (!isKeyValid(key)) {
    errorMsg.innerHTML = "Khóa K không hợp lệ.";
    return;
  }

  if (!isNaN(key)) {
    key = String.fromCharCode(parseInt(key) + 65);
    if (parseInt(key) < 0 || parseInt(key) > 26) {
      errorMsg.innerHTML = "Khóa K chỉ từ 0 đến 26";
      return;
    }
  }

  // Chuỗi sau khi mã hóa
  const cipherText = crypt(plainText, key);
  document.getElementById("cipherText").value = cipherText;
  errorMsg.innerHTML = "";
}

function crypt(text, key, isDecrypt = false) {
  var codeKey = key.charCodeAt() - 65;
  if (isDecrypt == true) {
    codeKey = 26 - codeKey;
  }
  var result = "";
  for (let i = 0; i < text.length; i++) {
    var codeTxt = text.charCodeAt(i);
    if (codeTxt >= 65 && codeTxt <= 90) {
      // doan nay la chu cai in hoa
      let resultCode = (codeTxt - 65 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 65);
    } else if (codeTxt >= 97 && codeTxt <= 122) {
      // chu cai thuong
      let resultCode = (codeTxt - 97 + codeKey) % 26;
      result += String.fromCharCode(resultCode + 97);
    } else {
      // ngoai nhung cai kia thi no se giu nguyen va tiep tuc cai cua no
      result += text.charAt(i);
    }
  }
  return result;
}

function isKeyValid(key) {
  for (let i = 0; i < key.length; i++) {
    codeKey = key.charCodeAt(i);
    if (
      !((codeKey >= 65 && codeKey <= 90) || (codeKey >= 48 && codeKey <= 57))
    ) {
      return false;
    }
  }
  return true;
}
