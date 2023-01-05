if [[ $# -ne 1 ]] ; then
    echo "usage: ${BASH_SOURCE} <domain name>"
    exit 1
fi
echo "create certificate for $1"
docker-compose -f "${BASH_SOURCE}/../../docker-compose.yaml" run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d "$1"