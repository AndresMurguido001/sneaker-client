export default errors =>
  errors.reduce((acc, cv) => {
    if (cv.path in errors) {
      acc[cv.path] = acc[cv.message];
    } else {
      acc[cv.path] = acc[cv.message];
    }
    return acc;
  });
