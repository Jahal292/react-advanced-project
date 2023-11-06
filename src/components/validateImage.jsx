export const validateImage = (urlToValidate) => {
    const imageRegex = /^https?:\/\/.*\.(jpeg|jpg|png|gif|bmp|webp)$/i;
  
    return imageRegex.test(urlToValidate);
  };