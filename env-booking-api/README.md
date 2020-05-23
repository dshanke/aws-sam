# aws-sam

mkdir -p build

##api gateway
sam_template_name=sam-template-env-booking-api

#package
sam package --template-file template/${sam_template_name}.yaml --output-template-file build/${sam_template_name}-out.yaml --s3-bucket damz-demo-sam

#deply
sam deploy --template-file build/${sam_template_name}-out.yaml --stack-name ${sam_template_name}-stack --capabilities CAPABILITY_IAM --region ap-southeast-2

API_URL=$(aws cloudformation --region ap-southeast-2 describe-stacks --stack-name ${sam_template_name}-stack --query "Stacks[0].Outputs[?OutputKey=='DevEndpoint'].OutputValue" --output text)
echo $API_URL

#make sure front end html is updated with the URL (not the best way but should be enough for our demo)
sed -i "s,ENV_BOOKING_API_ENDPOINT_PLACEHOLDER,$API_URL,g" frontend/index.html

##s3 website
sam_template_name=sam-template-env-booking-s3-website

#package
sam package --template-file template/${sam_template_name}.yaml --output-template-file build/${sam_template_name}-out.yaml --s3-bucket damz-demo-sam

#deploy
sam deploy --template-file build/${sam_template_name}-out.yaml --stack-name ${sam_template_name}-stack --capabilities CAPABILITY_IAM --region ap-southeast-2

aws s3 cp frontend s3://damz-env-booking --recursive --region ap-southeast-2
