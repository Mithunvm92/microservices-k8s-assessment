# Microservices Kubernetes Deployment Assessment

## Objective

Deploy a microservices application on Kubernetes using Minikube and validate inter-service communication.

---

# Project Structure

```text
submission/
├── deployments/
│   ├── user-service.yaml
│   ├── product-service.yaml
│   ├── order-service.yaml
│   └── gateway-service.yaml
├── services/
│   ├── user-service.yaml
│   ├── product-service.yaml
│   ├── order-service.yaml
│   └── gateway-service.yaml
├── screenshots/
│   ├── pods.png
│   ├── logs.png
│   └── service-test.png
└── README.md
```

---

# Technologies Used

* Kubernetes
* Minikube
* Docker
* Node.js
* Ubuntu Linux

---

# Minikube Setup

## Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
```
<img width="1237" height="38" alt="image" src="https://github.com/user-attachments/assets/e5c9bbde-f1b8-460d-90f4-c9281050c863" />

Enable Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```
<img width="1235" height="312" alt="image" src="https://github.com/user-attachments/assets/330fe4c7-072b-4f67-b720-0889fa95794c" />

---

## Install kubectl

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x kubectl

sudo mv kubectl /usr/local/bin/
```
<img width="1236" height="162" alt="image" src="https://github.com/user-attachments/assets/225974cb-29d9-445d-98d9-d0b1833cb650" />

Verify:

```bash
kubectl version --client
```
<img width="1239" height="46" alt="image" src="https://github.com/user-attachments/assets/0da3cfd1-b0ad-445d-a768-ddbe202c9c41" />


---

## Install Minikube

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

sudo install minikube-linux-amd64 /usr/local/bin/minikube
```
<img width="1236" height="162" alt="image" src="https://github.com/user-attachments/assets/78096df9-a2de-4823-a4c1-e8c90d8b5f08" />

Verify:

```bash
minikube version
```
<img width="1240" height="48" alt="image" src="https://github.com/user-attachments/assets/11039899-0ab3-4dde-ad92-5281172ee5f7" />

---

# Start Minikube

```bash
minikube start --driver=docker
```
<img width="1237" height="104" alt="image" src="https://github.com/user-attachments/assets/76fc1e2f-d402-4464-ba5a-534fa1f9564e" />

Verify:

```bash
kubectl get nodes
```
<img width="1237" height="47" alt="image" src="https://github.com/user-attachments/assets/523d1466-6f0d-4dbf-8e5f-a98102e6bad4" />

---

# Docker Image Build

## User Service

```bash
docker build -t user-service:latest ./Microservices/user-service
```
<img width="1238" height="214" alt="image" src="https://github.com/user-attachments/assets/997e6e31-8c6a-42e1-83fd-aa24968f88ff" />

## Product Service

```bash
docker build -t product-service:latest ./Microservices/product-service
```
<img width="1237" height="212" alt="image" src="https://github.com/user-attachments/assets/b5d18e38-78ae-415e-b79e-f31c41be52a3" />

## Order Service

```bash
docker build -t order-service:latest ./Microservices/order-service
```
<img width="1237" height="208" alt="image" src="https://github.com/user-attachments/assets/705d0b91-36dc-4eb5-86c4-b0b752fbdb8b" />

## Gateway Service

```bash
docker build -t gateway-service:latest ./Microservices/gateway-service
```
<img width="1239" height="210" alt="image" src="https://github.com/user-attachments/assets/af908fa4-8e6a-412c-955a-f8c77ea75181" />

---

# Load Images Into Minikube

```bash
minikube image load user-service:latest
minikube image load product-service:latest
minikube image load order-service:latest
minikube image load gateway-service:latest
```

---

# Deploy Kubernetes Resources

## Apply Deployments

```bash
kubectl apply -f submission/deployments/
```
<img width="1234" height="70" alt="image" src="https://github.com/user-attachments/assets/056fd83b-2d32-45aa-a977-3b4be0c0a788" />

## Apply Services

```bash
kubectl apply -f submission/services/
```
<img width="1238" height="71" alt="image" src="https://github.com/user-attachments/assets/256a3c4d-7c71-4bd1-9b3d-55a004af309d" />

---

# Verify Deployments

## Check Pods

```bash
kubectl get pods
```
<img width="1235" height="69" alt="image" src="https://github.com/user-attachments/assets/ac492a00-fbac-4d9f-b467-743267658996" />

Expected:

```text
1/1 Running
```

for all services.

---

## Check Services

```bash
kubectl get svc
```
<img width="1236" height="89" alt="image" src="https://github.com/user-attachments/assets/ee7e4e01-5363-4927-97d8-aef1eaeb55d7" />

Expected:

* user-service
* product-service
* order-service
* gateway-service

---

# Inter-Service Communication Test

## Port Forward Gateway

```bash
kubectl port-forward service/gateway-service 9191:3003
```
<img width="1237" height="100" alt="image" src="https://github.com/user-attachments/assets/f8d95e3c-705c-4f01-b999-effa5183af84" />

---

# API Testing

## Users API

```bash
curl http://localhost:9191/api/users
```
<img width="1241" height="25" alt="image" src="https://github.com/user-attachments/assets/c40854e7-0d1a-40d9-ab72-f14f12afa05c" />


Expected Response:

```json
[
  {
    "id": 1,
    "name": "John Doe"
  }
]
```

---

## Products API

```bash
curl http://localhost:9191/api/products
```
<img width="1237" height="28" alt="image" src="https://github.com/user-attachments/assets/f27040a9-e4bc-44f3-95f4-4593914822d0" />

Expected Response:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999
  }
]
```

---

## Orders API

```bash
curl http://localhost:9191/api/orders
```
<img width="1240" height="22" alt="image" src="https://github.com/user-attachments/assets/d5ff0bc2-b161-48b7-8c06-f587ea2727ab" />

Expected Response:

```json
[]
```

---

# Health Checks

Each service includes:

* Liveness Probe
* Readiness Probe

Health endpoints:

* `/health`

---

# Resource Configuration

Each deployment includes:

* CPU Requests
* CPU Limits
* Memory Requests
* Memory Limits

---

# Kubernetes Service Type

All services use:

```yaml
type: ClusterIP
```
<img width="1236" height="204" alt="image" src="https://github.com/user-attachments/assets/cbbe34c3-de80-4428-823b-9fd3fb32682c" />

for internal Kubernetes networking.

---

# Troubleshooting

## Pod CrashLoopBackOff

Check logs:

```bash
kubectl logs deployment/<service-name>
```
<img width="1235" height="81" alt="image" src="https://github.com/user-attachments/assets/88d81a19-84c7-4827-8056-4823400026f0" />


<img width="1234" height="72" alt="image" src="https://github.com/user-attachments/assets/ecc9c75c-aee8-4255-986d-4d2623b093fc" />

---

## Verify Services

```bash
kubectl get svc
```
<img width="1239" height="76" alt="image" src="https://github.com/user-attachments/assets/b5413da0-4a1d-479d-b919-c35a7a13be4a" />

---

## Verify Pods

```bash
kubectl get pods
```
<img width="1236" height="80" alt="image" src="https://github.com/user-attachments/assets/5a0ca623-7517-481f-a565-6d5f32a0dcf1" />

---

## Verify Gateway Routing

```bash
kubectl exec -it deployment/gateway-service -- sh
```
<img width="1238" height="51" alt="image" src="https://github.com/user-attachments/assets/f8eb32b1-9901-4d8b-9d2f-6f3788887a86" />

Test internal communication:

```bash
wget -qO- http://user-service:3000/users
```
<img width="1235" height="49" alt="image" src="https://github.com/user-attachments/assets/73230189-10e7-4100-89ea-8d967ffd9bd5" />

---

# Screenshots Included

* Running Pods
* Gateway Logs
* API Test Results

---

# Conclusion

Successfully deployed all microservices on Kubernetes using Minikube with:

* Kubernetes Deployments
* ClusterIP Services
* Docker Containers
* Inter-Service Communication
* Health Checks
* Gateway Routing
