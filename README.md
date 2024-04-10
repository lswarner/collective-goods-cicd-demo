# **Setting up IAM for CI/CD using AWS CodePipeline, CodeBuild, S3, and CloudFront**


These steps will create a complete pipeline for a single environment (ie, production).  Additional environments can be created by repeating the steps and changing the names and branches to match the desired env. For this configuration, the `main` branch in the repo represents the `Staging` environment while a separate `production` branch is used to specifically release changes to `Production`. 

Staging url: https://dcoi9ip3v1b5i.cloudfront.net
Production url: https://d39s5grgnj0q3t.cloudfront.net

This uses the following AWS resources:
- S3 to store the built React app
- CodePipeline to orchestrate the CI/CD process, listen for changes in the GItHub repo, and trigger a CodeBuild project
- CodeBuild to run the `npm` commands to install and build the app with the latest code changes then upload transpiled code to the S3 bucket
- CloudFront to host the static HTML and JS files at edges in the AWS CDN.

### Brief overview of the build process
1. CodePipeline(s) are configured to subscribe to GitHub changes. When the event occurs, the CodeBuild project is triggered (step2).
   - Staging: The pipeline listens for a **closed PR** on the **main** branch
   - Production: The pipeline listens for a **closed PR** on the **production** branch
2. A CodeBuild product matching the environment is triggered, installs all the required `npm` packages, and builds the code. If the build completes successfully, the new code is stored in the S3 bucket configured for this environment.
3. An environment-specific CloudFront distribution becomes aware of the changes to the content of the S3 bucket. It invalidates the version of the site currently deployed at the edges so the fresh version is fetched on the next request.

### Workflow for using Staging and Production environments

1. A developer has completed a ticket and the feature branch is approved to be merged into `main`.
2. When this PR is closed, the changes are built, stored in the staging S3 bucket and deployed to the staging CloudFront distribution.
3. After the changes are verified and are ready for release, a new PR from `main` -> `production` is opened. When this PR is approved and closed, the production build and deployment process is run.
4. Celebrate new code on Production!

### Configuring IAM Permissions
1. Update the permissions on your S3 bucket to match `s3_webaccess_permissions.json`
2. Create an IAM Policy to invalidate the CloudFront distribution `invalidation_policy.json`
   - Attach this new policy to the CodeBuild service role
3. Give this same CodeBuild service role access to write to the S3 bucket `codebuild_service_role_policy.json`
