echo "Creating extension package..."
call vsce package

move uri-test-0.0.1.vsix builds\uri-test-0.0.1.vsix
