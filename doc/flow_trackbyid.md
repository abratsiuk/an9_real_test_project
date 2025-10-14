В Angular 9 `trackBy` - это **оптимизационная функция** для `*ngFor`, которая помогает фреймворку эффективно отслеживать изменения в коллекциях.

## Что такое `trackBy: trackById`?

`trackBy` - это функция, которая указывает Angular, как идентифицировать каждый элемент в массиве. В вашем случае `trackById` - это метод в компоненте, который возвращает уникальный идентификатор для каждой книги.

## Как это работает:

### В шаблоне:

```html
<app-book-cart
  *ngFor="let b of books?.items; trackBy: trackById"
  [book]="b"
  (remove)="onRemove($event)"
>
</app-book-cart>
```

### В компоненте:

```typescript
export class YourComponent {
  books = {
    items: [
      { id: 1, title: 'Book 1', author: 'Author 1' },
      { id: 2, title: 'Book 2', author: 'Author 2' },
      // ...
    ],
  };

  trackById(index: number, item: any): number {
    return item.id; // Возвращает уникальный id книги
  }

  onRemove(bookId: number) {
    // Логика удаления
  }
}
```

## Зачем это нужно:

**Без `trackBy`:**

- При изменении массива Angular перерисовывает ВСЕ DOM-элементы
- Неэффективно при больших списках

**С `trackBy`:**

- Angular отслеживает элементы по уникальному id
- Перерисовывает только измененные элементы
- Сохраняет состояние компонентов (скролл, фокус и т.д.)

## Альтернативные варианты:

### Использование индекса:

```typescript
trackByIndex(index: number, item: any): number {
  return index;
}
```

### Для объектов без id:

```typescript
trackByTitle(index: number, item: any): string {
  return item.title;
}
```

**Рекомендация:** Всегда используйте `trackBy` для динамических списков, особенно если данные могут меняться часто или список большой.
