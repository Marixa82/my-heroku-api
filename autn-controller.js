export const registerController = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email);
    const verificationCode = randomUUID();
  
    const hashPass = await bcryptjs.hash(password, 10);
  
    const index = email.split("").findIndex((symbol) => symbol === "@");
    const name = email.slice(0, index);
    await User.create({
      email,
      password: hashPass,
      avatarURL,
      name,
      verificationCode,
    });
  
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: emailVerify(verificationCode, `${BASE_URL}`),
    };
    await sendEmail(verifyEmail);
  
    res.status(201).json({
      message: "New user is created",
    });
  };

  export const loginController = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
  
    const isCorrectPass = await bcryptjs.compare(password, user.password);
  
    if (!isCorrectPass) {
      throw HttpError(401, "Email or password is wrong");
    }
  
    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token }, { new: true });
    res.status(200).json({
      message: `Login '${email}' successful`,
      token,
    });
  };

  export const logoutController = async (req, res) => {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).json();
  };