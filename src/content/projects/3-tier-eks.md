---
name: 'Three Tier EKS Microservices'
description: 'A three tier application deployed on AWS EKS using GitOps, Terraform, GitHub Actions, and Prometheus for monitoring.'
impact: 'Repeatable environment bootstrap from infrastructure to workloads through Terraform and ArgoCD App of Apps.'
scale: 'Frontend and backend scale independently on EKS managed node groups.'
availability: 'Deployed across multiple AZs with health-checked services and rolling updates.'
cost: '~$194/month in eu-west-2 for full environment; designed for teardown after testing.'
keyLearning: 'Keeping Terraform for bootstrap and GitOps for runtime delivery reduces drift and improves operability.'
tags: ['AWS', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions']
image: '../../../public/static/eks-devopsquiz.png'
link: 'https://github.com/wegoagain-dev/3-tier-eks'
startDate: 2025-12-01
---
