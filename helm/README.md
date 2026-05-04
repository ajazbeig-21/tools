# Helm Basics

## Key Concepts
- Charts
- Templates and functions
- Pipelines
- Conditionals
- with blocks
- range loops
- Chart hooks
- Packaging and signing

## Helm Components
- Helm CLI: command-line utility used to install, upgrade, roll back, and uninstall releases
- Chart: a collection of files and Kubernetes object templates required to deploy an application
- Release: a running instance of a chart in a Kubernetes cluster
- Revisions: Helm tracks each release change as a new revision

Helm can download charts from public repositories for many use cases.

Helm stores release metadata in Kubernetes Secrets by default, so it always knows what it has installed and changed.

## What is Helm?
Helm is a package manager for Kubernetes.

Even a simple application usually needs multiple Kubernetes resources such as:
- Deployment
- Service
- ConfigMap
- Secret
- PersistentVolume and PersistentVolumeClaim

Managing many YAML files manually with kubectl apply can become repetitive and error-prone, especially as applications grow.

Helm solves this by packaging related Kubernetes resources into a chart so you can install, upgrade, and roll back an application as one unit.

## Why Helm Helps
- Install complex applications with one command
- Track release history and revisions
- Roll back quickly when needed
- Uninstall cleanly without leaving partial resources

Kubernetes only sees individual objects (Pods, Services, Deployments, and so on). Helm helps you manage them as one application release.

## Example
Install an NGINX chart:

helm install my-nginx bitnami/nginx

This creates a managed Helm release named my-nginx.

You can also install the same chart multiple times in one cluster by using different release names:

helm install web-a bitnami/nginx
helm install web-b bitnami/nginx

## Templating with values.yaml
In a chart, files such as Deployment and Service are templates.

Values like image repository and replica count are typically defined in values.yaml and referenced in templates, for example:
- .Values.image.repository
- .Values.replicaCount

This allows you to customize behavior by changing values.yaml instead of editing every Kubernetes manifest.

When a chart is installed or upgraded, Helm creates or updates a release revision.

## Chart Sources
Many ready-to-use charts are published publicly, including Redis and Prometheus.

Artifact Hub is a popular place to discover charts:
https://artifacthub.io

## Helm 2 vs Helm 3

### Helm 2
- Used a server-side component called Tiller
- Tiller sat between Helm CLI and Kubernetes API
- This added operational and security concerns in some environments

### Helm 3
- Tiller removed
- Helm talks directly to the Kubernetes API using your kubeconfig permissions
- Better security model and simpler architecture

## Drift and Rollback Notes
If someone makes manual changes with kubectl outside Helm, Helm can lose alignment with expected chart-managed state.

In Helm 3 workflows, upgrades and rollbacks are more reliable when all application changes are done through Helm commands.

## Helpful Command
Use this to explore available commands:

helm --help