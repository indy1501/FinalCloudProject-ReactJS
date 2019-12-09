# CMPE 281: cloudProject - EventSync
*	University Name: San Jose State University http://www.sjsu.edu/ 
*	Course: [Cloud Technologies](http://info.sjsu.edu/web-dbgen/catalog/courses/CMPE281.html)
*	Professor: [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/)
*	ISA: [Rajalakshmi Babu](https://www.linkedin.com/in/rajalakshmib/)
*	Students: [Rashmi Sarode](https://www.linkedin.com/in/rashmisarode),
                      [Rashmi Sarode](https://www.linkedin.com/in/rashmisarode),
                      [Rashmi Sarode](https://www.linkedin.com/in/rashmisarode),
                      [Rashmi Sarode](https://www.linkedin.com/in/rashmisarode)

### Project Introduction
EventSync is a one stop platform for registered users to browse through all the available events like music, art or sports events. Registered users can view and post reviews about the available activities. EventSync will have two roles based on usage: the user and the admin. 
The admin has authority to add, modify and delete events. Admin will also have an additional information in the form of Analysis charts, derived from the historical data of our application. 
The user can browse through EventSync for activities of interest according to categories such as music, arts, sports etc. To improve on the user’s experience, ChatBot feature with the audio inputs will be provided to the user to book an event without going through the hassle of searching for one particular event from thousands of listed ones.


### Demo
Youtube Video: [EventSync Demo](https://www.youtube.com/watch?v=La5XdLTHq_o)

Web Application: (https://eventsyncui.codeninjas.cf/)

### AWS Architecture of the project
![architecture](https://user-images.githubusercontent.com/39228894/70470847-d16dee00-1a80-11ea-8fac-dc4e90513c04.png)

### AWS Components to be setup
* EC2: Create the EC2 instance and install node js, nginx as web server. Clone the project from git repositories. Configure the nginx web server to route all /api request to node server and all other requests to react app. Create AMI of EC2 instance with the above configurations. Further EC2 instances will use this AMI when they will get spawned by Auto scaling policies.

* AutoScaling Group: Configure the auto scaling policy to make the system highly-available and application that can scale to configured max instances with a desired instance of 1 and max instance of 2. You can change these configs anytime in the autoscaling policy based on the Params like CPU Util, network in out, data rates etc.

* Classic Load Balancer:  Load balancer transfer request in the round robin fashion to multiple EC2 instances spawned under the target groups. 

* S3: This will be used to store and manage the files uploaded by user. The storage of this bucket will be Standard S3.

* S3 - Standard Infrequent Access: S3 allows to specify the lifecycle rules for given s3 bucket, I have configured it max duration for given objects in bucket to stay in this storage class for 75 days. 

* Transfer Acceleration for S3 Bucket: This allows the bucket for secure and accelerated transfer in terms of the data rates for files.

* AWS Glacier for S3 bucket: Glacier storage class is the cold storage and I have configured the files to move here after 365 days. 

* DynamoDB: Create a DynamoDB instance for keeping track of the files uploaded by the user and their respective params like    description, created and updated time etc. 

* CloudFront: Create a CloudFront (CDN), which will be configured for download of files and setup minimum TTL as 30 sec which will reload the cache.

* Route 53: This is the Domain Name Server which is used to resolve the IP address of the application domain.

* CloudWatch: This will be used to create monitoring for the auto scaling, ec2, dynamodb etc when the CPU utilization of ec2 instances will reach at high or low threshold and sends the notification via SNS.

* Lambda: On any delete events in S3 bucket, it invoked the Lambda function created in nodeJS which will further invoke SNS topic to send notification via email.

* SNS: It is the Simple Notification Service for AWS resources which sends email and text messages on the particular top gets the configured events. 

* Amazon Cognito: Create the userpool for users to sign up or sign in to the application using custom login/signup and social identity providers like google and facebook.

### Instructions to run project locally
* Prerequisite Softwares: React

* Clone the code from git

* Run npm install on both the NodeJS and React projects to install all the dependencies.

* Create the .env file with AWS access key and secret in ReactJS project.

* Run the react app using npm start command.

### Sample Screenshots
Landing Page/Login
![home](https://user-images.githubusercontent.com/39228894/70471271-a89a2880-1a81-11ea-973d-31a99df508de.png)

Sign In/ Sign Up page
![login](https://user-images.githubusercontent.com/39228894/70471435-0169c100-1a82-11ea-815b-cdc05235e7d3.png)

User View
![userview](https://user-images.githubusercontent.com/39228894/70471485-1cd4cc00-1a82-11ea-9972-8fb82fe1cd64.png)

![eventDetails](https://user-images.githubusercontent.com/39228894/70471589-56a5d280-1a82-11ea-8dbb-0cc0d1fc772e.png)

![Bot'](https://user-images.githubusercontent.com/39228894/70471666-7f2dcc80-1a82-11ea-9a98-d9e3c49117d4.png)


Admin View

![admin](https://user-images.githubusercontent.com/39228894/70471523-2e1dd880-1a82-11ea-9eeb-ee8ae6b5205d.png)

![create](https://user-images.githubusercontent.com/39228894/70471669-8359ea00-1a82-11ea-9501-af069215803f.png)

![eventAdded](https://user-images.githubusercontent.com/39228894/70471648-76d59180-1a82-11ea-9cb2-a73bbde869a5.png)

Event Gate View
![eventgateView](https://user-images.githubusercontent.com/39228894/70471655-79d08200-1a82-11ea-84e7-a847679b803a.png)


