import os

with open('src/components/Contact.tsx', 'r') as f:
    content = f.read()

if "import React" not in content and "import * as React" not in content:
    content = "import React, { useState } from 'react';\n" + content.replace("import { useState } from 'react';", "")

with open('src/components/Contact.tsx', 'w') as f:
    f.write(content)
