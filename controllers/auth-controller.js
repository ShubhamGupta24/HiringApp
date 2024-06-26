// Here will br adding all the functionalities used in the application

const User = require("../models/user-model");



// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
    try {
        res.status(201).json({ msg: "Welcome to our home page" });
    } catch (error) {
        console.log(error);
    }
};

// *-------------------
// Registration Logic
// *-------------------

// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.
const register = async (req, res) => {
    try {
        const { username, email, password, city, age, zip_code, softDelete } = req.body;
        console.log(req.body)

        // Checks the existence of user
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "email already exists" });
        }

        const userCreated = await User.create({ username, email, password, city, age, zip_code, softDelete });

        res.status(200).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


// *-------------------
// Login Logic
// *-------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isValidPassword = await userExist.comparePassword(password);

        if (isValidPassword) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        } else {
            res.status(401).json({ message: "Invalid email or Password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}


// *-------------------
// Delete User Logic
// *-------------------
const deleteUser = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    const isValidPassword = await userExist.comparePassword(password);
    try {
        if (isValidPassword) {
            const deletedUser = await User.updateOne({ softDelete: true });
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User deleted", deletedUser });
        } else {
            res.status(40).json({ message: "Invalid email or Password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}


// *-------------------
// Update User Logic
// *-------------------

const updateUser = async (req, res) => {
    try {
        const { username, email, password, city, age, zip_code } = req.body;
        console.log(req.body)

        // Checks the existence of user
        const userExist = await User.findOne({ email });
        if (userExist) {
            const userUpdated = await User.create({ username, email, password, city, age, zip_code });
            if (userUpdated) {
                res.status(200).json({
                    msg: "Update Successful"
                });
            }
            else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
        else {
            return res.status(400).json({ msg: "user does not exists" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const partialUpdateUser = async (req, res) => {
    try {
        console.log(req.body)

        // Checks the existence of user
        const userExist = await User.findOne({ email });
        if (userExist) {
            const userUpdated = await User.updateOne(req.body);
            if (userUpdated) {
                res.status(200).json({
                    msg: "Update Successful"
                });
            }
            else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
        else {
            return res.status(400).json({ msg: "user does not exists" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// *------------------------------------
//  User List Passing to FrontEnd Logic
// *------------------------------------ 
const userList = async () => {
    try {
        const users = await User.find({});
        return res.status(200).json({ users });
    } catch (error) {
        console.log(` error from user route ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

// *------------------------------------
//  User details Passing to FrontEnd Logic
// *------------------------------------ 
const user = async (userId) => {
    try {
        const userData = await User.findById({ userId });
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(` error from user route ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { home, register, login, userList, updateUser, user, deleteUser };