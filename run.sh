#!/bin/bash

if [ "$NODE_ENV" = "docker" ]
then echo "starting service"
  SITEROOT=/UKVI-Complaints
fi

cp -r /app/public/* /public/

exec "node index.js"
