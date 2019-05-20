# Notes

## Volumes

in k8s world there are volumes. Can be seen as a long term storage.

volumes work on a pod level. If the pod gets killed all the data on it is gone.

## Persistence Volumes

These exist outside of the pod. It is an object in the cluster.  
There are "statically provisioned persistence volumes" (created ahead on time) and "dynamically provisioned persistence volumes" (on time of request).

## Persistence Volume Claims

Is the announcement of possible volume types.
