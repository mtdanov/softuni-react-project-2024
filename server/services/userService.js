const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
    const user = await User.create(userData);

    const result = getResult(user);
    return result;
};

exports.login = async ({ email, password }) => {
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    console.log(user);
    console.log(user.password);
    console.log(password);
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    const result = getResult(user);
    return result;
};

function getResult(user) {
    const payload = { _id: user._id, email: user.email, name: user.name };
    const token = jwt.sign(payload, "SOME_SECRET", { expiresIn: "2d" }); // 2d too much
    //!!!!
    const result = {
        _id: user._id,
        accessToken: token,
        email: user.email,
        username: user.name
    };

    return result;
}


exports.getOrders = (userId) => User.findById(userId).populate('orders')