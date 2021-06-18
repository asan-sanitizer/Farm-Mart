# FarmMart 

![image](https://user-images.githubusercontent.com/15072510/122614000-cd4a6580-d053-11eb-8ba4-fad6325cb0d6.png)


## COMP-231 Software Development Project 1  
### Team
  - Pakalapati, Surya Narayana 
  - Abhishek Raturi 
  - Rahul Raman
  - Palak Arora
  - Kharva, Dhruvika
  - Shandilya, Shivangi
  - Keshav Arshdeep
  - Mistry, Apexa Kiritbhai

## How to Run ?
	- install mongodb dependencies :  
    `npm install --save mongoose mongodb`
	- to test whether the mongodb and mongoose are working properly  
    run 'node mongodb-test.js` 
  - to run the app 
    `npm start`

## TODO
  ### Back End
  - ## (Prerequisite) setup node js , mongo db compass and mongoose
  - Schema (table) : This is just which tables we need for mongodb 
    - Asset Owner           [ Surya ]
    - Farmers               [ Surya ]
    - Land Post             [ Surya ]    (note# each post will have comments )
    - Machinery Post        [ Surya ]

  - User Authentication ( for login page )  [ Dhruvika Kharva ] (Note # do it at last )
  - User SignUp Integration  
  - Integrate twillio api for chat service  (https://www.twilio.com/sms) 
    - ( Note: Dont create twillio.com account )

  ### Front End 
  - Login Page               [ Apexa Mistry ]
  - Signup Page              [ Apexa Mistry ]
  - Home Page  / About Us    [ Arshdeep Keshav / Palak Arora ]  
  - Tabs 
    - [ Land Post ]          [ Shivangi Shandilya / Palak Arora ]
    - [ Machinery Post ]     [ Shivangi Shandilya / Palak Arora ]
    - (Note #) search/filter buttons  [User should have option to clear the search]  

  - details post [ for selected post(land/machinery) ]   [ Apexa Mistry  ]
  - Checkout ( Paypal Integration ) [ Arshdeep Keshav ] 
  - Contact Us                      [ Apexa ]
  
# Farm-Mart
