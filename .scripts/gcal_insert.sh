#!/bin/bash

read -p "[Google Calendar] Enter the subject of the new event: " subj
read -p "[Google Calendar] Enter the date of the new event: " date_v
read -p "[Google Calendar] Enter the time of the new event: " time_v
read -p "[Google Calendar] Enter the duration of the new event: " duration
gcal insert -s \"$subj\" -d $date_v -t $time_v -D $duration