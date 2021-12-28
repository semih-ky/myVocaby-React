export const regexValidator = (value, regex) => {
  let keyPress = value.split("")[value.length - 1];
  return regex.test(keyPress);
};

export const trimmedValue = (val) => val.trim().split(" ").join("");
