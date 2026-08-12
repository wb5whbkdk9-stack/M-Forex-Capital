import re

with open('src/components/HomeSections.tsx', 'r') as f:
    content = f.read()

# Remove the old imports
content = re.sub(r"import \{.*?\} from 'lucide-react';", "", content, flags=re.DOTALL, count=1)
content = re.sub(r"import \{.*?\} from 'framer-motion';", "", content, flags=re.DOTALL, count=1)

# Now, ensure we have everything we need at the top (well, below the first React import)
new_imports = """
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, BrainCircuit, PlayCircle, CheckSquare, ArrowRight, Brain, BarChart3, LineChart, Target, Zap, Briefcase, BookOpen, User, Lightbulb, Eye, PenTool, ListOrdered, Bot, MessageSquare, Compass, Users, CheckCircle, ExternalLink, X } from 'lucide-react';
"""

content = content.replace("import { ArrowRight, Brain", new_imports + "import { ArrowRight, Brain")
# Remove the duplicate
content = content.replace("import { ArrowRight, Brain, BarChart3, LineChart, Target, Zap, Briefcase, BookOpen, User, Lightbulb, Eye, PenTool, ListOrdered, Bot, MessageSquare, Compass, Users, CheckCircle, ExternalLink, X } from 'lucide-react';", "")

with open('src/components/HomeSections.tsx', 'w') as f:
    f.write(content)
