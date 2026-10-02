import users from "../models/userModel.js";

export const getUsers = (req, res) => {
    res.json(users);
};
export const getUserById = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
};
export const createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
};

export const updateUser = (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email } = req.body;

    if (name) {
        user.name = name;
    }

    if (email) {
        user.email = email;
    }

    res.json({
        message: "User updated successfully",
        user: user
    });
};

export const deleteUser = (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });
};