#!/bin/bash

# Script to generate self-signed SSL certificates for local development

CERT_DIR="./nginx/certs"
DOMAIN="go-stocktracking.ai"

# Create certs directory if it doesn't exist
mkdir -p "$CERT_DIR"

echo "Generating self-signed SSL certificate for $DOMAIN..."

# Generate private key and certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$CERT_DIR/$DOMAIN.key" \
  -out "$CERT_DIR/$DOMAIN.crt" \
  -subj "/C=US/ST=State/L=City/O=Organization/OU=Development/CN=$DOMAIN"

echo "SSL certificate generated successfully!"
echo "Certificate: $CERT_DIR/$DOMAIN.crt"
echo "Private Key: $CERT_DIR/$DOMAIN.key"
echo ""
echo "Note: This is a self-signed certificate. Your browser will show a security warning."
echo "You can safely proceed by accepting the certificate in your browser."
