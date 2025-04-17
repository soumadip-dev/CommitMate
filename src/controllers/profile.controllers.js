// IMPORTING MODULES

// CONTROLLER FOR VIEW PROFILE
const viewProfileController = async (req, res) => {
  try {
    // User is already attached to req by authMiddleware
    const user = req.user;

    // Return user data
    res.status(200).send(user.firstName);
  } catch (err) {
    // Handle error
    res
      .status(500)
      .send(
        `An error occurred during profile request: ${err.message}. Please try again later.`,
      );
  }
};

export { viewProfileController };
