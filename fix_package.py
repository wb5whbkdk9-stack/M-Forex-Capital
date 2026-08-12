import json

with open('package.json', 'r') as f:
    pkg = json.load(f)

# Ensure tsx is what it was, e.g. "^4.21.0"
pkg['devDependencies']['tsx'] = "^4.21.0"

# Add overrides
pkg['overrides'] = {
    "esbuild": "^0.25.0"
}

with open('package.json', 'w') as f:
    json.dump(pkg, f, indent=2)

