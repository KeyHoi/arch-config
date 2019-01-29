
#!/bin/bash

read -p "[YouTube] Enter the URL you want to download: " url
youtube-dl -F $url
read -p "[YouTube] Enter the format number you want to download: " format
youtube-dl -o "~/Videos/%(title)s.%(ext)s" -f $format $url
