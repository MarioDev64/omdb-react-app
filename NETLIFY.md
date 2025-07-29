# 🚀 Netlify Deployment Guide

## 📋 Overview

This project is configured for deployment on Netlify with full SSR support, serverless functions, and edge functions.

## 🎯 Features

- ✅ **Server-Side Rendering (SSR)**
- ✅ **Serverless Functions**
- ✅ **Edge Functions**
- ✅ **Automatic Deployments**
- ✅ **Custom Domains**
- ✅ **Environment Variables**
- ✅ **Form Handling**
- ✅ **Redirects & Headers**
- ✅ **Analytics Dashboard**

## 🚀 Quick Deploy

### **Option 1: Deploy Button**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MarioDev64/omdb-react-app)

### **Option 2: Manual Setup**

1. **Go to [Netlify](https://netlify.com)**
2. **Sign up/Login with GitHub**
3. **Click "New site from Git"**
4. **Select your repository**
5. **Configure build settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `build/client`
6. **Click "Deploy site"**

## ⚙️ Configuration

### **Environment Variables**

Configure in Netlify Dashboard → Site settings → Environment variables:

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
VITE_GA_MEASUREMENT_ID=your_ga_measurement_id_here
```

### **Build Settings**

- **Build command**: `npm run build`
- **Publish directory**: `build/client`
- **Node version**: 20 (auto-detected)

### **Redirects**

The `netlify.toml` file includes:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures SPA routing works correctly.

## 🔧 Development

### **Local Development with Netlify CLI**

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Start development server:**

   ```bash
   npm run netlify:dev
   ```

3. **Test functions locally:**
   ```bash
   netlify dev
   ```

### **Available Scripts**

```bash
# Development with Netlify
npm run netlify:dev

# Build for production
npm run netlify:build

# Deploy to production
npm run netlify:deploy
```

## 🛠️ Advanced Features

### **Serverless Functions**

Location: `netlify/functions/`

Example: `hello.js` - Basic serverless function

**Use cases:**

- API proxies
- Data processing
- Authentication
- Database operations

### **Edge Functions**

Location: `netlify/edge-functions/`

Example: `hello.js` - Edge function with geo-location

**Benefits:**

- Runs closer to users
- Better performance
- Global CDN deployment
- Access to user location

### **Form Handling**

Netlify automatically handles form submissions:

```html
<form name="contact" netlify>
  <input name="email" type="email" />
  <button type="submit">Send</button>
</form>
```

### **Analytics**

Netlify provides built-in analytics:

- Page views
- Performance metrics
- User behavior
- Real-time data

## 🔒 Security

### **Headers Configuration**

The `netlify.toml` includes security headers:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### **Environment Variables**

- Never commit sensitive data
- Use Netlify's environment variable system
- Different values for production/preview

## 🌐 Custom Domain

### **Adding Custom Domain**

1. **Go to Site settings → Domain management**
2. **Add your custom domain**
3. **Configure DNS settings as instructed**
4. **Enable HTTPS (automatic)**

### **Subdomain Setup**

- `www.yourdomain.com`
- `app.yourdomain.com`
- `api.yourdomain.com`

## 📊 Monitoring

### **Built-in Analytics**

- Page views
- Performance metrics
- User behavior
- Real-time data

### **Function Logs**

- Serverless function logs
- Edge function logs
- Error tracking
- Performance monitoring

## 🔄 Continuous Deployment

### **Automatic Deployments**

- Deploy on every push to `main`
- Preview deployments for PRs
- Branch deployments for testing

### **Deploy Contexts**

- **Production**: `main` branch
- **Deploy Preview**: Pull requests
- **Branch Deploy**: Feature branches

## 🚨 Troubleshooting

### **Common Issues**

1. **Build fails:**
   - Check environment variables
   - Verify Node.js version
   - Review build logs

2. **Functions not working:**
   - Check function syntax
   - Verify file location
   - Review function logs

3. **Redirects not working:**
   - Check `netlify.toml` syntax
   - Verify redirect rules
   - Clear cache if needed

### **Getting Help**

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://community.netlify.com/)
- [Function Examples](https://functions.netlify.com/)

## 📈 Performance

### **Optimizations**

- **CDN**: Global content delivery
- **Edge Functions**: Closer to users
- **Caching**: Automatic asset caching
- **Compression**: Automatic gzip/brotli

### **Monitoring**

- **Core Web Vitals**
- **Lighthouse scores**
- **Real user metrics**
- **Function performance**

---

**Ready to deploy?** Click the deploy button above or follow the manual setup instructions!
