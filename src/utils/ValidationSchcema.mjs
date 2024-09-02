export const createUserValidationSchcema = {
  name: {
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "must be atleat 3-10 characters",
    },
    isString: {
      errorMessage: "must be string",
    },
    notEmpty: {
      errorMessage: "must not be empty",
    },
  },
  displayname: {
    isString: {
      errorMessage: "must be a string",
    },
  },
};
