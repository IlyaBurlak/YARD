# Altair Posts Platform
Платформа для управления постами с возможностью просмотра, редактирования и сохранения изменений в локальном хранилище.

## 🚀 Особенности
- **Локальное сохранение** изменений через localStorage
-  Дизайн с использованием **Ant Design**
- Валидация форм при редактировании
- Интеграция с [JSONPlaceholder API](https://jsonplaceholder.typicode.com)

## 🛠 Технологии
- **React 18** (Hooks API)
- **React Router v6** для навигации
- **Ant Design 5** (UI компоненты)
- **Axios** (HTTP-клиент)

## 🗂 Структура проекта


```plaintext
src/
├── components/         
│   ├── PostList.jsx     # Список постов с пагинацией
│   ├── PostDetail.jsx   # Страница деталей поста
│   └── EditForm.jsx     # Форма редактирования поста
├── hooks/               
│   └── usePosts.js      # Логика работы с API и localStorage
├── services/            
│   └── PostService.js   # Инкапсуляция бизнес-логики
├── App.js               # Корневой компонент приложения
└── App.css         

```     

## 🌐 Деплой (Опционально)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Altair_Posts-61777F?style=for-the-badge&logo=vercel)](https://yard-ochre.vercel.app)
