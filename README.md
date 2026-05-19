# GHAS Azure DevOps Test

This is a standalone demo repo for learning GitHub Advanced Security in Azure DevOps.

It is intentionally built to produce findings quickly:
- Dependency scanning: `lodash@4.17.15` is included on purpose.
- CodeQL scanning: the app includes an open redirect route and an `eval`-based route on purpose.

## What to expect

After you import `azure-pipelines.yml` into Azure DevOps and run it with GHAS enabled on the repo, you should get:
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

1. Push this folder as its own GitHub repo.
2. In Azure DevOps, create or open a project.
3. Connect the GitHub repo.
4. Enable GHAS on the Azure DevOps repo:
   Project Settings -> Repos -> your repo -> GitHub Advanced Security -> Enable
5. Go to Pipelines -> New pipeline.
6. Choose GitHub.
7. Select this repository.
8. Choose Existing Azure Pipelines YAML file.
9. Select `azure-pipelines.yml`.
10. Run the pipeline.

## Where to view results

After the pipeline completes:
- Azure DevOps -> Repos -> Advanced Security

## Optional secret scanning test

Create a temporary file such as `test-secret.txt` with a fake test token, push it on a temporary branch, confirm the alert, then delete it immediately.
