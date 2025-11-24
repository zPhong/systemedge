<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main/master branch:**
   - The workflow will automatically build and deploy your app when you push to the `main` or `master` branch
   - You can also manually trigger the deployment from the Actions tab

3. **Set up environment variables (if needed):**
   - If your app requires `GEMINI_API_KEY` at build time, add it as a GitHub secret:
     - Go to Settings → Secrets and variables → Actions
     - Add a new repository secret named `GEMINI_API_KEY`
   - Update the workflow file to use the secret if needed

4. **Access your deployed site:**
   - After deployment, your site will be available at:
     `https://[your-username].github.io/[repository-name]/`

### Manual Deployment:

You can also build and deploy manually:
```bash
npm run build
# Then push the dist folder to the gh-pages branch or use GitHub Actions
```
