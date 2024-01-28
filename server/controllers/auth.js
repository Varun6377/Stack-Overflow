import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UAParser from "ua-parser-js";
import users from "../models/auth.js";
import axios from "axios";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const deviceType = isMobile
      ? "Mobile"
      : isTablet
      ? "Tablet"
      : isDesktop
      ? "Desktop"
      : "Unknown";

    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const ipRes = await axios.get("https://api.ipify.org/?format=json");
    const ipAddress = ipRes.data.ip;

    const loginHistoryEntry = {
      browser: result.browser.name,
      os: [
        {
          name: result.os.name,
          version: result.os.version,
        },
      ],
      device: deviceType,
      ip: ipAddress,
      timestamp: new Date(),
    };

    existingUser.loginInformation.push(loginHistoryEntry);
    await existingUser.save();

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Something went wrong...");
  }
};
