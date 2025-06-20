#!/bin/bash
cd /home/kavia/workspace/code-generation/mindease-59070-e8064618/mindease_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

