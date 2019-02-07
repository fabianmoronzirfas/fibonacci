# fibonacci calulator

[![Build Status](https://travis-ci.org/fabianmoronzirfas/fibonacci.svg?branch=master)](https://travis-ci.org/fabianmoronzirfas/fibonacci)

learning docker + travis + aws over at [udemy.com](https://www.udemy.com/docker-and-kubernetes-the-complete-guide/)


Dockerrun.aws.json docs for Elastic Beanstalk only has top level info ([docs eb](https://docs.aws.amazon.com/elastic-beanstalk/index.html#lang/en_us)). Infos for task definitions can be found on Amazon Elastic Container Service ECS [docs ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)

- Docs Container Definition https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions


`"hostname":"client"` can be seen as equal to the service name on docker-compose.yml

`"essential":true` would kill all other containers (at least one has to be `essential`)

maps ports from outside to the port inside.

```json
  "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 80
        }
      ],
```

defines links from nginx to our containers (!hostnames) inside.  

```json
      "links": [
        "client",
        "server"
      ]
```

AWS RDS === postgres in container
AWS Elastic Cache === Redis


AWS Stuff

Create a Security Group in the regions virtual private cloud VPC that allows all AWS services in there to talk to each other.  

Secrets could be here https://console.aws.amazon.com/secretsmanager/home?region=us-east-1#/home

or https://www.vaultproject.io