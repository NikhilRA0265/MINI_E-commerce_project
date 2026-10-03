Overview

This project demonstrates the end-to-end deployment of a mini e-commerce web application using modern DevOps tools and practices. The application is containerized with Docker, analyzed with SonarQube, built and deployed through Jenkins, orchestrated with Kubernetes, and continuously synchronized using Argo CD.

This project was created to gain practical experience with:

CI/CD pipeline automation
Containerization
Kubernetes orchestration
GitOps deployment
Static code analysis
Linux server administration


# 🚀 MERN E-Commerce — CI/CD & Kubernetes GitOps

## 🏗️ Architecture Overview

This project demonstrates an end-to-end DevOps workflow for deploying a MERN-based e-commerce application using **GitHub, Jenkins, SonarQube, Docker, Docker Hub, Helm, Argo CD, and a self-managed Kubernetes cluster**.

The deployment follows a **CI/CD + GitOps architecture**, where Jenkins is responsible for building, testing, analyzing, and containerizing the application, while Argo CD continuously synchronizes the Kubernetes configuration stored in Git with the Kubernetes cluster.

---

## 🔄 Complete CI/CD & GitOps Architecture

```text
                         ┌──────────────────────────┐
                         │       Developer          │
                         │                          │
                         │  Writes / Updates Code   │
                         └────────────┬─────────────┘
                                      │
                                      │ git push
                                      ▼
                         ┌──────────────────────────┐
                         │         GitHub           │
                         │                          │
                         │  Application Source Code │
                         │  frontend/               │
                         │  backend/                │
                         └────────────┬─────────────┘
                                      │
                                      │ Webhook / Trigger
                                      ▼
                    ┌──────────────────────────────────┐
                    │             Jenkins              │
                    │                                  │
                    │          CI Pipeline              │
                    └────────────────┬─────────────────┘
                                     │
                   ┌─────────────────┼──────────────────┐
                   │                 │                  │
                   ▼                 ▼                  ▼
          ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
          │     Build      │ │   SonarQube    │ │ Docker Build   │
          │                │ │                │ │                │
          │ npm install    │ │ Code Quality   │ │ Build Frontend │
          │ Build/Test     │ │ Static         │ │ Build Backend  │
          │                │ │ Analysis       │ │ Docker Images  │
          └────────────────┘ └────────────────┘ └───────┬────────┘
                                                        │
                                                        │ docker push
                                                        ▼
                                             ┌─────────────────────┐
                                             │   Docker Registry   │
                                             │     Docker Hub      │
                                             │                     │
                                             │ frontend:v1         │
                                             │ backend:v1          │
                                             └──────────┬──────────┘
                                                        │
                                                        │ Image available
                                                        ▼
                         ┌─────────────────────────────────────────┐
                         │          Kubernetes Manifests           │
                         │                                         │
                         │  Deployment / Service / ConfigMap etc. │
                         │                                         │
                         │       Version controlled in Git        │
                         └──────────────────┬──────────────────────┘
                                            │
                                            │ git push
                                            ▼
                                  ┌──────────────────┐
                                  │      GitHub      │
                                  │                  │
                                  │ Kubernetes /     │
                                  │ Helm Manifests   │
                                  └────────┬─────────┘
                                           │
                                           │ GitOps Sync
                                           ▼
                                  ┌──────────────────┐
                                  │     Argo CD      │
                                  │                  │
                                  │ Desired State    │
                                  │      ↓           │
                                  │ Actual State     │
                                  └────────┬─────────┘
                                           │
                                           │ Deploy / Sync
                                           ▼
              ┌────────────────────────────────────────────────────┐
              │          Self-Managed Kubernetes Cluster           │
              │                                                    │
              │                  kubeadm Cluster                   │
              │                                                    │
              │   ┌────────────────────────────────────────────┐   │
              │   │              Control Plane VM              │   │
              │   │                                            │   │
              │   │  API Server                                │   │
              │   │  Scheduler                                 │   │
              │   │  Controller Manager                         │   │
              │   │  etcd                                      │   │
              │   │                                            │   │
              │   │              kubeadm init                   │   │
              │   └────────────────────────────────────────────┘   │
              │                         │                          │
              │                  Cluster Control                  │
              │                         │                          │
              │          ┌──────────────┴──────────────┐           │
              │          │                             │           │
              │          ▼                             ▼           │
              │ ┌────────────────────┐      ┌────────────────────┐ │
              │ │  Worker Node VM 1  │      │  Worker Node VM 2  │ │
              │ │                    │      │                    │ │
              │ │   kubeadm join     │      │   kubeadm join     │ │
              │ │                    │      │                    │ │
              │ │   Application Pods │      │   Application Pods │ │
              │ └─────────┬──────────┘      └─────────┬──────────┘ │
              │           │                           │            │
              │           └─────────────┬─────────────┘            │
              │                         │                          │
              │                         ▼                          │
              │             ┌──────────────────────┐              │
              │             │  MERN E-Commerce     │              │
              │             │       Pods            │              │
              │             │                      │              │
              │             │  Frontend Pod        │              │
              │             │  Backend Pod         │              │
              │             │  Supporting Services │              │
              │             └──────────────────────┘              │
              └────────────────────────────────────────────────────┘
```

---

# 🔍 How the Architecture Works

## 1. 👨‍💻 Developer → GitHub

Development starts when the developer makes changes to the application source code.

The repository contains the MERN application:

```text
MERN E-Commerce
│
├── frontend/
│   └── React Application
│
├── backend/
│   └── Node.js / Express API
│
└── deployment/
    └── Kubernetes / Helm configuration
```

After making changes, the developer pushes the code to GitHub:

```bash
git add .
git commit -m "Update application"
git push origin main
```

GitHub acts as the central source-control system for the application.

---

# 2. 🔔 GitHub → Jenkins

A new push to the repository triggers the Jenkins pipeline.

```text
Developer
    │
    │ git push
    ▼
 GitHub
    │
    │ webhook / trigger
    ▼
 Jenkins
```

Jenkins acts as the **CI engine** of the architecture.

The pipeline automates repetitive tasks instead of requiring them to be executed manually.

---

# 3. ⚙️ Jenkins Continuous Integration Pipeline

The Jenkins pipeline performs several stages.

### Pipeline flow

```text
Checkout Code
      │
      ▼
Install Dependencies
      │
      ▼
Build / Test
      │
      ▼
SonarQube Analysis
      │
      ▼
Build Docker Images
      │
      ▼
Push Images to Docker Hub
      │
      ▼
Update Deployment Configuration
      │
      ▼
Commit Changes to Git
```

This provides a repeatable process for converting application source code into deployable container images.

---

# 4. 🔎 SonarQube — Code Quality Analysis

During the CI process, Jenkins sends the source code for analysis by SonarQube.

```text
Jenkins
   │
   ▼
SonarQube
   │
   ├── Static Analysis
   ├── Bugs
   ├── Vulnerabilities
   ├── Code Smells
   └── Quality Gate
```

The purpose is to identify potential code-quality and maintainability issues before the application proceeds further through the pipeline.

---

# 5. 🐳 Docker Image Creation

After the application passes the required CI stages, Jenkins builds Docker images.

For example:

```text
Frontend
   │
   ▼
Dockerfile
   │
   ▼
frontend:v1
```

and:

```text
Backend
   │
   ▼
Dockerfile
   │
   ▼
backend:v1
```

The application is therefore packaged together with its runtime requirements into container images.

---

# 6. 📦 Docker Hub — Container Registry

Jenkins pushes the generated images to Docker Hub.

```text
                  Jenkins
                     │
                     │ docker push
                     ▼
              ┌───────────────┐
              │   Docker Hub  │
              ├───────────────┤
              │ frontend:v1   │
              │ backend:v1    │
              └───────┬───────┘
                      │
                      │ image pull
                      ▼
                 Kubernetes
```

The Kubernetes cluster can then pull these images when creating the application Pods.

---

# 7. 📝 Kubernetes Configuration in Git

The Kubernetes deployment configuration is maintained separately from the application runtime.

Example:

```text
kubernetes/
│
├── deployment.yaml
├── service.yaml
├── configmap.yaml
└── secret.yaml
```

Or, when using Helm:

```text
helm/
└── mern-ecommerce/
    │
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        ├── service.yaml
        └── configmap.yaml
```

The Kubernetes configuration defines the **desired state** of the application.

For example:

```yaml
replicas: 2
image:
  repository: nikhilrao6225/backend
  tag: v1
```

The configuration is stored in Git so that deployment changes are version-controlled and auditable.

---

# 8. 🔄 GitHub → Argo CD

After the Kubernetes/Helm configuration is updated and pushed to GitHub, Argo CD monitors the repository.

```text
                    GitHub
                       │
                       │ Desired State
                       ▼
                    Argo CD
                       │
                       │ Compare
                       ▼
             Kubernetes Cluster
```

Argo CD follows the **GitOps model**.

Git becomes the source of truth for the Kubernetes application's desired state.

Argo CD continuously compares:

```text
Desired State                Actual State
     │                            │
     │                            │
     └────────── Argo CD ─────────┘
                    │
                    ▼
              Synchronization
```

If the cluster differs from the desired configuration stored in Git, Argo CD can synchronize the application.

---

# 9. ☸️ Self-Managed Kubernetes Cluster

The application runs on a self-managed Kubernetes cluster created using `kubeadm`.

The cluster consists of:

```text
                    Kubernetes Cluster
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
     Control Plane                   Worker Nodes
            │                             │
            │                    ┌────────┴────────┐
            │                    │                 │
            ▼                    ▼                 ▼
       API Server          Worker Node 1     Worker Node 2
       Scheduler                │                 │
       Controllers              │                 │
       etcd                     └───────┬─────────┘
                                        │
                                        ▼
                                  Application Pods
```

---

# 10. 🧠 Control Plane

The control-plane VM manages the Kubernetes cluster.

It contains core Kubernetes control-plane components such as:

- **kube-apiserver** — exposes the Kubernetes API
- **etcd** — stores cluster state
- **kube-scheduler** — decides where Pods should run
- **kube-controller-manager** — maintains the desired cluster state

The cluster was initialized using:

```bash
kubeadm init
```

Worker nodes were subsequently connected to the cluster using:

```bash
kubeadm join
```

---

# 11. 🖥️ Worker Nodes

The worker nodes are responsible for running application workloads.

```text
Worker Node 1
│
├── kubelet
├── Container Runtime
└── Application Pods


Worker Node 2
│
├── kubelet
├── Container Runtime
└── Application Pods
```

Kubernetes schedules the application Pods onto available worker nodes according to the cluster's scheduling requirements.

---

# 12. 🛒 MERN E-Commerce Application

The final workload deployed to Kubernetes consists of the application's frontend and backend components.

```text
                MERN E-Commerce
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
    React Frontend            Node.js Backend
          │                         │
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                 MongoDB Atlas
```

The frontend communicates with the backend API, while the backend communicates with the database.

Kubernetes provides the platform for running and managing the containerized application.

---

# 🔁 Complete End-to-End Flow

The entire deployment process can be summarized as:

```text
┌──────────────┐
│  Developer   │

 
 FEATURES
Product listing page
Responsive user interface
Dockerized application
Automated CI/CD pipeline
Static code quality checks
Kubernetes deployment
GitOps-based continuous delivery


Virtual Infrastructure and Cluster Setup


Virtualization Layer

 Oracle VM VirtualBox
 3 Ubuntu Virtual Machines
    1 Control Plane Node
    2 Worker Nodes

Kubernetes Bootstrap Components
-kubeadm
-kubelet
-kubectl
-Container Runtime (Docker or containerd)
-CNI Plugin (for pod networking)
-SSH for node access


Cluster Administration Tasks Performed
 -Provisioned Linux virtual machines
 -Configured hostnames and static networking
 -Disabled swap as required by Kubernetes
 -Installed Kubernetes packages using the official repositories
 -Initialized the Control Plane with kubeadm init
 -Joined Worker Nodes using kubeadm join
 -Installed a CNI plugin for pod-to-pod communication
 -Verified cluster health using kubectl get nodes and kubectl get pods -A                       
