#  CloudOps Incident Manager
## End-to-end cloud-native DevOps project
```
cloudops-platform/
│
├── backend/
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── database.py
│       ├── models.py
│       └── schemas.py
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
│
├── database/
│
├── docker/
│
├── kubernetes/
│   ├── backend/
│   ├── frontend/
│   ├── database/
│   └── monitoring/
│
├── monitoring/
│   ├── prometheus/
│   └── grafana/
│
├── .gitignore
├── docker-compose.yml
└── README.md
```


1. Application development
   - React frontend
   - Python FastAPI backend
   - PostgreSQL
   - Incident CRUD operations
   - Docker Compose
   - Persistent volumes
2. Monitoring and observability
   - Prometheus
   - Grafana
   - Alertmanager
   - Application metrics
   - Infrastructure dashboards
3. Kubernetes orchestration
   - Deployments and Pods
   - Services
   - ConfigMaps and Secrets
   - Ingress
   - Liveness and readiness probes
   - Horizontal Pod Autoscaler
   - Helm charts
4. Terraform – Infrastructure as Code
   - AWS VPC
   - Public and private subnets
   - Internet Gateway and NAT configuration
   - IAM roles and policies
   - ECR repositories
   - EKS cluster
   - Security groups
5. Ansible – Configuration Management
   - EC2 administration server
   - Linux configuration
   - Nginx installation
   - Monitoring server configuration
   - Firewall and SSH hardening
   - Automated application configuration
6. CI/CD automation
   - GitHub Actions
   - Automated tests
   - Docker image builds
   - Image scanning
   - Push to Amazon ECR
   - Deploy to Kubernetes
7. Production deployment and documentation
   - AWS deployment
   - DNS and HTTPS
   - Application availability testing
   - Incident simulation
   - Disaster recovery
   - Technical architecture documentation

|     Service    |            Url                    |
| ---------------|-----------------------------------|
|Prometheus      | http://prometheus:9090            |
|Grafana         | http://localhost:3000             |
|Backend         | http://127.0.0.1:8000             |
|Frontend        | http://localhost:5173             |
|Swagger         |http://localhost:8000/docs         |