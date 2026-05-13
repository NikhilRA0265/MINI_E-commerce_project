Overview

This project demonstrates the end-to-end deployment of a mini e-commerce web application using modern DevOps tools and practices. The application is containerized with Docker, analyzed with SonarQube, built and deployed through Jenkins, orchestrated with Kubernetes, and continuously synchronized using Argo CD.

This project was created to gain practical experience with:

CI/CD pipeline automation
Containerization
Kubernetes orchestration
GitOps deployment
Static code analysis
Linux server administration


Architecture Diagram

Developer Pushes Code to GitHub
            |
            v
         Jenkins Pipeline
            |
   ---------------------------
   |            |            |
   v            v            v
Build       SonarQube     Docker Image
Code        Analysis      Creation
                               |
                               v
                        Push to Docker Registry
                               |
                               v
                         Update Kubernetes YAML
                               |
                               v
                            GitHub
                               |
                               v
                            Argo CD
                               |
                               v
                   Self-Managed Kubernetes Cluster
                               |
      -------------------------------------------------
      |                       |                       |
      v                       v                       v
 Control Plane VM        Worker Node VM 1       Worker Node VM 2
 (kubeadm init)          (kubeadm join)         (kubeadm join)
      |                       |                       |
      -------------------------------------------------
                               |
                               v
                        Mini E-Commerce Pods

 
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