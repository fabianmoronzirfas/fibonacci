#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

docker build  -t fabianmoronzirfas/fib-client -f Dockerfile.dev .
docker run -p 3000:3000 fabianmoronzirfas/fib-client
