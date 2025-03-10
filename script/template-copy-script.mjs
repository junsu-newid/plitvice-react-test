import { mkdir, cp, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

async function createProject() {
    try {
        const projectName = process.argv[2];

        if (!projectName) {
            console.error('🚫 Please enter a project name. Usage: pnpm scaffolding <project-name>');
            process.exit(1);
        }
        const projectPath = path.join('app', projectName);
        const templateDir = path.join('package', 'template');

        if (existsSync(projectPath)) {
            console.error(`🚫 Project '${projectName}' already exists.`);
            process.exit(1);
        }

        if (!existsSync(templateDir)) {
            console.error(`🚫 Template directory not found: ${templateDir}`);
            process.exit(1);
        }

        await mkdir(projectPath, { recursive: true });
        await cp(templateDir, projectPath, { recursive: true });

        const gitignorePath = path.join(templateDir, '.gitignore');
        if (existsSync(gitignorePath)) {
            await cp(gitignorePath, path.join(projectPath, '.gitignore'));
        }

        const packageJsonPath = path.join(projectPath, 'package.json');
        const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
        packageJson.name = projectName;
        await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

        // pnpm-workspace.yaml 수정
        // const workspacePath = 'pnpm-workspace.yaml';
        // const currentWorkspaceContent = await readFile(workspacePath, 'utf8');
        // const updatedContent = currentWorkspaceContent.replace(
        //     /package:\n(\s+- [^\n]+\n)*/,
        //     (match) => `package:\n${match.slice('package:\n'.length)}    - '${projectPath}'\n`
        // );
        // await writeFile(workspacePath, updatedContent);

        const rootPackageJsonPath = 'package.json';
        const rootPackageJson = JSON.parse(await readFile(rootPackageJsonPath, 'utf8'));
        if (!rootPackageJson.scripts) {
            rootPackageJson.scripts = {};
        }
        rootPackageJson.scripts[projectName] = `pnpm --filter ${projectName} run dev`;
        await writeFile(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

        console.log('📦 Installing dependencies...');
        const { execSync } = await import('child_process');
        execSync('pnpm install', { stdio: 'inherit' });

        console.log(`🎉 Project '${projectName}' has been created successfully. HAPPY NEWID! 🎉 `);
    } catch (error) {
        console.error('❌ An error occurred:', error);
        process.exit(1);
    }
}

createProject();
