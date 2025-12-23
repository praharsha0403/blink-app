# GitHub Setup Instructions

## Step 1: Create Private GitHub Repository

1. Go to https://github.com/new
2. Repository name: `blink-app` (or whatever you want)
3. **Select "Private"** ✅
4. Click "Create repository"

## Step 2: Push Your Code

Open Terminal in the Blink folder and run:

```bash
cd /Users/chaitanyasai/Documents/Blink

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Blink app"

# Add your GitHub repo (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/blink-app.git

# Push to GitHub
git push -u origin main
```

If it asks for `master` instead of `main`, use:
```bash
git push -u origin master
```

## Step 3: Wait for Build

1. Go to your repo on GitHub
2. Click "Actions" tab
3. You'll see the build running
4. Wait 10-15 minutes for it to complete

## Step 4: Download Built Apps

Once the build completes:
1. Click on the completed workflow run
2. Scroll down to "Artifacts"
3. Download:
   - `blink-macos-latest` - Contains the Mac .dmg
   - `blink-windows-latest` - Contains the Windows .exe

Done! 🎉

## Troubleshooting

If the build fails:
- Check the "Actions" tab for error messages
- Make sure FFmpeg dependencies are correctly configured
- The workflow file is at `.github/workflows/build.yml`
