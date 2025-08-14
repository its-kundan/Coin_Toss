# 🪙 Virtual Coin Toss

A modern, responsive web application for digital coin tossing. Make quick decisions with a beautiful, animated coin flip experience.

![Virtual Coin Toss](https://via.placeholder.com/800x400?text=Virtual+Coin+Toss+Screenshot)

## ✨ Features

- **🎲 True Randomization** - Uses cryptographically secure random number generation
- **📊 Statistics Tracking** - Keep track of your heads and tails count
- **🌙 Dark/Light Mode** - Switch between themes for comfortable viewing
- **📱 Responsive Design** - Works perfectly on all devices
- **📤 Share Results** - Share your coin toss results with friends
- **⌨️ Keyboard Support** - Press spacebar to toss the coin
- **💾 Local Storage** - Your stats and preferences are saved locally

## 🚀 Live Demo

[Try Virtual Coin Toss Now](https://your-demo-link.com)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Fonts**: Inter (Google Fonts)
- **Icons**: Emoji icons for cross-platform compatibility
- **Hosting**: Netlify (recommended)

## 📁 Project Structure

```
Coin_Toss/
├── index.html              # Main application page
├── css/
│   ├── main.css           # Main styles with CSS custom properties
│   ├── components.css     # Navigation and footer styles
│   ├── about.css          # About page specific styles
│   └── contact.css        # Contact page specific styles
├── js/
│   ├── app.js             # Main application logic
│   └── contact.js         # Contact form handling
├── pages/
│   ├── about.html         # About page
│   └── contact.html       # Contact page
├── assets/
│   └── icons/             # Social media icons
└── README.md              # Project documentation
```

## 🎯 Key Improvements

### UI/UX Enhancements
- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Mobile-first approach with flexible grids
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation
- **Performance**: Optimized CSS and JavaScript for fast loading

### Code Quality
- **Modular Structure**: Separated concerns with dedicated CSS and JS files
- **CSS Custom Properties**: Consistent theming and easy customization
- **ES6+ JavaScript**: Modern class-based architecture
- **Error Handling**: Comprehensive error handling and user feedback

### Features
- **Statistics Tracking**: Persistent stats using localStorage
- **Theme Switching**: Dark/light mode with persistent preference
- **Share Functionality**: Native Web Share API with fallback
- **Form Validation**: Real-time validation with user feedback

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML, CSS, and JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/its-kundan/Coin_Toss.git
   cd Coin_Toss
   ```

2. **Open in browser**
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Using Node.js (if available)
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Start tossing coins!**
   - Click the "Toss Coin" button
   - Press spacebar for quick access
   - Switch themes using the moon/sun icon
   - Share your results with friends

## 🎨 Customization

### Colors
Modify the CSS custom properties in `css/main.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### Animations
Adjust coin flip animation in `css/main.css`:

```css
@keyframes coinFlip {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(1800deg); }
    100% { transform: rotateY(1800deg); }
}
```

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Kundan Kumar**

- 🌐 [Portfolio](https://your-portfolio.com)
- 📧 [Email](mailto:kundan51kk@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/its-kundan/)
- 🐦 [Twitter](https://twitter.com/kundan_k_)
- 📁 [GitHub](https://github.com/its-kundan)

## 🙏 Acknowledgments

- [Inter Font](https://fonts.google.com/specimen/Inter) by Google Fonts
- [Emoji Icons](https://emojipedia.org/) for cross-platform compatibility
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for modern theming

## 📈 Future Enhancements

- [ ] Sound effects for coin toss
- [ ] Multiple coin designs
- [ ] Advanced statistics and charts
- [ ] PWA support for offline use
- [ ] Multi-language support
- [ ] Coin toss history
- [ ] Custom coin faces

---

⭐ **Star this repository if you found it helpful!**


