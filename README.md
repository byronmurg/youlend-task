# youlend-task

## Quickstart

A quick way to view the application is to simply to clone the repo then run
```
docker-compose up
```

## Helm overview

A simple install on minikube:
```
helm upgrade --install loans4u loans4u-helm/ --set 'ingress.hosts[0].host=loans4u.local'
```

Make sure that you have the ingress addon enabled `minikube addons enable ingress`.

There are several ways of accessing the applicaion via the ingress controller. The simplest is to get the ip of the nging service via `kubectl get svc -n ngin-ingress -o wide` then add that ip into your `/etc/hosts` file. See (here)[https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/] for more information depending on your local setup.

## Tech stack Overview

I don't really know Angular and C# so I made this with Python and React.

## API Stack

The API was the simplest part so I used FastAPI in python to quickly create a simple API.

## Ui Stack

For the UI I created a simple React application that builds into an nginx image via a multi-stage docker build.

Due to the scope of the task it wasn't worth including any state management so I just made a very simple one myself.

The UI styling is all done in picocss because I didn't want to spend too much time on it.


## Infrastructure Overview

Both the docker compose and the helm chart use an ingress layer to handle routing. This means that I can avoid using CORS and have scope in
future to re-arrange the services as required. One disadvantage of this is that the FastAPI swagger page cannot be accessed, I'm sure that there's
a way to acheive this but it fell outside the scope of the task.


## Infrastrucure Security

This is quite a simple application and thus we do not need to be concerned about many of standard security concerns because:

- There is no persistent state, therefore no storage concerns such as drive encryption.
- Password and session keys are not passed between containers therefore we don't need to worry about inter-cluster encryption.

However as with all applications there are still security exposures so the following steps have been taken.

- Containers are running as non-root users. The helm chart defines each pod with `privileged` `allowPrivilegeEscalation` set to false.
- Api pods are read-only. To mitigate the possibility of a malicious actor taking advantage of framework level insecurities the api pod is launched with `readOnlyRootFilesystem` set to true.
- Outbound traffic disallowed. The api does not need to communicate over the internet so a networkpolicy is attached to stop all pods from sending or recieveing traffic from outside the cluster. Only traffic from the ingress layer is allowed. Note that NetworkPolicies are not enabled by default on minikube.


