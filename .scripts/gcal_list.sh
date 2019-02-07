#!/bin/bash

read -p "[Google Calendar] Enter the days you want to list " days
gcal list -f $(date +'%Y-%m-%d') -t $(date +'%Y-%m-%d' -d "+$days days")