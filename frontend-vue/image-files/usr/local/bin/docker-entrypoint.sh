#!/bin/sh

set -e


echo "_____________________ ________    _____________________________ _______  ________   ";
echo "\_   _____/\______   \\\\_____  \   \      \__    ___/\_   _____/ \      \ \______ \  ";
echo " |    __)   |       _/ /   |   \  /   |   \|    |    |    __)_  /   |   \ |    |  \ ";
echo " |     \    |    |   \/    |    \/    |    \    |    |        \/    |    \|    \   \ " ;
echo " \___  /    |____|_  /\_______  /\____|__  /____|   /_______  /\____|__  /_______  /";
echo "     \/            \/         \/         \/                 \/         \/        \/ ";


##mkdir -p /srv/static

#cat <<EOT > /srv/static/config.json
##{
 # "apiUrl": "$ORGA_API_URL",
##  "format": {
#    "timeZone": "$ORGA_TZ",
 #   "dateTime": "$ORGA_DATETIME"
##  }
#}
#EOT
 ## "pickerDateTime": "yyyy-MM-dd HH:mm"
exec "$@"
