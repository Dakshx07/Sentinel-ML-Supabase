import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = []
    changed = False
    
    for line in lines:
        if 'import ' in line or '} from ' in line:
            # Fix types, constants, services, lib, etc.
            # Match from '../types', from '../../types', from '../services/geminiService'
            
            # 1. Root level files/folders mapping
            for root_module in ['types', 'constants', 'services', 'lib']:
                # Matches from '../types' or from '../../services/foo'
                pattern = r"from\s+['\"](\.\./)+(" + root_module + r"(/[^'\"]*)?)['\"]"
                if re.search(pattern, line):
                    line = re.sub(pattern, r"from '@/\2'", line)
                    changed = True

            # 2. Fix './icons' which moved to ui/icons
            pattern_icons = r"from\s+['\"](\.\.?/[^'\"]*?/?)icons['\"]"
            if re.search(pattern_icons, line):
                line = re.sub(pattern_icons, r"from '@/src/components/ui/icons'", line)
                changed = True
                
        new_lines.append(line)
        
    if changed:
        with open(filepath, 'w') as f:
            f.write('\n'.join(new_lines))
        print(f"Fixed relative imports in {filepath}")

def walk_dir():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))
                
    process_file('App.tsx')
    process_file('index.tsx')

if __name__ == "__main__":
    walk_dir()
