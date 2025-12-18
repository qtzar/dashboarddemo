# Deploying ReloSource to GitHub Pages

This guide will help you deploy the ReloSource dashboard to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed locally
- The repository pushed to GitHub

## Setup Instructions

### 1. Create GitHub Repository

If you haven't already:

```bash
cd /Users/dlynch/Documents/trc
git init
git add .
git commit -m "Initial commit: ReloSource dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trc.git
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your GitHub username.

### 2. Configure GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/trc`
2. Click on **Settings** (top right)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"

That's it! The workflow is already configured.

### 3. Update Vite Base Path (If Repository Name is Different)

If your repository name is **not** "trc", update `vite.config.js`:

```javascript
base: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

Replace `YOUR_REPO_NAME` with your actual repository name.

### 4. Trigger Deployment

The deployment will automatically trigger when you:
- Push to the `main` branch
- Manually trigger from the Actions tab

To deploy now:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 5. Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for both the "build" and "deploy" jobs to complete (usually 1-2 minutes)
4. Once complete, your site will be live at:

   **https://YOUR_USERNAME.github.io/trc/**

## Workflow Details

The GitHub Action (`.github/workflows/deploy.yml`) does the following:

1. **Checkout**: Pulls the latest code
2. **Setup Node**: Installs Node.js 20
3. **Install Dependencies**: Runs `npm ci` for clean install
4. **Build**: Runs `npm run build` to create production build
5. **Upload Artifact**: Uploads the `dist` folder
6. **Deploy**: Deploys to GitHub Pages

## Updating the Site

Every time you push to the `main` branch, the site will automatically rebuild and redeploy.

```bash
# Make your changes
git add .
git commit -m "Update dashboard"
git push origin main
```

## Troubleshooting

### Site shows 404 error

1. Check that GitHub Pages is enabled in repository settings
2. Verify the base path in `vite.config.js` matches your repository name
3. Wait a few minutes - initial deployment can take time

### Build fails in GitHub Actions

1. Check the Actions tab for error details
2. Ensure all dependencies are in `package.json`
3. Try building locally first: `npm run build`

### Assets not loading (blank page)

1. Check browser console for errors
2. Verify the base path is correct in `vite.config.js`
3. Make sure all assets use relative paths

## Custom Domain (Optional)

To use a custom domain:

1. In repository settings → Pages → Custom domain
2. Enter your domain (e.g., `relosource.yourdomain.com`)
3. Create a CNAME file in the `public` folder:
   ```bash
   echo "relosource.yourdomain.com" > public/CNAME
   ```
4. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`

## Local Testing of Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the production build at http://localhost:4173

## Notes

- The app uses client-side routing, so page refreshes on routes other than `/` may need server configuration
- All data is mock data and stored in memory - it will reset on page refresh
- The deployment includes the TRC logo from the public folder
