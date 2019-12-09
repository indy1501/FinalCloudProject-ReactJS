# CMPE 281: cloudProject-1 DropBucket
*	University Name: San Jose State University http://www.sjsu.edu/ 
*	Course: [Cloud Technologies](http://info.sjsu.edu/web-dbgen/catalog/courses/CMPE281.html)
*	Professor: [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/)
*	ISA: [Rajalakshmi Babu](https://www.linkedin.com/in/rajalakshmib/)
*	Students: [Rashmi Sarode](https://www.linkedin.com/in/rashmisarode)
            [Rashmi Sarode](https://www.linkedin.com/in/rashmisarode)

### Project Introduction
DropBucket, is a web application hosted on AWS cloud which provides authorized users a portal to maintain their files securely on cloud and enable users to upload, download, update and delete their files from any location. This project is the 3 tier web application using various AWS service resources. The application manages various components to provide a highly available, scalable, cost effective solution to securely back up data on to Amazon S3 and CloudFront. This application provides seamless experience during the peak load time by leveraging the AWS auto scaling functionality and also helps in managing EC2 instance health using Cloud Watch, AWS Lambda and SNS which are associated with the auto scale group.

### Demo
Youtube Video: [DropBucket Demo](https://www.youtube.com/watch?v=La5XdLTHq_o)

Web Application: (https://rashmicsproject.ml/)

### AWS Architecture of the project
![CloudProject1](https://user-images.githubusercontent.com/39228894/67639369-262c1f80-f8ac-11e9-8f90-4edd92196087.jpg)

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
* Prerequisite Softwares: NodeJS, React

* Clone the code from git

* Run npm install on both the NodeJS and React projects to install all the dependencies.

* Create the .env file with AWS access key and secret in NodeJS project.

* Run the NodeJS API using node src/app.js command.

* Run the react app using npm start command.

### Sample Screenshots
Sign In/ Sign Up page
![loginPage](https://user-images.githubusercontent.com/39228894/67639370-29271000-f8ac-11e9-897b-da883cf9ab00.png)

Dashboard Page
![userPage](https://user-images.githubusercontent.com/39228894/67639371-2c220080-f8ac-11e9-908d-414ffdf2ba58.png)

Admin Dashboard Page
![adminPage](https://user-images.githubusercontent.com/39228894/67639368-20363e80-f8ac-11e9-9d52-3c97bb91edbd.png)
