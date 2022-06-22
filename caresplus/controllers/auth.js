const bcrypt = require("bcryptjs");
const Pharmacist = require('../models/pharmacist');
const { validationResult } = require('express-validator');
const jwt  = require('jsonwebtoken');
const Role = require("../../models/role");
const Outlet = require("../models/outlet");
// const fs = require("fs");
// const NodeRSA = require("node-rsa");
// const { generatePair } = require("../../db/middleware/rsa_key");
require("dotenv").config();
// const path = require('path');

// const key = new NodeRSA({b: 512});
exports.signup = async (req, res, next) => {
  try {
      const { firstName, lastName, email, password, phone, identificationNumber, license, country, state, city, street } = req.body;

      //   Check if user with email already exists, if yes, throws an error
      const mail = {email: email};
      const userCheck = await Pharmacist.findOne(mail);
      console.log(userCheck);
      if (userCheck) {
          res.status(409).send("Pharmacist with this email already exists");
          process.exit(1);
      }
      // check if request pass email and password validation
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          return res.status(400).json({
              success: false,
              errors: errors.array()
          });
      }
      // console.log(errors);
      let query = { title: "pharmacist" };
      let role = await Role.findOne(query);
      console.log(role._id);
      bcrypt.hash(password, 15)
      .then(async (hash) => {
          await Pharmacist.create({
              firstName: firstName,
              lastName: lastName,
              address: {
                country: country,
                state: state,
                city: city,
                street: street
              },
              phone: phone,
              email: email,
              password: hash,
              license: license,
              identificationNumber: identificationNumber,
          })
          .then(async (pharm) => {
            await Outlet.create({
              'name': pharm.firstName,
            })
            .then((outlet) => {
              outlet.Pharmacist.push(pharm._id);
              outlet.save();
              pharm.outlets.push(outlet._id);
              pharm.role = role._id;
              pharm.save();
              console.log(pharm._id, outlet._id, role._id, outlet);
              res.status(201).json({
                message: "Pharmacist registered succesfully",
                data: pharm
              });
              console.log("Pharmacists registered succesfully");
              next();
            }).catch((error) => {
              res.status(400).json({
                error: error
              });
            })
          })
          .catch((error) => {
              res.status(400).json({
                error: error
              });
          })
      }).catch((error) => {
        res.status(400).json({
          error: "Raw"
        });
        console.log(error);
      })
    } catch (err) {
      if (err) throw new Error(err);
    }
}

exports.login = async (req, res) => {

    try {
      // Get user input
      // The keywords in the {} act as variables to store corresponding values
      const { email, password } = req.body;

      // Validate user input
      if (!(email)) {
        res.status(400).send("email is required");
      }
      if (!(password)) {
        res.status(400).send("password is required") 
      }
    // Check if user already exists
    await Pharmacist.findOne({email})
    .then(
      async (pharmacist) => { 
        if (!pharmacist) {
          return res.status(400).json({
            error: 'pharmacist not found!'
          });
        }
        //decrypt user password stored in database, compare to inputed password to see if it matches
        await bcrypt.compare(req.body.password, pharmacist.password)
        .then(
          (valid) => {
            if (valid != true) {
              return res.status(400).json({
                error: 'Incorrect password!'
              });
            }
            //   Generate JWT token to indicate user credential is valid
            const token = jwt.sign(
              { _id: pharmacist._id },
              process.env.JWT_KEY,
              { expiresIn: '24h' }
            );
              
            res.status(200).json({
              pharmacistId: pharmacist._id,
               token: token
            });
          }
        ).catch(
           () => {
            res.status(500).json({
               error: "error"
            });
          }
        );
      }
    ).catch(
      () => {
        res.json({
          error: "Invalid"
        });
      }
    );
  }catch (err) {
    if (err) throw new Error(err);
    console.log(err);   
   }

}

exports.logout = async (req, res) => {
  const  authHeader  = req.headers["authorization"];
  // replace jwt token with a blanck string which expires in 1 second
  // delete functionality isn't included in the jwt.sign() function, that's why
  jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
  if (logout) {
    res.status(200).send({
      msg : 'You have been Logged Out',
   });
  } else {
    res.status(500).send({msg: 'error'});
  }
  });
}