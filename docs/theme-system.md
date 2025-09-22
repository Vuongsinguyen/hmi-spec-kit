# Theme System Documentation

HMI Spec Kit hỗ trợ 4 theme khác nhau để tùy chỉnh giao diện người dùng toàn bộ ứng dụng.

## 🎨 Các Theme Có Sẵn

### 1. **Standard Theme** (Mặc định)
- **Màu nền**: Trắng làm chủ đạo
- **Button**: Màu xanh dương (#007bff)
- **Phong cách**: Hiện đại, sạch sẽ

### 2. **Dark Night Theme**
- **Màu nền**: Đen làm chủ đạo
- **Button**: Màu xám đen
- **Phong cách**: Tối, dễ chịu cho mắt

### 3. **HMI Classic Theme**
- **Màu nền**: Xám dịu mắt làm chủ đạo
- **Button**: Xám dịu mắt với border, không có border-radius
- **Phong cách**: Cổ điển, công nghiệp

### 4. **HMI Future Theme**
- **Màu nền**: Gradient blur background
- **Button**: Liquid glass effect, 3D
- **Phong cách**: Hiện đại, tối giản, tập trung

## 🚀 Cách Sử Dụng

### Import và sử dụng ThemeSelector

```jsx
import { ThemeSelector } from '../../src/components/ThemeSelector';

function MyComponent() {
  return (
    <div>
      <ThemeSelector />
      {/* Các component khác */}
    </div>
  );
}
```

### Sử dụng Theme trong Component

```jsx
import { useTheme } from '../../src/context/ThemeContext';

function MyComponent() {
  const { currentTheme, theme } = useTheme();

  return (
    <div style={{
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)'
    }}>
      Current theme: {theme.name}
    </div>
  );
}
```

## 🎯 CSS Variables

Tất cả theme sử dụng CSS variables để dễ dàng tùy chỉnh:

```css
/* Màu sắc */
--color-primary: #007bff;
--color-background: #ffffff;
--color-text: #212529;
--color-border: #dee2e6;

/* Typography */
--font-family: "Segoe UI", sans-serif;

/* Layout */
--border-radius: 4px;
```

## 🔧 Tùy Chỉnh Theme

### Thêm Theme Mới

```jsx
// Trong ThemeContext.jsx
const themes = {
  myCustomTheme: {
    name: 'My Custom Theme',
    colors: {
      primary: '#ff6b6b',
      background: '#f8f9fa',
      // ... other colors
    },
    borderRadius: '8px',
    fontFamily: '"Arial", sans-serif',
  },
  // ... existing themes
};
```

### Sử dụng CSS Variables trong Component

```jsx
function MyStyledComponent() {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: `1px solid var(--color-border)`,
      borderRadius: 'var(--border-radius)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family)'
    }}>
      Styled with theme variables
    </div>
  );
}
```

## 📱 Responsive & Accessibility

- Tất cả theme đều hỗ trợ contrast ratio tốt cho accessibility
- Theme tự động adapt với dark/light mode của system (tương lai)
- Smooth transitions khi chuyển đổi theme

## 🎨 Theme-Specific Features

### HMI Future Theme
- Glass morphism effects
- Blur backgrounds
- Gradient overlays
- 3D button effects

### HMI Classic Theme
- Square corners (border-radius: 0)
- Monospace font
- Industrial color scheme

## 🔄 Tích Hợp Với Language System

Theme system hoạt động độc lập với language system:

```jsx
<ThemeProvider>
  <LanguageProvider>
    <App />
  </LanguageProvider>
</ThemeProvider>
```

## 📚 Best Practices

1. **Luôn sử dụng CSS variables** thay vì hardcode colors
2. **Test trên tất cả theme** khi thêm component mới
3. **Sử dụng semantic color names** (primary, secondary, success, etc.)
4. **Consider accessibility** khi thiết kế theme mới

## 🛠 Troubleshooting

### Theme không áp dụng
- Kiểm tra ThemeProvider có wrap toàn bộ app không
- Kiểm tra CSS variables có được sử dụng đúng không

### Performance issues
- Theme changes trigger CSS variable updates
- Sử dụng CSS transitions để smooth transitions

### Custom styling conflicts
- Sử dụng `!important` cẩn thận
- Prefer CSS variables over inline styles