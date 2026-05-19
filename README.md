# GHAS Azure DevOps Test

This is a standalone demo repo for learning GitHub Advanced Security in Azure DevOps.

This repo is designed to be imported into Azure Repos before you run the pipeline. Dependency scanning in Azure DevOps currently works only when the repository provider is Azure Repos.

It is intentionally built to produce findings quickly:
- Dependency scanning: `lodash@4.17.15` is included on purpose.
- CodeQL scanning: the app includes an open redirect route and an `eval`-based route on purpose.

## What to expect

After you import this code into Azure Repos and run `azure-pipelines.yml` with GHAS enabled on the repo, you should get:
- dependency alerts
- code scanning alerts

Secret scanning is not included by default because a real-looking secret can block pushes. Test that separately with a temporary branch.

## Files

- `azure-pipelines.yml`: full GHAS pipeline
- `azure-pipelines-codeql.yml`: CodeQL only
- `azure-pipelines-dependency-scan.yml`: dependency scanning only
- `src/server.js`: intentionally vulnerable demo routes for CodeQL
- `package.json`: intentionally vulnerable dependency for dependency scanning

## Run locally

```bash
npm install
npm test
npm start
```

Health endpoint:

```text
http://localhost:8080/health
```

## Azure DevOps setup

1. Create or open an Azure DevOps project.
2. Create a new Azure Repos repository named `ghas-azure-devops-test`.
3. Import or push the contents of this repo into that Azure Repos repository.
4. Enable GHAS on the Azure DevOps repo:
   Project Settings -> Repos -> ghas-azure-devops-test -> GitHub Advanced Security -> Enable
5. Go to Pipelines -> New pipeline.
6. Choose Azure Repos Git.
7. Select `ghas-azure-devops-test`.
8. Choose Existing Azure Pipelines YAML file.
9. Select `azure-pipelines.yml`.
10. Run the pipeline.

If you connect this repository through GitHub instead of Azure Repos, CodeQL can still run but dependency scanning will be skipped.

## Where to view results

After the pipeline completes:
- Azure DevOps -> Repos -> Advanced Security

## Optional secret scanning test

Create a temporary file such as `test-secret.txt` with a fake test token, push it on a temporary branch, confirm the alert, then delete it immediately.
