import os
import re

# The new structure
MAPPINGS = {
    'ui': ['Dropdown', 'ErrorBoundary', 'LanguageDot', 'ThemeContext', 'Toast', 'ToastContext', 'ToggleSwitch', 'icons', 'TestML', 'DemoModeBanner'],
    'layout': ['CenterPanel', 'Header', 'LeftPanel', 'RightPanel', 'Sidebar'],
    'dashboard': ['Dashboard', 'RepositoriesDashboard', 'DocumentationDashboard', 'RepoReportDashboard'],
    'pages': ['LandingPage', 'PricingPage', 'AuthPage', 'SettingsPage'],
    'features': ['AddRepoModal', 'AnalysisLoader', 'AnimatedFeatureShowcase', 'CodeSurgeryAnimation', 'CommitScanner', 'DevWorkflowStreamliner', 'DeveloperCommandCenter', 'GitHubScanner', 'GlobalSearchModal', 'HeroAnimation', 'ImageGenerator', 'InteractiveDemo', 'InteractiveThreatMap', 'ParticleBackground', 'PushPullPanel', 'READMEGenerator', 'RefactorSimulator', 'RepoCard', 'SecurityPulse', 'SentinelCoreAnimation', 'SentinelStudio', 'SmartAlerts', 'TechStackAnimation']
}

# Inverse mapping: component name -> new directory path
comp_to_dir = {}
for category, comps in MAPPINGS.items():
    for comp in comps:
        if category == 'pages':
            comp_to_dir[comp] = 'src/pages'
        else:
            comp_to_dir[comp] = f'src/components/{category}'

def get_new_import_path(comp_name):
    # Remove .tsx if present
    comp_name = comp_name.replace('.tsx', '')
    if comp_name in comp_to_dir:
        return f"@/{comp_to_dir[comp_name]}/{comp_name}"
    return None

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Regex to find imports like: import X from './Y' or import { X } from '../components/Y'
    # We will look for imports matching existing components
    # A simpler way: we know the old imports were usually from './ComponentName' or '../components/ComponentName'
    
    lines = content.split('\n')
    new_lines = []
    changed = False
    
    for line in lines:
        if line.strip().startswith('import '):
            # Try to replace known component imports
            for comp, dir_path in comp_to_dir.items():
                # Matches: from './Component' or from '../Component' or from '../components/Component'
                pattern = r"from\s+['\"](\.\.?/[^'\"]*?/?" + comp + r")['\"]"
                if re.search(pattern, line):
                    line = re.sub(pattern, f"from '@/{dir_path}/{comp}'", line)
                    changed = True
        new_lines.append(line)
        
    if changed:
        with open(filepath, 'w') as f:
            f.write('\n'.join(new_lines))
        print(f"Fixed {filepath}")

def walk_dir():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                process_file(os.path.join(root, file))
    
    # Also fix root level like App.tsx, index.tsx
    process_file('App.tsx')
    process_file('index.tsx')

if __name__ == "__main__":
    walk_dir()
