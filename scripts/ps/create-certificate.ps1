if($args.count -ne 1) {
    echo "usage: create-certificate.ps1 <domain name>"
    exit 1
}
echo "create certificate for $($args[0])"
docker-compose -f "$PSScriptRoot\..\..\docker-compose.yaml" run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d $args[0]