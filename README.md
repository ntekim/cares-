     **Pharmacy Managegement system**
 A platform that will enable pharmacist to
manage their pharmacy(ies). The platform 
will enable to record each drugs, track 
drug stock, connect to their employees and 
see the statistics for each month.


I used JWT for the authentication.
Stored a key(privateKey) in .env file, use 
the privateKey as option for signing the 
Json web token(JWT), after which I send 
the generated token(which becomes the
publicKey) as part of my response
payload. When a user is performing an 
action beside signup and login, I'll have
to confirm with the jwt.verify() function
 if the token is valid. If yes, user is
authenticated and allowed to proceed, else
returns 401(unauthenticated) statusCode.
