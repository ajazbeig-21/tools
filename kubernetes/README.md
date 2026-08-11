# Kubernetes — Last-Minute Prep Guide

Quick recall of core concepts. Read top to bottom; skim headings if short on time.

---

## Why Kubernetes?

| Benefit | Drawback |
|---------|----------|
| Self-healing, scaling, rollouts | Operational complexity |
| Declarative desired state | Steep learning curve |
| Portable across clouds | Needs cluster + networking know-how |
| Service discovery & load balancing | Overkill for a single small app |

**One-liner:** Orchestrates containers so you declare *desired state*; the control plane keeps the cluster there.

---

## Architecture (2 planes)

```
┌──────────────────── Control Plane ────────────────────┐
│  API Server · Scheduler · Controller Manager · etcd    │
│  (+ Cloud Controller Manager on cloud providers)       │
└──────────────────────────┬─────────────────────────────┘
                           │
     ┌─────────────────────┼─────────────────────┐
     ▼                     ▼                     ▼
┌ Worker ┐           ┌ Worker ┐           ┌ Worker ┐
│ kubelet│           │ kubelet│           │ kubelet│
│ kube-proxy         │ kube-proxy         │ kube-proxy
│ runtime│           │ runtime│           │ runtime│
│ (Pods) │           │ (Pods) │           │ (Pods) │
└────────┘           └────────┘           └────────┘
```

### Control plane (5)

| Component | Role (memorize this) |
|-----------|----------------------|
| **API Server** | Front door — all requests (kubectl, controllers) go here |
| **Scheduler** | Picks which node runs a new Pod |
| **Controller Manager** | Runs controllers (ReplicaSet, Deployment, Node, etc.) that reconcile desired → actual |
| **Cloud Controller Manager** | Cloud-specific: LBs, routes, node lifecycle |
| **etcd** | Cluster state store (source of truth) |

### Worker node (3 + runtime)

| Component | Role |
|-----------|------|
| **kubelet** | Agent on the node; talks to API server; starts/stops containers for Pods |
| **kube-proxy** | Networking / Service rules on the node |
| **Container runtime** | Actually runs containers (containerd, CRI-O, etc.) |

---

## Pod

- Smallest deployable unit. One or more containers that share network/storage.
- **Ephemeral** — if a Pod dies, it is gone. Controllers recreate *new* Pods to match desired count.
- Prefer not to create bare Pods in production; use ReplicaSet / Deployment.

**Imperative**
```bash
kubectl run web-app --image=nginx:alpine
```

**Declarative** (`pod.yaml`)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-webapp
  labels:
    app: nginx-webapp
spec:
  containers:
    - name: nginx-webapplication
      image: nginx:alpine
      ports:
        - containerPort: 80
```

```bash
kubectl apply -f pod.yaml
```

---

## Imperative vs Declarative

| | Imperative | Declarative |
|---|------------|-------------|
| Style | One-shot commands | YAML/JSON manifests |
| Example | `kubectl run …` | `kubectl apply -f …` |
| Version control | Hard | Natural (git) |
| Drift / CRDs | Manual | Controllers reconcile from manifests |

**Every object YAML has (at least):**
1. `apiVersion`
2. `kind`
3. `metadata` (name, labels, …)
4. `spec` (desired state; Deployments also use `template` for Pod spec)

---

## ReplicaSet

**Problem:** Pods are ephemeral.  
**Solution:** ReplicaSet keeps `replicas` Pods alive that match a `selector`.

| Spec field | Meaning |
|------------|---------|
| `replicas` | Desired count |
| `selector` | Which Pods belong to this RS (`matchLabels`) |
| `template` | Pod blueprint (labels must match selector) |

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:alpine
```

```bash
kubectl apply -f rs.yaml
kubectl get rs
kubectl get pods
kubectl delete pod <pod-name>   # RS recreates it → self-healing
```

Example output:
```
NAME   DESIRED   CURRENT   READY   AGE
web    3         3         3       7s

NAME        READY   STATUS    RESTARTS   AGE
web-9hgpn   1/1     Running   0          12s
web-dgjsh   1/1     Running   0          12s
web-gqd62   1/1     Running   0          12s
```

**RS does well:** self-heal, scale up/down.  
**RS does not handle well:** changing the Pod template (image/version) with a controlled rollout → use **Deployment**.

---

## Deployment

Deployment owns ReplicaSets and adds **rolling updates / rollbacks**.

| You want… | Use |
|-----------|-----|
| Keep N copies alive | ReplicaSet (or Deployment) |
| Update image safely + rollback | **Deployment** |

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:alpine
```

```bash
kubectl apply -f deploy.yaml
kubectl set image deployment/web web=nginx:1.25   # roll out new image
kubectl rollout status deployment/web
kubectl rollout undo deployment/web               # rollback
kubectl get deploy,rs,pods
```

**Mental model:** Deployment → creates/manages ReplicaSet(s) → ReplicaSet creates Pods.

---

## kubectl cheat sheet (exam speed)

```bash
# Context / cluster
kubectl cluster-info
kubectl get nodes
kubectl get all -A

# Create / change
kubectl apply -f file.yaml
kubectl create -f file.yaml
kubectl delete -f file.yaml
kubectl delete pod <name>
kubectl scale deploy/web --replicas=5

# Inspect
kubectl get pods -o wide
kubectl describe pod <name>
kubectl logs <pod>
kubectl logs <pod> -c <container>
kubectl exec -it <pod> -- sh

# Labels / select
kubectl get pods -l app=web
kubectl label pod <name> env=dev
```

---

## 60-second hierarchy (say this out loud)

1. **etcd** holds desired + actual cluster state.  
2. **API Server** is the only write path.  
3. **Controllers** watch API and reconcile (e.g. Deployment → RS → Pods).  
4. **Scheduler** assigns Pods to nodes.  
5. **kubelet** on the node runs the Pod via the **runtime**.  
6. Prefer **Deployment** over bare Pod / bare ReplicaSet for apps.

---

## Still fuzzy? Drill these Qs

1. Difference between ReplicaSet and Deployment?  
2. What happens if you `kubectl delete pod` that belongs to a Deployment?  
3. Where is cluster state stored?  
4. What does the scheduler decide?  
5. Imperative vs declarative — when is each OK?
