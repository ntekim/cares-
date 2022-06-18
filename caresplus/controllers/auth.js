const bcrypt = require("bcryptjs");
const Pharmacist = require('../models/pharmacist');
const { validationResult } = require('express-validator');
const jwt  = require('jsonwebtoken');
require("dotenv").config();


exports.signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone, identificationNumber, license, country, state, city, address } = req.body;

    // // Validate user input
    // if (!(email)) {
    //   res.status(400).send("email is required");
    // }

    //   Check if user with email already exists, if yes, throws an error
    const userCheck = await Pharmacist.exists({email});
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

     bcrypt.hash(password, 15)
     .then((hash) => {
        const pharmacist = new Pharmacist({
            firstName: firstname,
            lastName: lastname,
            country: country,
            state: state,
            city: city,
            address: address,
            phone: phone,
            email: email,
            password: hash,
            license: license,
            identificationNumber: identificationNumber,
        });

        pharmacist.save()
        .then(
            (pharm) => {
              res.status(201).json({
                message: 'Pharmacist registered successfully!',
                data: pharm,
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
     })
    } catch (err) {
      if (err) throw new Error(err);
      console.log(err);   
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
   Pharmacist.findOne({email})
   .then(
    (pharmacist) => {
      
      if (!pharmacist) {
        return res.status(400).json({
          error: 'pharmacist not found!'
        });
      }
      //decrypt user password stored in database, compare to inputed password to see if it matches
      bcrypt.compare(req.body.password, pharmacist.password)
      .then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
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
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.json({
        error: error
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