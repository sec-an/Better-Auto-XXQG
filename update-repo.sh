#!/bin/bash
status_log=$(git status -sb)
if [ "$status_log" == "## main...origin/main" ];then
  echo "nothing to commit, working tree clean"
else
  git add .&&git commit -m "update by github actions"&&git push origin main
fi
