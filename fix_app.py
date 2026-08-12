import re

with open('src/App.tsx', 'r') as f:
    app_content = f.read()

# Just remove any line containing ResourceLibrary
lines = app_content.split('\n')
lines = [l for l in lines if 'ResourceLibrary' not in l]

with open('src/App.tsx', 'w') as f:
    f.write('\n'.join(lines))
