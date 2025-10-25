const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Validate = require('../Middlewares/Validate');
require('dotenv').config();

const JWT_SIGN = process.env.JWT_SIGN;


router.post('/adduser', [
    body('name', 'Please enter valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be 5 character long').isLength({ min: 5 })
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ attempt: "fail", errors: error.array() });
    }
    try {
        //Checking if user already exists
        let user = await User.findOne({ email: req.body.email })
        console.log("user: ", user);
        if (user) {
            return res.status(400).json({ attempt: "fail", errors: { msg: "A user with same email already exists" } });
        }
        const salt = await bcrypt.genSalt(10);
        const safePwd = await bcrypt.hash(req.body.password, salt);
        user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: safePwd
            });

        const data = {
            user: {
                id: user.id,
            }
        }
        const token =  jwt.sign(data, JWT_SIGN);
        res.json({ attempt: 'success', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ attempt: 'fail', errors: { msg: "Something went wrong ", error } })
    }
})

router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be 5 character long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ attempt: "success", errors: error.array() });
    }
    try {
        //There is no wrong input 
        const { email, password } = req.body;
        const find = await User.findOne({ email })
        if (!find) {
            return res.status(400).json({ attempt: "fail", errors: { msg: "User does not exist." } })
        }
        else {
            let validatePass = await bcrypt.compare(password, find.password); // validatin if the password given is same or not
            if (!validatePass) {
                return res.status(400).json({ attempt: "fail", errors: { msg: "Wrong login credentials." } }) // if not matched returning a bad response
            }

            const data = {
                user: {
                    id: find.id,
                }
            }
            const token = jwt.sign(data, JWT_SIGN);
            res.json({ attempt: 'success', token });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ attempt: 'fail', errors: { msg: "Something went wrong ", error } })
    }
})

router.post('/getuser', Validate, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).select("-password -email");
        if (user) {
            res.json({ attempt: 'success', user })
        }
        else {
            res.status(401).json({ attenpt: 'fail', errors: { msg: 'Unauthorised user' } });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ attempt: 'fail', errors: { msg: "Something went wrong ", error } })

    }
})

module.exports = router;