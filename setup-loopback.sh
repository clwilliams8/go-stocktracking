#!/bin/bash

# Setup loopback alias for go-stocktracking.ai
echo "Setting up loopback alias 127.0.0.3..."

# Add the loopback alias
sudo ifconfig lo0 alias 127.0.0.3 up

# Verify it was added
if ifconfig lo0 | grep -q 127.0.0.3; then
    echo "✓ Loopback alias 127.0.0.3 successfully created"
    echo ""
    echo "To make this permanent across reboots, create a launch daemon:"
    echo "sudo nano /Library/LaunchDaemons/com.go-stocktracking.loopback.plist"
    echo ""
    echo "With the following content:"
    cat << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.go-stocktracking.loopback</string>
    <key>ProgramArguments</key>
    <array>
        <string>/sbin/ifconfig</string>
        <string>lo0</string>
        <string>alias</string>
        <string>127.0.0.3</string>
        <string>up</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF
    echo ""
    echo "Then load it with:"
    echo "sudo launchctl load /Library/LaunchDaemons/com.go-stocktracking.loopback.plist"
else
    echo "✗ Failed to create loopback alias"
    exit 1
fi
