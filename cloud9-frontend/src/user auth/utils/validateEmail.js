const validateEmail = (email) => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailPattern.test(email)) {
        return false;
      } else {
        return true;
      }
  }

  export default validateEmail