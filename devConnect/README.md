--- npm create vite@latest --> create react+vite application with basic setup

-- npm install tailwindcss @tailwindcss/vite ==> install tailwind

-- @import "tailwindcss" --> add this line in index.css file

-- npm install daisy UI => install daisy ui which is topnotch of tailwind

-- install cors

--CORS - install cors in backend ==> add middleware to with configurations:origin , credentials:true

--whenever we're making API call so pass axios =>{withCredentials:true}

-- install redux toolkit and react redux ==> install i @reduxjs/toolkit react-redux

-- create appStore and then add provider in app.js

-- useSelector() is used to read / get the data stored in the store

deploy process on AWS

-Signup on AWS
-Launch instance
-chmod 400 <secret key>.pem
-ssh -i "devConnect.pem" ubuntu@ec2-16-170-201-7.eu-north-1.compute.amazonaws.com

-Install nodejs version which same on local
-git glone

-Frontend
-npm install -> dependencies install
-npm run build -> ready for production
-sudo apy update -> updating
-sudo apt install nginx
-sudo systemctl start nginx
-sudo systemctl enable nginx
-copy code from dist(build files) to /var/www/html/
-sudo scp -r dist/\* /var/www/html/
-enable port:80 of your instance

-Backend
-update DB password
-allowed ec2 instance public Ip on mongodb server
-npm install pm2 -g --> install process manager globally
-pm2 start npm --name "devConnect-backend" -- start
-pm2 logs -> to check log history
-pm2 list
-pm2 flush <name> -> pm2 name
-pm2 stop <name> --> to stop the pm2
-pm2 delete <name> --> to delete the pm2
-config nginx --- /etc/nginx/sites-available/default
-sudo systemctl restart nginx --> restart nginx
-modify the BASEURL in frontend project to "/api"
